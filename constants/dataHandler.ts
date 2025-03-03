import wifi from "react-native-wifi-reborn";
import wifiData from "@/constants/wifidata";

export const detectLocation = async () => {
  try {
    const networks = await wifi.loadWifiList(); // Get current WiFi networks

    let bestMatch = { location: "Unknown", matchScore: 0 };

    wifiData.forEach((room) => {
      let matchScore = 0;

      room.signals.forEach((savedNetwork) => {
        const foundNetwork = networks.find((net) => net.SSID === savedNetwork.ssid);
        if (foundNetwork) {
          const diff = Math.abs(foundNetwork.level - savedNetwork.signalStrength);
          if (diff < 10) matchScore += 2; // Strong match
          else if (diff < 20) matchScore += 1; // Weak match
        }
      });

      if (matchScore > bestMatch.matchScore) {
        bestMatch = { location: room.location, matchScore };
      }
    });

    return bestMatch.location;
  } catch (error) {
    console.error("Error detecting location:", error);
    return "Unknown";
  }
};
