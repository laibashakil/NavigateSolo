import { useEffect, useState, useRef } from "react";
import wifiData from "../../constants/wifiData";

interface WifiSignal {
  ssid: string;
  signalStrength: number;
}

interface LocationEntry {
  location: string;
  signals: WifiSignal[];
}

const MIN_SIGNAL_STRENGTH = -85; // Ignore weak signals
const STABILITY_WINDOW = 5; // Number of last readings for stability
const REFRESH_INTERVAL = 1500; // Refresh WiFi scanning every 1.5s

export function findBestLocation(scannedNetworks: WifiSignal[]): string {
    if (scannedNetworks.length === 0) return "Unknown Location";
  
    let bestMatch = "Unknown Location";
    let highestScore = -Infinity;
  
    console.log("🔎 Calculating Scores for All Locations...");
  
    wifiData.forEach((locationEntry: LocationEntry) => {
      let score = 0;
      let matchedCount = 0;
  
      scannedNetworks.forEach((network) => {
        if (network.signalStrength < -90) return; // Ignore very weak signals
  
        const knownNetwork = locationEntry.signals.find((s) => s.ssid === network.ssid);
        if (knownNetwork) {
          let weight = Math.max(0, 100 + knownNetwork.signalStrength);
          let difference = Math.abs(knownNetwork.signalStrength - network.signalStrength);
          
          score -= difference * (weight / 100);
          matchedCount++;
        }
      });
  
      if (matchedCount === 0) return; // Ignore locations with no matches
  
      score /= matchedCount; // Normalize the score
  
      // ✅ Print each location's score
      console.log(`📍 Location: ${locationEntry.location} | Score: ${score.toFixed(4)}`);
  
      if (score > highestScore) {
        highestScore = score;
        bestMatch = locationEntry.location;
      }
    });
  
    console.log(`🏆 Best Location: ${bestMatch} (Score: ${highestScore.toFixed(4)})`);
    return bestMatch;
  }  

export function useAutoLocation(scannerFunction: () => WifiSignal[]) {
  const [location, setLocation] = useState<string>("Detecting...");
  const lastLocationsRef = useRef<string[]>([]);
  const lastScanRef = useRef<number>(0);

  useEffect(() => {
    const updateLocation = async () => {
      const scannedNetworks = await scannerFunction(); // Ensure fresh WiFi scan
      lastScanRef.current = Date.now(); // Log last scan timestamp

      const bestMatch = findBestLocation(scannedNetworks);
      lastLocationsRef.current.push(bestMatch);

      if (lastLocationsRef.current.length > STABILITY_WINDOW) {
        lastLocationsRef.current.shift();
      }

      // Stability Check: Find the most frequent detected location
      const stableLocation = lastLocationsRef.current.reduce((acc, loc) => {
        acc[loc] = (acc[loc] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const mostFrequentLocation = Object.keys(stableLocation).reduce((a, b) =>
        stableLocation[a] > stableLocation[b] ? a : b
      );

      console.log(`🏠 Stable Detected Location: ${mostFrequentLocation}`);
      setLocation(mostFrequentLocation);
    };

    updateLocation(); // Initial call

    const interval = setInterval(updateLocation, REFRESH_INTERVAL); // Refresh every 1.5s

    return () => clearInterval(interval);
  }, [scannerFunction]);

  return location;
}
