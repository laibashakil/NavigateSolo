import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { scanWiFi } from "../../utils/scanWiFi";
import { applyKalmanFilter } from "../../utils/kalmanFilter";
import { findBestLocation } from "../../utils/locationFinder";

interface WifiNetwork {
  ssid: string;
  signalStrength: number;
}

const SCAN_INTERVAL = 30; // Scan every 30 seconds

const ExploreScreen = () => {
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(SCAN_INTERVAL);

  useEffect(() => {
    const scanWiFiAndUpdate = async () => {
      console.log("🔄 Scanning WiFi...");
      const liveData: WifiNetwork[] = await scanWiFi();
      console.log("📡 Live WiFi Data:", liveData);

      if (liveData.length > 0) {
        const filteredData = applyKalmanFilter(liveData);
        console.log("🎯 Filtered WiFi Data:", filteredData);

        const detectedLocation = findBestLocation(filteredData);
        console.log("📍 Detected Location:", detectedLocation);
        
        setCurrentLocation(detectedLocation);
      }
    };
    // Initial scan
    scanWiFiAndUpdate();

    // Start countdown & auto-refresh
    const scanInterval = setInterval(scanWiFiAndUpdate, SCAN_INTERVAL * 1000);
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => (prev === 1 ? SCAN_INTERVAL : prev - 1));
    }, 1000);

    return () => {
      clearInterval(scanInterval);
      clearInterval(countdownInterval);
    };
  }, []);

  return (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="text-xl font-bold">Current Location</Text>
      <Text className="text-lg text-gray-700 mt-2">
        {currentLocation || "Detecting..."}
      </Text>

      {/* Countdown Timer Display */}
      <Text className="text-sm text-gray-500 mt-4">
        Next scan in: {countdown} sec
      </Text>
    </View>
  );
};

export default ExploreScreen;
