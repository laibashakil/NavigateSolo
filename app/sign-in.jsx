import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View, Alert, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router"; // ✅ Import router
import { useGlobalContext } from "@/lib/global-provider"; // ✅ Import global context
import { saveUserToDatabase } from "@/lib/appwrite";
import images from "@/constants/images";
import icons from "@/constants/icons";

export default function HomeScreen() {
  const [error, setError] = useState();
  const { user, refetch } = useGlobalContext(); // ✅ Get user data from global context
  const router = useRouter(); // ✅ Import router for navigation

  useEffect(() => {
    GoogleSignin.configure({
      ExpoClientId: "46058743249-0ktas23ef71609utpb8s34154toafocs.apps.googleusercontent.com",
      iosClientId: "46058743249-qh06cp7e1oeiidvca0qcdp6dac45anbo.apps.googleusercontent.com",
    });

    if (user) {
      console.log("✅ Already signed in, redirecting...");
      router.replace("/(root)/(tabs)"); // ✅ Redirect if already logged in
    }
  }, [user]); // ✅ Runs when user changes

  const signIn = async () => {
    console.log("Pressed sign in");

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      console.log("✅ User Info:", JSON.stringify(userInfo));
      const email = userInfo?.data?.user?.email?.trim().toLowerCase();
      console.log("Email being checked:", email);

      if (email && email.endsWith("@cloud.neduet.edu.pk")) {
        console.log("✅ Email is valid, proceeding with login");
        
        // Create user document in Appwrite
        try {
          await saveUserToDatabase();
          console.log("✅ User document created in Appwrite");
        } catch (dbError) {
          console.error("❌ Error creating user document:", dbError);
          // Continue with login even if document creation fails
          // The document might already exist
        }
        
        refetch(); // ✅ Update global state
        setError(null);
        router.replace("/(root)/(tabs)"); // ✅ Redirect to home
      } else {
        console.log("❌ Email is invalid, showing alert");
        Alert.alert(
          "Invalid Email",
          "Please sign in with your NED credentials (e.g., abc@cloud.neduet.edu.pk).",
          [{ text: "OK", onPress: () => GoogleSignin.signOut() }]
        );
      }
    } catch (e) {
      console.log("❌ Error during sign-in:", e.message);
      setError(e.message);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <Image source={images.onboarding} className="w-full h-4/6" resizeMode="contain" />

        <View className="px-10">
          <Text className="text-base text-center uppercase font-rubik text-black-200">
            Welcome To Navigate Solo
          </Text>

          <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2">
            Let's Get You Closer To {"\n"}
            <Text className="text-primary-300">Your Destination</Text>
          </Text>

          {error && <Text className="text-sm text-red-500 text-center mt-2">{error}</Text>}

          {user ? (
            <>
              <Text className="text-lg text-black-300 text-center mt-12">
                Signed in as {user.email}
              </Text>

              <TouchableOpacity
                onPress={async () => {
                  await GoogleSignin.signOut();
                  refetch(); // ✅ Refresh user state
                }}
                className="bg-red-500 rounded-full w-full py-4 mt-5"
              >
                <Text className="text-lg font-rubik-medium text-white text-center">
                  Logout
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text className="text-lg font-rubik text-black-200 text-center mt-8">
                Login to Navigate Solo with Google
              </Text>

              <TouchableOpacity
                onPress={signIn}
                className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-2"
              >
                <View className="flex flex-row items-center justify-center">
                  <Image source={icons.google} className="w-5 h-5" resizeMode="contain" />
                  <Text className="text-lg font-rubik-medium text-black-300 ml-2">
                    Continue with Google
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
