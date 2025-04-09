import WifiManager from "react-native-wifi-reborn";
import { PermissionsAndroid, Platform } from "react-native";

interface WifiNetwork {
  ssid: string;
  mac: string;
  signalStrength: string;
}

let lastScanResults: WifiNetwork[] = [];
let lastSuccessfulScan: number = 0;
const MIN_SCAN_INTERVAL = 30000; // 30 seconds minimum between scans

const requestPermissions = async () => {
  if (Platform.OS === "android") {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ]);
  }
};

export const scanWiFi = async (): Promise<WifiNetwork[]> => {
  try {
    await requestPermissions();

    const now = Date.now();
    // Check if we're scanning too frequently
    if (now - lastSuccessfulScan < MIN_SCAN_INTERVAL) {
      console.log("⏳ Using cached results due to scan interval limitation");
      return lastScanResults;
    }

    // Attempt new scan
    const results = await WifiManager.loadWifiList();

    if (!Array.isArray(results)) {
      console.error("❌ Unexpected WiFi scan result format");
      return lastScanResults;
    }

    // Filter and process results
    const processedResults = results
      .filter(network => {
        // Filter out obviously invalid results
        return network.SSID && 
               network.BSSID && 
               network.level && 
               network.level >= -100 && 
               network.level <= 0;
      })
      .map((network: any) => ({
        ssid: network.SSID,
        mac: network.BSSID,
        signalStrength: network.level.toString()
      }));

    if (processedResults.length === 0) {
      console.warn("⚠️ No valid networks found in scan");
      return lastScanResults;
    }

    // Compare with last scan for dramatic changes
    if (lastScanResults.length > 0) {
      const previousCount = lastScanResults.length;
      const currentCount = processedResults.length;
      const countDifference = Math.abs(previousCount - currentCount);
      
      // If there's a dramatic change in network count (>50% difference)
      if (previousCount > 0 && (countDifference / previousCount) > 0.5) {
        console.warn(`⚠️ Dramatic change in network count: ${previousCount} -> ${currentCount}`);
        // If this is a significant drop, prefer previous results
        if (currentCount < previousCount * 0.5) {
          console.log("📡 Using previous scan results due to significant network loss");
          return lastScanResults;
        }
      }
    }

    // Update our stored results
    lastScanResults = processedResults;
    lastSuccessfulScan = now;

    // Log scan statistics
    console.log(`📊 Scan Statistics:
    Networks found: ${processedResults.length}
    Strong signals (>-70dB): ${processedResults.filter(n => parseFloat(n.signalStrength) > -70).length}
    Weak signals (<-80dB): ${processedResults.filter(n => parseFloat(n.signalStrength) < -80).length}
    Time: ${new Date().toLocaleTimeString()}`);

    return processedResults;

  } catch (error) {
    console.error("❌ WiFi scan failed:", error);
    return lastScanResults;
  }
};
