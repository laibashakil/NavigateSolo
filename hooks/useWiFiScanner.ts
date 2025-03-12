import { useState, useEffect } from "react";
import WifiManager from "react-native-wifi-reborn";
import { Platform } from "react-native";

const useWiFiScanner = () => {
  const [wifiSignals, setWifiSignals] = useState<any[]>([]);

  useEffect(() => {
    const scanWiFi = async () => {
      if (Platform.OS === "android") {
        try {
          const networks = await WifiManager.loadWifiList();
          setWifiSignals(networks);
        } catch (error) {
          console.error("Error scanning WiFi networks:", error);
        }
      }
    };

    scanWiFi();
  }, []);

  return wifiSignals;
};

export default useWiFiScanner;
