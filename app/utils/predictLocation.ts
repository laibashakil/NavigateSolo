import wifiData from "../../constants/wifiData";

// Define the type for a WiFi signal
interface WiFiSignal {
  ssid: string;
  signalStrength: number;
}

// Define the type for a Room containing signals and a location
interface Room {
  location: string;
  signals: WiFiSignal[];
}

const predictLocation = (scannedSignals: WiFiSignal[]): string => {
  let bestMatch: string | null = null;
  let highestMatchCount = 0;

  wifiData.forEach((room: Room) => {
    let matchCount = 0;
    
    room.signals.forEach((storedSignal) => {
      const match = scannedSignals.find(
        (scan) =>
          scan.ssid === storedSignal.ssid &&
          Math.abs(scan.signalStrength - storedSignal.signalStrength) <= 5 // Allow slight variations
      );

      if (match) {
        matchCount++;
      }
    });

    if (matchCount > highestMatchCount) {
      highestMatchCount = matchCount;
      bestMatch = room.location;
    }
  });

  return bestMatch || "Unknown Location";
};

export default predictLocation;
