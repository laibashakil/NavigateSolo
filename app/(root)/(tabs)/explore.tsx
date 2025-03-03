import { View, Text, Button } from "react-native";
import { useState } from "react";
import { detectLocation } from "@/constants/dataHandler";

export default function ExploreScreen() {
  const [location, setLocation] = useState("Unknown");

  const handleDetectLocation = async () => {
    const detected = await detectLocation();
    setLocation(detected);
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold">📍 Your Location:</Text>
      <Text className="text-2xl mt-2">{location}</Text>

      <Button title="Detect Location" onPress={handleDetectLocation} />
    </View>
  );
}
