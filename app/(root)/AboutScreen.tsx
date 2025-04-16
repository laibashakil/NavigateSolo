import { View, Text, ScrollView, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import icons from "@/constants/icons";

const AboutScreen = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 p-4">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity 
            onPress={() => router.push("/(root)/(tabs)/profile")}
            className="flex-row items-center"
          >
            <Image source={icons.backArrow} className="w-6 h-6 mr-2" />
            <Text className="text-2xl font-bold">About NavigateSolo</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View className="space-y-6">
          <View className="bg-gray-50 p-4 rounded-lg">
            <Text className="text-lg font-semibold mb-2">Our Mission</Text>
            <Text className="text-gray-600">
              NavigateSolo is dedicated to providing accessible navigation solutions for visually impaired individuals. 
              Our app combines cutting-edge technology with user-friendly design to make indoor and outdoor navigation 
              more accessible and independent.
            </Text>
          </View>

          <View className="bg-gray-50 p-4 rounded-lg">
            <Text className="text-lg font-semibold mb-2">Features</Text>
            <Text className="text-gray-600">
              • Indoor Navigation using WiFi signals{"\n"}
              • Outdoor Navigation with detailed directions{"\n"}
              • Seat Detection for public spaces{"\n"}
              • Voice-guided instructions{"\n"}
              • Customizable profiles
            </Text>
          </View>

          <View className="bg-gray-50 p-4 rounded-lg">
            <Text className="text-lg font-semibold mb-2">Contact Us</Text>
            <Text className="text-gray-600">
              Have questions or feedback? We'd love to hear from you!{"\n\n"}
              Email: support@navigatesolo.com{"\n"}
              Phone: +1 (555) 123-4567
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutScreen; 