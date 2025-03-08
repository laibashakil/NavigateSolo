// google sign in only no figma 
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const [error, setError] = useState();
  const [userInfo, setUserInfo] = useState();

  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      ExpoClientId:
        "46058743249-0ktas23ef71609utpb8s34154toafocs.apps.googleusercontent.com",
      iosClientId:
         "46058743249-qh06cp7e1oeiidvca0qcdp6dac45anbo.apps.googleusercontent.com",
      // androidClientId:
      //   "46058743249-57bmh8hm0phulo1jsndedd197sn3nen7.apps.googleusercontent.com",
      
    });
  };

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const signIn = async () => {
    console.log("Pressed sign in");

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      // Debug: Print user info for troubleshooting
      console.log("User Info:", JSON.stringify(userInfo));

      const email = userInfo?.data?.user?.email?.trim().toLowerCase(); // Access nested email

      // Debug: Print the email being checked
      console.log("Email being checked:", email);

      // Check if the email ends with '@cloud.neduet.edu.pk'
      if (email && email.endsWith("@cloud.neduet.edu.pk")) {
        console.log("Email is valid, proceeding with login");
        setUserInfo(userInfo);
        setError(null);
      } else {
        console.log("Email is invalid, showing alert");
        Alert.alert(
          "Invalid Email",
          "Please sign in with your NED credentials (e.g., abc@cloud.neduet.edu.pk).",
          [{ text: "OK", onPress: () => GoogleSignin.signOut() }]
        );
      }
    } catch (e) {
      console.log("Error during sign-in:", e.message); // Debug error
      setError(e.message);
    }
  };

  const logout = () => {
    setUserInfo(null);
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
  };

  return (
    <View style={styles.container}>
      {error && <Text>{error}</Text>}
      <Text>NavigateSolo</Text>
      {userInfo && <Text>Email: {userInfo.data.user.email}</Text>}
      {userInfo ? (
        <Button title="Logout" onPress={logout} />
      ) : (
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
