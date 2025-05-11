import { View, Text, ScrollView, SafeAreaView, Image, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";
import icons from "@/constants/icons";

const PrivacyPolicyScreen = () => {
  const router = useRouter();

  const handleEmailPress = () => {
    Linking.openURL('mailto:navigatesoloofficial@gmail.com');
  };

  const sections = [
    {
      title: "Information We Collect",
      content: "We collect minimal information necessary to provide our navigation services, including:\n\n" +
              "• Location data for navigation purposes\n" +
              "• WiFi network information for indoor location matching\n" +
              "• Basic Google account information (email, name, photo) for authentication"
    },
    {
      title: "How We Use Your Information",
      content: "Your information is used to:\n\n" +
              "• Provide accurate navigation services\n" +
              "• Match your location with indoor spaces\n" +
              "• Maintain your authentication state\n" +
              "• Ensure app security"
    },
    {
      title: "Data Security",
      content: "We implement security measures to protect your data, including:\n\n" +
              "• Secure session management\n" +
              "• Protection against brute force attacks\n" +
              "• Limited access to personal data\n" +
              "• No persistent storage of location or WiFi data"
    },
    {
      title: "Your Rights",
      content: "You have the right to:\n\n" +
              "• Access your personal data\n" +
              "• Request data deletion\n" +
              "• Manage your Google account permissions\n" +
              "• Control location and WiFi scanning permissions"
    }
  ];

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
            <Text className="text-2xl font-bold">Privacy Policy</Text>
          </TouchableOpacity>
        </View>

        {/* Last Updated */}
        <Text className="text-gray-500 mb-6">Last Updated: 11 May 2025</Text>

        {/* Introduction */}
        <Text className="text-gray-600 mb-6">
          At NavigateSolo, we take your privacy seriously. This Privacy Policy explains how we collect, 
          use, and protect your personal information when you use our app. We use Google Sign-In for authentication 
          and maintain session persistence for a seamless user experience. We do not collect or store any usage statistics 
          or device information.
        </Text>

        {/* Policy Sections */}
        <View className="space-y-6">
          {sections.map((section, index) => (
            <View key={index} className="bg-gray-50 p-4 rounded-lg">
              <Text className="text-lg font-semibold mb-2">{section.title}</Text>
              <Text className="text-gray-600">{section.content}</Text>
            </View>
          ))}
        </View>

        {/* Contact Support */}
        <View className="mt-8 bg-blue-50 p-4 rounded-lg">
          <Text className="text-lg font-semibold mb-2">Privacy Concerns?</Text>
          <Text className="text-gray-600 mb-4">
            If you have any questions about our privacy practices or data handling, please contact us at navigatesoloofficial@gmail.com
          </Text>
          <TouchableOpacity 
            className="bg-blue-500 py-2 px-4 rounded-lg self-start"
            onPress={handleEmailPress}
          >
            <Text className="text-white font-semibold">Contact Privacy Team</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicyScreen; 