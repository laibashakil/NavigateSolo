import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import useWiFiScanner from "../../../hooks/useWiFiScanner";
import predictLocation from "../../utils/predictLocation";

const WiFiLocation = () => {
  const { wifiSignals, error, isScanning } = useWiFiScanner(3000); // Scan every 3s
  const [location, setLocation] = useState("Scanning...");

  useEffect(() => {
    console.log("🔍 Scanned WiFi Signals:", wifiSignals);
    console.log("⚠️ Error (if any):", error);

    if (error) {
      setLocation(`Error: ${error}`);
      return;
    }

    if (isScanning || !wifiSignals || wifiSignals.length === 0) {
      setLocation("Scanning for WiFi signals...");
      return;
    }

    const predictedLocation = predictLocation(wifiSignals);
    console.log("📍 Predicted Location:", predictedLocation);
    setLocation(predictedLocation);
  }, [wifiSignals, error, isScanning]);

  return (
    <View style={{ padding: 20, alignItems: "center" }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Current Location:</Text>
      <Text style={{ fontSize: 24, color: "blue" }}>{location}</Text>
      {(isScanning || location.startsWith("Scanning") || location.startsWith("Error")) && (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
};

export default WiFiLocation;