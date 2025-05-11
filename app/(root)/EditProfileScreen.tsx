import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { useGlobalContext } from "@/lib/global-provider";
import { updateUserData, getUserData } from "@/lib/appwrite";
import { useRouter } from "expo-router";
import icons from "@/constants/icons";

const EditProfileScreen = () => {
  const { user, refetch } = useGlobalContext();
  const router = useRouter();

  // Local state for editable fields
  const [phoneNumber, setPhoneNumber] = useState("");
  const [homeLocation, setHomeLocation] = useState("");
  const [emergencyContacts, setEmergencyContacts] = useState<string[]>([""]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch existing user data from the database
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const userData = await getUserData();
        
        setPhoneNumber(userData.phoneNumber || "");
        setHomeLocation(userData.homeLocation || "");
        setEmergencyContacts(userData.emergencyContacts || [""]);
      } catch (error) {
        console.error("Error fetching user data:", error);
        Alert.alert("Error", "Failed to load profile data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.email) {
      fetchUserData();
    }
  }, [user?.email]);

  // Function to update user data
  const handleUpdateProfile = async () => {
    try {
      await updateUserData({
        phoneNumber,
        homeLocation,
        emergencyContacts,
      });

      Alert.alert("Success", "Profile updated successfully.");
      refetch(); // Refresh user data in context
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    }
  };

  // Function to add a new emergency contact field
  const addEmergencyContact = () => {
    setEmergencyContacts([...emergencyContacts, ""]);
  };

  // Function to update an emergency contact
  const updateEmergencyContact = (index: number, value: string) => {
    const updatedContacts = [...emergencyContacts];
    updatedContacts[index] = value;
    setEmergencyContacts(updatedContacts);
  };

  // Function to remove an emergency contact
  const removeEmergencyContact = (index: number) => {
    if (emergencyContacts.length > 1) {
      setEmergencyContacts(emergencyContacts.filter((_, i) => i !== index));
    }
  };

  return (
    <View className="flex-1 justify-between">
      <ScrollView className="flex-1 bg-white p-6">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity 
            onPress={() => router.push("/(root)/(tabs)/profile")}
            className="flex-row items-center"
          >
            <Image source={icons.backArrow} className="w-6 h-6 mr-2" />
            <Text className="text-2xl font-bold">Account Settings</Text>
          </TouchableOpacity>
        </View>
  
        {/* Unchangeable Fields */}
        <View className="mb-4">
          <Text className="text-lg font-rubik-medium text-black-300">Name</Text>
          <View className="border border-gray-300 bg-gray-100 p-3 rounded-lg mt-1">
            <Text className="text-black-400">{user?.name}</Text>
          </View>
        </View>
  
        <View className="mb-4">
          <Text className="text-lg font-rubik-medium text-black-300">Email</Text>
          <View className="border border-gray-300 bg-gray-100 p-3 rounded-lg mt-1">
            <Text className="text-black-400">{user?.email}</Text>
          </View>
        </View>
  
        {/* Editable Fields */}
        <View className="mb-4">
          <Text className="text-lg font-rubik-medium text-black-300">
            Phone Number
          </Text>
          <TextInput
            className="border border-gray-300 p-3 rounded-lg mt-1"
            placeholder="Enter phone number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
  
        <View className="mb-4">
          <Text className="text-lg font-rubik-medium text-black-300">
            Home Location
          </Text>
          <TextInput
            className="border border-gray-300 p-3 rounded-lg mt-1"
            placeholder="Enter home location"
            value={homeLocation}
            onChangeText={setHomeLocation}
          />
        </View>
  
        {/* Emergency Contacts */}
        <View className="mb-6">
          <Text className="text-lg font-rubik-medium text-black-300">
            Emergency Contacts
          </Text>
  
          {/* Ensure at least one input box is always visible */}
          {(emergencyContacts.length === 0 ? [""] : emergencyContacts).map(
            (contact, index) => (
              <View key={index} className="flex-row items-center mt-2">
                <TextInput
                  className="flex-1 border border-gray-300 p-3 rounded-lg"
                  placeholder="Enter emergency contact"
                  value={contact}
                  onChangeText={(value) => updateEmergencyContact(index, value)}
                />
                {index > 0 && (
                  <TouchableOpacity
                    className="ml-2 px-3 py-2 bg-red-500 rounded-lg"
                    onPress={() => removeEmergencyContact(index)}
                  >
                    <Text className="text-white font-rubik-medium">Cancel</Text>
                  </TouchableOpacity>
                )}
              </View>
            )
          )}
  
          {/* Add More Button (Right-Aligned & Smaller) */}
          <TouchableOpacity
            className="mt-3 self-end p-1 px-2 rounded-lg"
            onPress={addEmergencyContact}
          >
            <Text className="text-primary-300 font-rubik-bold text-base">
              + Add More
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
  
      {/* Save Button (Fixed at Bottom) */}
      <View className="p-6 bg-white">
        <TouchableOpacity
          className="bg-primary-300 p-4 rounded-lg items-center"
          onPress={handleUpdateProfile}
        >
          <Text className="text-white font-rubik-bold text-lg">Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}  

export default EditProfileScreen;
