import wifiData from "../../constants/wifiData";

interface WiFiSignal {
  ssid: string;
  signalStrength: number;
}

interface Room {
  location: string;
  signals: WiFiSignal[];
}

// Store previous locations for smooth transitions
let lastPredictedLocation: string = "Unknown Location";
const SCAN_HISTORY: WiFiSignal[][] = [];
const SCAN_HISTORY_LIMIT = 5; // Number of past scans to average

const predictLocation = (scannedSignals: WiFiSignal[]): string => {
  if (!scannedSignals || scannedSignals.length === 0) {
    console.warn("⚠️ No WiFi signals detected!");
    return "Unknown Location";
  }

  console.log("\n🔍 **Scanning for WiFi signals...**");
  scannedSignals.forEach((scan) =>
    console.log(`📡 Detected: ${scan.ssid} (Strength: ${scan.signalStrength})`)
  );

  // Add new scan to history and keep only the last few scans
  SCAN_HISTORY.push(scannedSignals);
  if (SCAN_HISTORY.length > SCAN_HISTORY_LIMIT) SCAN_HISTORY.shift();

  // Compute average signal strength across scans
  const averagedSignals: WiFiSignal[] = [];
  const ssidMap: { [key: string]: number[] } = {};

  SCAN_HISTORY.forEach((scanBatch) => {
    scanBatch.forEach((signal) => {
      if (!ssidMap[signal.ssid]) ssidMap[signal.ssid] = [];
      ssidMap[signal.ssid].push(signal.signalStrength);
    });
  });

  Object.entries(ssidMap).forEach(([ssid, strengths]) => {
    const avgStrength = strengths.reduce((sum, s) => sum + s, 0) / strengths.length;
    averagedSignals.push({ ssid, signalStrength: Math.round(avgStrength) });
  });

  console.log("\n📊 **Averaged WiFi Signals for Accuracy:**");
  averagedSignals.forEach((signal) =>
    console.log(`📊 ${signal.ssid}: Avg Strength = ${signal.signalStrength}`)
  );

  let bestMatch: { location: string; score: number } = { location: "Unknown Location", score: -Infinity };
  const minMatches = 1; // Minimum number of matching SSIDs

  console.log("\n📊 **Comparing WiFi Signals with Stored Data...**");

  wifiData.forEach((room: Room) => {
    let score = 0;
    let matchCount = 0;

    console.log(`\n🏠 Checking room: ${room.location}`);

    room.signals.forEach((storedSignal) => {
      const match = averagedSignals.find(
        (scan) =>
          scan.ssid.trim().toLowerCase() === storedSignal.ssid.trim().toLowerCase()
      );

      if (match) {
        matchCount++;
        const strengthDiff = Math.abs(match.signalStrength - storedSignal.signalStrength);
        
        // Higher penalty for minor differences
        let signalWeight = 100 - strengthDiff; // Closer strengths get higher scores
        if (strengthDiff < 5) signalWeight += 20; // Small changes matter more
        if (strengthDiff < 10) signalWeight += 10;
        
        score += Math.max(signalWeight, 0);

        console.log(`✅ Match: ${match.ssid} | Strength Diff: ${strengthDiff} | Score: +${signalWeight}`);
      }
    });

    if (score > 0 && matchCount >= minMatches && score > bestMatch.score) {
      bestMatch = { location: room.location, score };
      console.log(`🎯 **New best match:** ${room.location} (Score: ${score})`);
    }
  });

  // Allow minor changes by reducing threshold for switching locations
  if (bestMatch.location !== lastPredictedLocation && Math.abs(bestMatch.score - lastPredictedLocation.length * 10) < 50) {
    console.log(`🔄 Minor signal change detected, updating location to ${bestMatch.location}`);
  } else if (bestMatch.location !== lastPredictedLocation && bestMatch.score < 150) {
    console.log(`⚠️ Preventing sudden jump, staying at ${lastPredictedLocation}`);
    return lastPredictedLocation;
  }

  lastPredictedLocation = bestMatch.location;
  console.log("\n🏆 **Final Best Match:**", bestMatch.location, "| Score:", bestMatch.score);
  return bestMatch.location;
};

export default predictLocation;
