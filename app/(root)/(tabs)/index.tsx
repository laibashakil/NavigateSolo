import { View, Text, TouchableOpacity, Image, SafeAreaView, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import icons from "@/constants/icons";

const HomeScreen = () => {
  const router = useRouter();
  const { width, height } = Dimensions.get('window');
  const buttonSize = (Math.min(width, height) - 48) / 2; // Screen size minus margins, divided by 2

  const QuadrantButton = ({ 
    title, 
    icon, 
    color, 
    onPress 
  }: { 
    title: string; 
    icon: any; 
    color: string; 
    onPress: () => void 
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className={`${color} justify-center items-center rounded-2xl shadow-lg`}
      style={{ 
        width: buttonSize,
        height: buttonSize,
        margin: 8,
        elevation: 5, // For Android shadow
        shadowColor: "#000", // For iOS shadow
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      }}
    >
      <Image source={icon} className="w-16 h-16 mb-4" resizeMode="contain" />
      <Text className="text-white text-xl font-rubik-bold text-center">{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 justify-center items-center p-4">
        <View className="flex-row">
          <QuadrantButton
            title="Indoor Navigation"
            icon={icons.doorClosed}
            color="bg-primary-300"
            onPress={() => router.push("/(root)/(tabs)/indoor")}
          />
          <QuadrantButton
            title="Outdoor Navigation"
            icon={icons.map}
            color="bg-blue-500"
            onPress={() => router.push("/(root)/(tabs)/outdoor")}
          />
        </View>
        <View className="flex-row">
          <QuadrantButton
            title="Seat Detection"
            icon={icons.location}
            color="bg-green-500"
            onPress={() => router.push("/(root)/(tabs)")}
          />
          <QuadrantButton
            title="Profile"
            icon={icons.person}
            color="bg-purple-500"
            onPress={() => router.push("/(root)/(tabs)/profile")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;