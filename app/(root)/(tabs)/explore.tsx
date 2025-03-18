import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { scanWiFi } from "../../utils/scanWiFi";
import { applyKalmanFilter } from "../../utils/kalmanFilter";
import { findBestLocation } from "../../utils/locationFinder";
import { useRouter } from "expo-router";

interface WifiNetwork {
  ssid: string;
  mac: string;
  signalStrength: string;
}

const SCAN_COOLDOWN = 30; // 30 seconds cooldown between scans

const ExploreScreen = () => {
  const router = useRouter();
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [lastScanTime, setLastScanTime] = useState<string>("Never");
  const [scanStatus, setScanStatus] = useState<"idle" | "scanning" | "processing" | "cooldown">("idle");
  const [networkCount, setNetworkCount] = useState<number>(0);
  const [cooldownTimer, setCooldownTimer] = useState<number>(0);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    
    // Handle cooldown timer
    if (scanStatus === "cooldown" && cooldownTimer > 0) {
      timer = setInterval(() => {
        setCooldownTimer(prev => {
          if (prev <= 1) {
            setScanStatus("idle");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [scanStatus, cooldownTimer]);

  const scanWiFiAndUpdate = async () => {
    try {
      setScanStatus("scanning");
      console.log("\n🔄 Starting new WiFi scan...");
      console.log(`⏰ Time: ${new Date().toLocaleTimeString()}`);
      
      const liveData: WifiNetwork[] = await scanWiFi();
      setNetworkCount(liveData.length);
      console.log(`📡 Found ${liveData.length} WiFi networks`);

      if (liveData.length > 0) {
        setScanStatus("processing");
        const filteredData = applyKalmanFilter(liveData);
        const detectedLocation = findBestLocation(filteredData);
        setCurrentLocation(detectedLocation);
        setLastScanTime(new Date().toLocaleTimeString());
        
        // Start cooldown period
        setScanStatus("cooldown");
        setCooldownTimer(SCAN_COOLDOWN);
      } else {
        console.log("⚠️ No WiFi networks found");
        setScanStatus("cooldown");
        setCooldownTimer(SCAN_COOLDOWN);
      }
    } catch (error) {
      console.error("❌ Scan failed:", error);
      setScanStatus("cooldown");
      setCooldownTimer(SCAN_COOLDOWN);
    }
  };

  const getStatusColor = () => {
    switch (scanStatus) {
      case "scanning": return "text-blue-500";
      case "processing": return "text-yellow-500";
      case "cooldown": return "text-orange-500";
      default: return "text-green-500";
    }
  };

  const getStatusText = () => {
    switch (scanStatus) {
      case "scanning": return "Scanning WiFi networks...";
      case "processing": return "Processing signals...";
      case "cooldown": return `Ready in ${cooldownTimer}s`;
      default: return "Ready to scan";
    }
  };

  const isScanDisabled = scanStatus !== "idle";

  return (
    <View className="flex-1 items-center justify-center p-4 bg-white">
      {/* Header */}
      <Text className="text-2xl font-bold mb-6">Indoor Location</Text>

      {/* Current Location Display */}
      <View className="bg-gray-50 rounded-lg p-6 w-full max-w-sm shadow-sm mb-6">
        <Text className="text-sm text-gray-500 mb-2">Current Location</Text>
        <Text className="text-xl font-semibold text-gray-800">
          {currentLocation || "Not detected yet"}
        </Text>
      </View>

      {/* Status Section */}
      <View className="bg-gray-50 rounded-lg p-4 w-full max-w-sm mb-6">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-sm text-gray-500">Status</Text>
          <View className="flex-row items-center">
            {(scanStatus !== "idle") && (
              <ActivityIndicator size="small" className="mr-2" />
            )}
            <Text className={`text-sm ${getStatusColor()}`}>
              {getStatusText()}
            </Text>
          </View>
        </View>

        {/* Scan Info */}
        <View className="space-y-2">
          <View className="flex-row justify-between">
            <Text className="text-sm text-gray-500">Last Scan</Text>
            <Text className="text-sm text-gray-700">{lastScanTime}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-sm text-gray-500">Networks Found</Text>
            <Text className="text-sm text-gray-700">{networkCount}</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="w-full max-w-sm space-y-4">
        {/* Detect Location Button */}
        <TouchableOpacity
          className={`p-4 rounded-lg ${
            isScanDisabled ? "bg-gray-400" : "bg-blue-500"
          }`}
          onPress={scanWiFiAndUpdate}
          disabled={isScanDisabled}
        >
          <Text className="text-white text-center text-lg font-semibold">
            {scanStatus === "scanning" ? "Scanning..." : 
             scanStatus === "processing" ? "Processing..." : 
             scanStatus === "cooldown" ? `Scan in ${cooldownTimer}s` : 
             "Detect Location"}
          </Text>
        </TouchableOpacity>

        {/* Collect Data Button */}
        <TouchableOpacity
          className="bg-green-500 p-4 rounded-lg"
          onPress={() => router.push("../collect")}
        >
          <Text className="text-white text-center text-lg font-semibold">
            Collect Location Data
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExploreScreen;
