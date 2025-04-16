import { View, Text, ScrollView, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import icons from "@/constants/icons";

const PrivacyPolicyScreen = () => {
  const router = useRouter();

  const sections = [
    {
      title: "Information We Collect",
      content: "We collect information necessary to provide our navigation services, including:\n\n" +
              "• Location data for navigation purposes\n" +
              "• WiFi network information for indoor navigation\n" +
              "• Device information for app optimization\n" +
              "• Usage statistics to improve our services"
    },
    {
      title: "How We Use Your Information",
      content: "Your information is used to:\n\n" +
              "• Provide accurate navigation services\n" +
              "• Improve app functionality\n" +
              "• Personalize your experience\n" +
              "• Ensure app security and prevent fraud"
    },
    {
      title: "Data Security",
      content: "We implement industry-standard security measures to protect your data, including:\n\n" +
              "• Encryption of sensitive information\n" +
              "• Regular security audits\n" +
              "• Secure data storage\n" +
              "• Limited access to personal data"
    },
    {
      title: "Your Rights",
      content: "You have the right to:\n\n" +
              "• Access your personal data\n" +
              "• Request data deletion\n" +
              "• Opt-out of data collection\n" +
              "• Update your information"
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
        <Text className="text-gray-500 mb-6">Last Updated: March 15, 2024</Text>

        {/* Introduction */}
        <Text className="text-gray-600 mb-6">
          At NavigateSolo, we take your privacy seriously. This Privacy Policy explains how we collect, 
          use, and protect your personal information when you use our app.
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

        {/* Contact Information */}
        <View className="mt-8 bg-gray-50 p-4 rounded-lg">
          <Text className="text-lg font-semibold mb-2">Contact Us</Text>
          <Text className="text-gray-600">
            If you have any questions about our Privacy Policy, please contact us at:
            {"\n\n"}
            Email: privacy@navigatesolo.com{"\n"}
            Phone: +1 (555) 123-4567
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicyScreen; 