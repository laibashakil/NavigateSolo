import { useState, useEffect } from "react";
import WifiManager from "react-native-wifi-reborn";
import { Platform } from "react-native";
import * as Location from "expo-location";

interface WiFiSignal {
  ssid: string;
  signalStrength: number;
}

const useWiFiScanner = (scanInterval: number = 5000) => {
  const [wifiSignals, setWifiSignals] = useState<WiFiSignal[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    const requestPermissions = async () => {
      if (Platform.OS === "android") {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Location permission denied. WiFi scanning won't work.");
          return false;
        }
      }
      return true;
    };

    const scanWiFi = async () => {
      if (isScanning) return;
      setIsScanning(true);
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        setIsScanning(false);
        return;
      }

      try {
        const networks = await WifiManager.loadWifiList();
        const formattedSignals = networks
          .filter((net) => net.SSID && net.level !== undefined)
          .map((net) => ({
            ssid: net.SSID,
            signalStrength: net.level,
          }));
        setWifiSignals(formattedSignals);
        setError(null);
      } catch (err) {
        // Type guard to ensure err is an Error object
        const errorMessage = err instanceof Error ? err.message : String(err);
        setError(`Error scanning WiFi: ${errorMessage}`);
        console.error("WiFi Scan Error:", err);
      } finally {
        setIsScanning(false);
      }
    };

    scanWiFi();
    intervalId = setInterval(scanWiFi, scanInterval);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [scanInterval]);

  return { wifiSignals, error, isScanning };
};

export default useWiFiScanner;