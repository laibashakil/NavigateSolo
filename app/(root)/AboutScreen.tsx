import { View, Text, ScrollView, SafeAreaView, Image, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";
import icons from "@/constants/icons";

const AboutScreen = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:navigatesolo@gmail.com');
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
              • Voice-guided instructions with haptic feedback{"\n"}
              • Real-time location updates{"\n"}
              • Automatic arrival detection{"\n"}
              • Google Sign-In for secure authentication
            </Text>
          </View>

          <View className="bg-gray-50 p-4 rounded-lg">
            <Text className="text-lg font-semibold mb-2">About the Developers</Text>
            <Text className="text-gray-600">
              NavigateSolo is a final year project developed by students from the Computer Science and Information Technology Department 
              of NED University of Engineering and Technology, Karachi, Pakistan.{"\n\n"}
              Development Team (Batch 2021):{"\n"}
              • Laiba Shakil{"\n"}
              • Noor Ul Imaan{"\n"}
              • Alishba Khawer{"\n"}
              • Aamna Khalid
            </Text>
          </View>

          {/* Contact Support */}
          <View className="mt-8 bg-blue-50 p-4 rounded-lg">
            <Text className="text-lg font-semibold mb-2">Want to know more?</Text>
            <Text className="text-gray-600 mb-4">
              Have questions about our project or want to collaborate? Reach out to us at navigatesolo@gmail.com
            </Text>
            <TouchableOpacity 
              className="bg-blue-500 py-2 px-4 rounded-lg self-start"
              onPress={handleEmailPress}
            >
              <Text className="text-white font-semibold">Contact Us</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutScreen; 