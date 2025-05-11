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
import { MaterialIcons } from "@expo/vector-icons";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useGlobalContext } from "@/lib/global-provider";

import icons from "@/constants/icons";
import { settings } from "@/constants/data";

type MaterialIconName = React.ComponentProps<typeof MaterialIcons>['name'];

interface SettingsItemProp {
  icon: MaterialIconName;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
  iconColor?: string;
}

const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
  iconColor = "#666876",
}: SettingsItemProp) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex flex-row items-center justify-between py-3"
  >
    <View className="flex flex-row items-center gap-3">
      <MaterialIcons name={icon} size={24} color={iconColor} />
      <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>
        {title}
      </Text>
    </View>

    {showArrow && <MaterialIcons name="chevron-right" size={24} color="#666876" />}
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
        </View>

        {/* Avatar and User Info */}
        <View className="flex flex-row justify-center mt-5">
          <View className="flex flex-col items-center relative mt-5">
            <View className="w-44 h-44 rounded-full bg-gray-300 flex items-center justify-center">
              {user?.photo ? (
                <Image
                  source={{ uri: user?.photo }}
                  className="rounded-full w-44 h-44"
                />
              ) : (
                <Text className="text-5xl font-rubik-bold text-white">
                  {user?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Text>
              )}
            </View>

            <Text className="text-2xl font-rubik-bold mt-2">{user?.name}</Text>
            <Text className="text-sm font-rubik">{user?.email}</Text>
          </View>
        </View>

        {/* Settings Items */}
        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          <SettingsItem
            icon="person"
            title="Account Settings"
            onPress={() => router.push("/(root)/EditProfileScreen")}
          />
          <SettingsItem
            icon="info"
            title="About"
            onPress={() => router.push("/(root)/AboutScreen")}
          />
          <SettingsItem
            icon="help"
            title="FAQ"
            onPress={() => router.push("/(root)/FAQScreen")}
          />
          <SettingsItem
            icon="security"
            title="Privacy Policy"
            onPress={() => router.push("/(root)/PrivacyPolicyScreen")}
          />
          <SettingsItem
            icon="code"
            title="Developer Mode"
            onPress={() => router.push("/(root)/collect")}
          />
        </View>

        {/* Logout Button */}
        <View className="flex flex-col border-t mt-5 pt-5 border-primary-200">
          <SettingsItem
            icon="logout"
            title="Logout"
            textStyle="text-danger"
            iconColor="#FF3B30"
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
