import WifiManager from "react-native-wifi-reborn";
import { PermissionsAndroid, Platform } from "react-native";

interface WifiNetwork {
  ssid: string;
  signalStrength: number;
}

let lastScanTime = 0;
let lastScanResults: WifiNetwork[] = [];

const requestPermissions = async () => {
  if (Platform.OS === "android") {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ]);
  }
};

export const scanWiFi = async (): Promise<WifiNetwork[]> => {
  const currentTime = Date.now();

  // ✅ Use cached results if scanning too frequently
  if (currentTime - lastScanTime < 30000) {
    console.log("Using cached WiFi data to avoid scan limits.");
    return lastScanResults;
  }

  try {
    await requestPermissions();

    const results = await WifiManager.reScanAndLoadWifiList();

    if (!Array.isArray(results)) {
      console.error("WiFi scan returned an unexpected result:", results);
      return lastScanResults;
    }

    lastScanTime = currentTime;
    lastScanResults = results.map((network: any) => ({
      ssid: network.SSID,
      signalStrength: network.level,
    }));

    return lastScanResults;
  } catch (error) {
    console.error("WiFi scan failed:", error);
    return lastScanResults;
  }
};
