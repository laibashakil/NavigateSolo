import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useGlobalContext } from "@/lib/global-provider";

import icons from "@/constants/icons";
import { settings } from "@/constants/data";

interface SettingsItemProp {
  icon: any;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingsItemProp) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex flex-row items-center justify-between py-3"
  >
    <View className="flex flex-row items-center gap-3">
      <Image source={icon} className="size-6" />
      <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>
        {title}
      </Text>
    </View>

    {showArrow && <Image source={icons.rightArrow} className="size-5" />}
  </TouchableOpacity>
);

const Profile = () => {
  const { user, refetch, loading } = useGlobalContext();
  const router = useRouter();

  // Ensure we fetch the user data again if it becomes null
  useEffect(() => {
    if (!user) {
      console.warn("⚠️ User is null. Refetching...");
      refetch();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await GoogleSignin.revokeAccess(); // Revoke access token
      await GoogleSignin.signOut(); // Sign out from Google
      refetch(); // Refresh global state
      Alert.alert("Success", "Logged out successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to logout");
      console.error("Logout Error:", error);
    }
  };

  // Show a loading spinner until user data is fully loaded
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // If user is still null after loading, force a logout (avoiding broken state)
  if (!user) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-lg font-rubik text-center">
          Something went wrong. Please log in again.
        </Text>
        <TouchableOpacity
          className="mt-4 px-6 py-2 bg-red-500 rounded-lg"
          onPress={handleLogout}
        >
          <Text className="text-white font-rubik">Log In Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <Image source={icons.bell} className="size-5" />
        </View>

        {/* Avatar and User Info */}
        <View className="flex flex-row justify-center mt-5">
          <View className="flex flex-col items-center relative mt-5">
            <View className="size-44 rounded-full bg-gray-300 flex items-center justify-center">
              <Text className="text-5xl font-rubik-bold text-white">
                {user?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Text>
            </View>

            <Text className="text-2xl font-rubik-bold mt-2">{user?.name}</Text>
            <Text className="text-sm font-rubik">{user?.email}</Text>
          </View>
        </View>

        {/* Settings Items */}
        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          {settings.map((item, index) => (
            <SettingsItem
              key={index}
              {...item}
              onPress={() => {
                if (item.title === "Edit Profile") {
                  router.push("/EditProfileScreen"); // Navigate to Edit Profile
                }
              }}
            />
          ))}
        </View>

        {/* Logout Button */}
        <View className="flex flex-col border-t mt-5 pt-5 border-primary-200">
          <SettingsItem
            icon={icons.logout}
            title="Logout"
            textStyle="text-danger"
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
