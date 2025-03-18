import WifiManager from "react-native-wifi-reborn";
import { PermissionsAndroid, Platform } from "react-native";

interface WifiNetwork {
  ssid: string;
  signalStrength: number;
}

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
  try {
    await requestPermissions();

    // Avoid excessive scanning
    const results = await WifiManager.loadWifiList();

    if (!Array.isArray(results)) {
      console.error("Unexpected WiFi scan result:", results);
      return lastScanResults;
    }

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
