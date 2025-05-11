import { View, Text, ScrollView, SafeAreaView, Image, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";
import icons from "@/constants/icons";

const FAQScreen = () => {
  const router = useRouter();

  const handleEmailPress = () => {
    Linking.openURL('mailto:navigatesoloofficial@gmail.com');
  };

  const faqs = [
    {
      question: "How does the indoor navigation work?",
      answer: "Our indoor navigation system uses WiFi signals to determine your location within a building. The app scans for nearby WiFi networks and matches them against our database to pinpoint your location. The system uses a sophisticated algorithm that considers signal strength, network stability, and trusted networks to provide accurate location detection."
    },
    {
      question: "Do I need an internet connection to use the app?",
      answer: "For indoor navigation, you only need WiFi enabled on your device - no internet connection is required. The app works by scanning local WiFi signals and matching them against pre-stored location data. However, for outdoor navigation, an internet connection is required to fetch route information."
    },
    {
      question: "How accurate is the indoor navigation?",
      answer: "The indoor navigation typically provides accuracy within 2-5 meters, depending on the WiFi environment. The system uses multiple factors including signal strength, network stability, and trusted networks to improve accuracy. The accuracy may vary based on building layout and WiFi network changes."
    },
    {
      question: "How does the voice guidance work?",
      answer: "The app provides voice guidance through text-to-speech announcements for navigation instructions. It includes haptic feedback (vibration) for important events like arrival at destination. The voice guidance automatically repeats instructions every 20 seconds during navigation to help you stay on track."
    },
    {
      question: "How do I add new locations to the system?",
      answer: "Only our development team can add new locations to the system. If you'd like a new location to be added, please contact us at navigatesoloofficial@gmail.com with your request. Our team will visit the location, scan the WiFi signals, and add it to the system. The developer mode in the profile section is for our development team only and is not accessible to regular users."
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
            <Text className="text-2xl font-bold">Frequently Asked Questions</Text>
          </TouchableOpacity>
        </View>

        {/* FAQ Content */}
        <View className="space-y-4">
          {faqs.map((faq, index) => (
            <View key={index} className="bg-gray-50 p-4 rounded-lg">
              <Text className="text-lg font-semibold mb-2">{faq.question}</Text>
              <Text className="text-gray-600">{faq.answer}</Text>
            </View>
          ))}
        </View>

        {/* Contact Support */}
        <View className="mt-8 bg-blue-50 p-4 rounded-lg">
          <Text className="text-lg font-semibold mb-2">Still have questions?</Text>
          <Text className="text-gray-600 mb-4">
            Our support team is here to help! Contact us at navigatesoloofficial@gmail.com
          </Text>
          <TouchableOpacity 
            className="bg-blue-500 py-2 px-4 rounded-lg self-start"
            onPress={handleEmailPress}
          >
            <Text className="text-white font-semibold">Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FAQScreen; 