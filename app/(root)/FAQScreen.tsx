import { View, Text, ScrollView, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import icons from "@/constants/icons";

const FAQScreen = () => {
  const router = useRouter();

  const faqs = [
    {
      question: "How does the indoor navigation work?",
      answer: "Our indoor navigation system uses WiFi signals to determine your location within a building. The app scans for nearby WiFi networks and matches them against our database to pinpoint your exact location."
    },
    {
      question: "Do I need an internet connection to use the app?",
      answer: "While an internet connection is required for initial setup and outdoor navigation, the indoor navigation feature works offline once the building's WiFi data has been downloaded."
    },
    {
      question: "How accurate is the seat detection feature?",
      answer: "The seat detection feature uses a combination of WiFi signals and Bluetooth beacons to identify available seats with an accuracy of about 1-2 meters."
    },
    {
      question: "Can I customize the voice guidance?",
      answer: "Yes! You can adjust the voice speed, volume, and even choose between different voice options in the app settings."
    },
    {
      question: "How do I update the building maps?",
      answer: "Building maps are automatically updated when you're connected to the internet. You can also manually trigger an update in the settings menu."
    }
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 p-4">
        {/* Header */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="mr-4"
          >
            <Image source={icons.backArrow} className="w-6 h-6" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold">Frequently Asked Questions</Text>
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
            Our support team is here to help! Contact us at support@navigatesolo.com
          </Text>
          <TouchableOpacity 
            className="bg-blue-500 py-2 px-4 rounded-lg self-start"
            onPress={() => {/* Add email functionality */}}
          >
            <Text className="text-white font-semibold">Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FAQScreen; 