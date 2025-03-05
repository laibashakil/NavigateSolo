import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import useWiFiScanner from "../../../hooks/useWiFiScanner";

import predictLocation from "../../utils/predictLocation";

const WiFiLocation = () => {
  const wifiSignals = useWiFiScanner();
  const [location, setLocation] = useState("Scanning...");

  useEffect(() => {
    if (wifiSignals && wifiSignals.length > 0) {
      const predictedLocation = predictLocation(wifiSignals);
      setLocation(predictedLocation);
    }
  }, [wifiSignals]);

  return (
    <View style={{ padding: 20, alignItems: "center" }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        Current Location:
      </Text>
      <Text style={{ fontSize: 24, color: "blue" }}>{location}</Text>
      {location === "Scanning..." && <ActivityIndicator size="large" />}
    </View>
  );
};

export default WiFiLocation;
