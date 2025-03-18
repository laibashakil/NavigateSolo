import { useEffect, useState, useRef } from "react";
import wifiData from "../../constants/wifiData";
import { applyKalmanFilter } from "./kalmanFilter";

interface WifiSignal {
  ssid: string;
  mac: string;
  signalStrength: string | number;
}

interface LocationEntry {
  location: string;
  signals: WifiSignal[];
}

interface LocationScore {
  location: string;
  score: number;
  confidence: number;
  averageStrength: number;
  trustedMatchCount: number;
  signalAccuracy: number;
  uniqueMatchCount: number;
}

const STABILITY_WINDOW = 3; // Reduced because we have longer intervals between scans
const REFRESH_INTERVAL = 30000; // 30 seconds for Android 9+ compliance
const SIGNAL_VARIANCE = 15; // Increased variance to account for real-world conditions
const MIN_READINGS = 2; // Minimum readings needed before making a decision
const STRONG_SIGNAL_THRESHOLD = -70; // Threshold for considering a signal strong

// Define trusted networks that should be prioritized in matching
// These are networks that you know are reliable and stable
const TRUSTED_NETWORKS = [
  { ssid: "PTCL-GPON", isTrusted: true }, // Your home router
  { ssid: "eduroam", isTrusted: true },   // University network
  // Add other networks you trust here
];

// Helper function to check if a network is trusted
const isTrustedNetwork = (ssid: string): boolean => {
  return TRUSTED_NETWORKS.some(network => network.ssid === ssid);
};

// Helper function to parse signal strength
const parseSignalStrength = (signal: string | number): number => {
  return typeof signal === 'string' ? parseFloat(signal) : signal;
};

// Calculate signal similarity score with emphasis on signal strength
const calculateSignalMatch = (known: number, measured: number, isTrusted: boolean): number => {
  const difference = Math.abs(known - measured);
  
  // Handle large discrepancies - if difference is too large, reduce score more aggressively
  // This prevents totally different signal strengths from getting high scores
  if (difference > 25) {
    return isTrusted ? 0.3 : 0; // Even trusted networks get very low scores with huge differences
  }
  
  // Base score from signal similarity
  const baseScore = Math.max(0, 1 - (difference / SIGNAL_VARIANCE));
  
  // Give bonus points for stronger signals
  const strengthBonus = Math.max(0, (-70 - measured) / -40); // Bonus for signals stronger than -70dB
  
  // Give bonus for trusted networks
  const trustBonus = isTrusted ? 0.3 : 0;
  
  return baseScore * (1 + strengthBonus + trustBonus);
};

// Calculate how accurate the signal strength matches between expected and measured
const calculateSignalAccuracy = (known: number, measured: number): number => {
  const difference = Math.abs(known - measured);
  // More strict accuracy measure - penalizes differences more strongly
  return Math.max(0, 1 - (difference / 8)); // 8dB difference = 0% accuracy
};

// Helper - find unique networks for a location compared to other locations
const findUniqueNetworks = (
  locationData: LocationEntry, 
  allLocations: LocationEntry[]
): string[] => {
  const otherLocations = allLocations.filter(loc => loc.location !== locationData.location);
  
  // Get all networks from this location
  const thisLocationNetworks = locationData.signals.map(signal => signal.mac);
  
  // Get all networks that appear in other locations
  const otherLocationNetworks = new Set<string>();
  otherLocations.forEach(loc => {
    loc.signals.forEach(signal => {
      otherLocationNetworks.add(signal.mac);
    });
  });
  
  // Find networks unique to this location and filter out very weak signals
  // as these might be transient and unreliable
  const uniqueNetworks = thisLocationNetworks.filter(mac => {
    const signal = locationData.signals.find(s => s.mac === mac);
    
    // Not unique if this network appears in other locations
    if (otherLocationNetworks.has(mac)) {
      return false;
    }
    
    // Only consider somewhat strong signals as unique identifiers
    // This prevents very weak transient signals from being considered unique
    return signal && parseSignalStrength(signal.signalStrength) > -85;
  });
  
  return uniqueNetworks;
};

export function findBestLocation(scannedNetworks: WifiSignal[]): string {
  if (scannedNetworks.length === 0) return "Unknown Location";

  console.log("\n📊 Location Analysis Start");
  console.log("──────────────────────────");

  // Apply Kalman filtering to smooth signals
  const filteredNetworks = applyKalmanFilter(scannedNetworks.map(network => ({
    ...network,
    signalStrength: network.signalStrength.toString()
  })));
  
  console.log("\n📡 Network Signals After Filtering:");
  filteredNetworks.forEach(network => {
    const trustStatus = isTrustedNetwork(network.ssid) ? " (TRUSTED)" : "";
    console.log(`${network.ssid}${trustStatus} (${network.mac}): ${network.signalStrength}dB`);
  });
  
  // Convert to a map for easier lookup
  const signalMap = new Map(
    filteredNetworks.map(network => [
      network.mac,
      {
        strength: parseSignalStrength(network.signalStrength),
        ssid: network.ssid,
        isTrusted: isTrustedNetwork(network.ssid)
      }
    ])
  );

  console.log("\n📍 Location Matching Results:");
  console.log("──────────────────────────");

  // Calculate match scores for each location
  const locationScores: LocationScore[] = wifiData.map(locationEntry => {
    let totalScore = 0;
    let matchCount = 0;
    let totalStrength = 0;
    let strongSignalMatches = 0;
    let trustedMatchCount = 0;
    let totalAccuracy = 0;
    let uniqueNetworkMatches = 0;
    
    console.log(`\n🏠 Analyzing ${locationEntry.location}:`);

    // Identify networks unique to this location
    const uniqueNetworks = findUniqueNetworks(locationEntry, wifiData);
    
    const hasUniqueNetworks = uniqueNetworks.length > 0;
    if (hasUniqueNetworks) {
      console.log(`  🔍 Has ${uniqueNetworks.length} unique networks`);
    }

    locationEntry.signals.forEach(knownSignal => {
      const measuredData = signalMap.get(knownSignal.mac);
      if (!measuredData) {
        console.log(`  ❌ ${knownSignal.ssid}: No signal detected`);
        return;
      }

      const knownStrength = parseSignalStrength(knownSignal.signalStrength);
      const measuredStrength = measuredData.strength;
      const isTrusted = measuredData.isTrusted;
      
      // Check if this is a unique network for this location
      const isUniqueToLocation = uniqueNetworks.some(n => n === knownSignal.mac);
      if (isUniqueToLocation) {
        uniqueNetworkMatches++;
        console.log(`  🔑 ${knownSignal.ssid}: UNIQUE to this location`);
      }
      
      if (isTrusted) {
        trustedMatchCount++;
        console.log(`  ✅ ${knownSignal.ssid}: TRUSTED NETWORK`);
      }
      
      const matchScore = calculateSignalMatch(knownStrength, measuredStrength, isTrusted);
      const accuracyScore = calculateSignalAccuracy(knownStrength, measuredStrength);
      
      // Track strong signal matches
      if (measuredStrength > STRONG_SIGNAL_THRESHOLD) {
        strongSignalMatches++;
      }

      totalStrength += measuredStrength;
      totalScore += matchScore;
      totalAccuracy += accuracyScore;
      matchCount++;

      console.log(`  📶 ${knownSignal.ssid}:`);
      console.log(`     Expected: ${knownStrength}dB`);
      console.log(`     Measured: ${measuredStrength.toFixed(1)}dB`);
      console.log(`     Match: ${(matchScore * 100).toFixed(1)}%${isTrusted ? ' (Trusted)' : ''}${isUniqueToLocation ? ' (Unique)' : ''}`);
      console.log(`     Accuracy: ${(accuracyScore * 100).toFixed(1)}%`);
    });

    const averageStrength = matchCount > 0 ? totalStrength / matchCount : -100;
    const score = matchCount > 0 ? totalScore / matchCount : 0;
    const signalAccuracy = matchCount > 0 ? totalAccuracy / matchCount : 0;
    
    // Calculate confidence based on score, signal strength and trusted networks
    const strengthConfidence = Math.max(0, (averageStrength + 90) / 40); // -90dB -> 0%, -50dB -> 100%
    const matchConfidence = score;
    const strongSignalBonus = strongSignalMatches > 0 ? 0.2 : 0; // Bonus for having strong signals
    
    // Add a boost for trusted networks
    const trustedNetworkBonus = trustedMatchCount > 0 ? 0.3 : 0;
    
    // Add a smaller boost for unique networks (reduced from 0.4 to 0.15)
    // This prevents temporary or weak signals from having too much influence
    const uniqueNetworkBonus = uniqueNetworkMatches > 0 ? 0.15 : 0;
    
    // Give more weight to the actual signal matching and accuracy
    const confidence = Math.min(1, (strengthConfidence * 0.25) + 
                              (matchConfidence * 0.3) + 
                              (signalAccuracy * 0.25) +
                              strongSignalBonus + 
                              trustedNetworkBonus +
                              uniqueNetworkBonus);

    console.log(`  📊 Final Score: ${(score * 100).toFixed(1)}%`);
    console.log(`  📶 Avg Strength: ${averageStrength.toFixed(1)}dB`);
    console.log(`  📏 Signal Accuracy: ${(signalAccuracy * 100).toFixed(1)}%`);
    console.log(`  🔑 Unique Networks: ${uniqueNetworkMatches}`);
    console.log(`  🔒 Trusted Networks: ${trustedMatchCount}`);
    console.log(`  🎯 Confidence: ${(confidence * 100).toFixed(1)}%`);

    return {
      location: locationEntry.location,
      score,
      confidence,
      averageStrength,
      trustedMatchCount,
      signalAccuracy,
      uniqueMatchCount: uniqueNetworkMatches
    };
  });

  // Find best match with more sophisticated ranking
  const validLocations = locationScores
    .filter(loc => loc.confidence >= 0.3) // Slightly lower threshold since we're more selective with networks
    .sort((a, b) => {
      // First consider signal accuracy for trusted networks
      if (a.trustedMatchCount > 0 && b.trustedMatchCount > 0 && 
          Math.abs(a.signalAccuracy - b.signalAccuracy) > 0.15) {
        return b.signalAccuracy - a.signalAccuracy;
      }
      
      // Then prioritize locations with trusted networks
      if (a.trustedMatchCount > 0 && b.trustedMatchCount === 0) return -1;
      if (b.trustedMatchCount > 0 && a.trustedMatchCount === 0) return 1;
      
      // Unique networks are still considered but with less importance
      if (a.uniqueMatchCount > 0 && b.uniqueMatchCount === 0 && 
          a.score > b.score * 0.8) return -1; // Only prefer if score is also reasonable
      if (b.uniqueMatchCount > 0 && a.uniqueMatchCount === 0 && 
          b.score > a.score * 0.8) return 1;
      
      // For locations with similar confidence, prioritize stronger signals and better matches
      if (Math.abs(a.confidence - b.confidence) < 0.1) {
        // Combined ranking based on signal strength and score
        const aRanking = (a.averageStrength * 0.6) + (a.score * 40);
        const bRanking = (b.averageStrength * 0.6) + (b.score * 40);
        return bRanking - aRanking;
      }
      
      return b.confidence - a.confidence;
    });

  console.log("\n📋 Final Results:");
  console.log("──────────────────────────");

  if (validLocations.length === 0) {
    console.log("⚠️ No location matched with sufficient confidence");
    return "Unknown Location";
  }

  const bestMatch = validLocations[0];
  console.log(`🏆 Best Match: ${bestMatch.location}`);
  console.log(`   Score: ${(bestMatch.score * 100).toFixed(1)}%`);
  console.log(`   Signal Strength: ${bestMatch.averageStrength.toFixed(1)}dB`);
  console.log(`   Signal Accuracy: ${(bestMatch.signalAccuracy * 100).toFixed(1)}%`);
  console.log(`   Unique Networks: ${bestMatch.uniqueMatchCount}`);
  console.log(`   Trusted Networks: ${bestMatch.trustedMatchCount}`);
  console.log(`   Confidence: ${(bestMatch.confidence * 100).toFixed(1)}%`);
  console.log("──────────────────────────\n");
  
  return bestMatch.location;
}

export function useAutoLocation(scannerFunction: () => Promise<WifiSignal[]>) {
  const [location, setLocation] = useState<string>("Detecting...");
  const lastLocationsRef = useRef<string[]>([]);
  const readingsCountRef = useRef<number>(0);

  useEffect(() => {
    const updateLocation = async () => {
      const scannedNetworks = await scannerFunction();
      readingsCountRef.current++;

      // Only start determining location after minimum readings
      if (readingsCountRef.current < MIN_READINGS) {
        console.log(`⏳ Collecting initial readings (${readingsCountRef.current}/${MIN_READINGS})...`);
        return;
      }

      const bestMatch = findBestLocation(scannedNetworks);
      
      if (bestMatch !== "Unknown Location") {
        lastLocationsRef.current.push(bestMatch);

        if (lastLocationsRef.current.length > STABILITY_WINDOW) {
          lastLocationsRef.current.shift();
        }

        // Simplified stability check
        const locationCounts = lastLocationsRef.current.reduce((acc, loc) => {
          acc[loc] = (acc[loc] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const [stableLocation, count] = Object.entries(locationCounts)
          .reduce((a, b) => (a[1] > b[1] ? a : b));

        const stabilityScore = count / lastLocationsRef.current.length;

        if (stabilityScore >= 0.5) { // Reduced stability requirement to 50%
          console.log(`🏠 Stable Location: ${stableLocation} (Stability: ${(stabilityScore * 100).toFixed(1)}%)`);
          setLocation(stableLocation);
        }
      }
    };

    updateLocation();
    const interval = setInterval(updateLocation, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [scannerFunction]);

  return location;
}
