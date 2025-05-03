import { View, Text, TouchableOpacity, SafeAreaView, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

const HomeScreen = () => {
  const router = useRouter();
  const { width } = Dimensions.get('window');
  const buttonSize = (width - 44) / 2;

  const QuadrantButton = ({
    title,
    iconName, // Changed from icon to iconName for MaterialIcons
    color,
    onPress,
  }: {
    title: string;
    iconName: string; // Use string for MaterialIcons name
    color: string;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className={`${color} justify-center items-center rounded-xl border border-gray-200`}
      style={{
        width: buttonSize,
        height: buttonSize * 1.7,
        margin: 8,
      }}
    >
      <MaterialIcons
        name={iconName}
        size={48} // Match the size-12 (48px) from original Image
        color="white" // Match the tintColor="white" from original Image
        style={{ marginBottom: 12 }} // Increased from mb-3 (12px) to match TabIcon spacing
      />
      <Text className="text-2xl font-rubik-medium text-white text-center px-2">
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="h-full bg-white">
      <View className="flex-1 justify-center items-center p-4">
        <View className="flex-row">
          <QuadrantButton
            title="Indoor Navigation"
            iconName="door-front" // MaterialIcons equivalent
            color="bg-blue-700"
            onPress={() => router.push("/(root)/(tabs)/indoor")}
          />
          <QuadrantButton
            title="Outdoor Navigation"
            iconName="park" // MaterialIcons equivalent
            color="bg-orange-600"
            onPress={() => router.push("/(root)/(tabs)/outdoor")}
          />
        </View>
        <View className="flex-row">
          <QuadrantButton
            title="Seat Detection"
            iconName="event-seat" // MaterialIcons equivalent
            color="bg-green-700"
            onPress={() => router.push("/(root)/(tabs)/seatDetection")}
          />
          <QuadrantButton
            title="Profile"
            iconName="person" // MaterialIcons equivalent
            color="bg-purple-800"
            onPress={() => router.push("/(root)/(tabs)/profile")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;