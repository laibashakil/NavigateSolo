import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useGlobalContext } from "@/lib/global-provider";
import { databases, config } from "@/lib/appwrite";
import { Query } from "react-native-appwrite";

const EditProfileScreen = () => {
  const { user, refetch } = useGlobalContext();

  // Local state for editable fields
  const [phoneNumber, setPhoneNumber] = useState("");
  const [homeLocation, setHomeLocation] = useState("");
  const [emergencyContacts, setEmergencyContacts] = useState<string[]>([""]);

  useEffect(() => {
    // Fetch existing user data from the database
    const fetchUserData = async () => {
      try {
        const response = await databases.listDocuments(
          config.databaseId!,
          config.usersCollectionId!,
          [user?.email ? Query.equal("email", user.email) : Query.equal("email", "")]
        );

        if (response.documents.length > 0) {
          const userData = response.documents[0];
          setPhoneNumber(userData.phoneNumber || "");
          setHomeLocation(userData.homeLocation || "");
          setEmergencyContacts(userData.emergencyContacts || [""]);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user?.email) {
      fetchUserData();
    }
  }, [user?.email]);

  // Function to update user data
  const handleUpdateProfile = async () => {
    try {
      const response = await databases.listDocuments(
        config.databaseId!,
        config.usersCollectionId!,
        [user?.email ? Query.equal("email", user.email) : Query.equal("email", "")]
      );

      if (response.documents.length === 0) {
        Alert.alert("Error", "User data not found in database.");
        return;
      }

      const userId = response.documents[0].$id;

      await databases.updateDocument(
        config.databaseId!,
        config.usersCollectionId!,
        userId,
        {
          phoneNumber,
          homeLocation,
          emergencyContacts,
        }
      );

      Alert.alert("Success", "Profile updated successfully.");
      refetch(); // Refresh user data in context
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile.");
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
        <Text className="text-xl font-rubik-bold text-black-500 mb-4">
          Edit Profile
        </Text>
  
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
                    className="ml-2 p-2 bg-red-500 rounded-lg"
                    onPress={() => removeEmergencyContact(index)}
                  >
                    <Text className="text-white font-bold">X</Text>
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
