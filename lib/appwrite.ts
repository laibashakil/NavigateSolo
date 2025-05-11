import {
  Client,
  ID,
  Databases,
  Query,
  Avatars,
  Storage,
} from "react-native-appwrite";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export const config = {
  platform: "com.NS.navigatesolo",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  usersCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID,
  bucketId: process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID,
};

// Initialize Appwrite Client
export const client = new Client();
client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!);

// Initialize Appwrite Services
export const avatar = new Avatars(client);
export const databases = new Databases(client);

// Function to save user data to database
export async function saveUserToDatabase() {
  try {
    // Get the current Google Sign-In user
    const googleUser = await GoogleSignin.getCurrentUser();
    if (!googleUser) {
      throw new Error("User not authenticated with Google");
    }

    const userData = {
      name: googleUser.user.name,
      email: googleUser.user.email,
      phoneNumber: "",
      homeLocation: "",
      emergencyContacts: [],
    };

    // Check if user already exists in the database
    const existingUsers = await databases.listDocuments(
      config.databaseId!,
      config.usersCollectionId!,
      [Query.equal("email", userData.email)]
    );

    if (existingUsers.documents.length > 0) {
      console.log("User already exists in the database.");
      return existingUsers.documents[0];
    }

    // Create new user document
    const response = await databases.createDocument(
      config.databaseId!,
      config.usersCollectionId!,
      ID.unique(),
      userData
    );

    console.log("User saved to database successfully:", response);
    return response;
  } catch (error) {
    console.error("Error saving user to database:", error);
    throw error;
  }
}

export async function updateUserData(updatedData: {
  name?: string;
  email?: string;
  bio?: string;
  phoneNumber?: string;
  homeLocation?: string;
  emergencyContacts?: string[];
}) {
  try {
    // Get the current Google Sign-In user
    const googleUser = await GoogleSignin.getCurrentUser();
    if (!googleUser) {
      throw new Error("User not authenticated with Google");
    }

    const userEmail = googleUser.user.email;

    // Get user's existing record from database
    const existingUsers = await databases.listDocuments(
      config.databaseId!,
      config.usersCollectionId!,
      [Query.equal("email", userEmail)]
    );

    if (existingUsers.documents.length === 0) {
      throw new Error("User record not found in database.");
    }

    const userDocId = existingUsers.documents[0].$id;

    // Update the user data
    const response = await databases.updateDocument(
      config.databaseId!,
      config.usersCollectionId!,
      userDocId,
      updatedData
    );

    console.log("User updated successfully:", response);
    return response;
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
}

export async function getUserData() {
  try {
    // Get the current Google Sign-In user
    const googleUser = await GoogleSignin.getCurrentUser();
    if (!googleUser) {
      throw new Error("User not authenticated with Google");
    }

    const userEmail = googleUser.user.email;

    // Get user's record from database
    const existingUsers = await databases.listDocuments(
      config.databaseId!,
      config.usersCollectionId!,
      [Query.equal("email", userEmail)]
    );

    if (existingUsers.documents.length === 0) {
      throw new Error("User record not found in database.");
    }

    return existingUsers.documents[0];
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}
