import {
  Client,
  Account,
  ID,
  Databases,
  OAuthProvider,
  Query,
  Avatars,  // Keep this for generating initials avatar
  Storage,
} from "react-native-appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";

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
export const avatar = new Avatars(client);  // Used for generating initials avatar
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Debugging: Check if databaseId is properly set
console.log("Database ID:", config.databaseId);

export async function login() {
  try {
    const redirectUri = Linking.createURL("/");

    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );
    if (!response) throw new Error("Create OAuth2 token failed");

    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    );
    if (browserResult.type !== "success")
      throw new Error("Create OAuth2 token failed");

    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();
    if (!secret || !userId) throw new Error("Create OAuth2 token failed");

    const session = await account.createSession(userId, secret);
    if (!session) throw new Error("Failed to create session");

    // Store user in DB immediately after login
    await saveUserToDatabase();

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function logout() {
  try {
    const result = await account.deleteSession("current");
    return result;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    const result = await account.get();
    if (result.$id) {
      console.log("Authenticated User:", result); // Debugging

      // Generate temporary initials avatar for UI display
      const userAvatar = avatar.getInitials(result.name).toString();

      return {
        id: result.$id,
        name: result.name,
        email: result.email,
        avatar: userAvatar, // Only for UI (not stored in DB)
      };
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Function to save only name and email to the database
export async function saveUserToDatabase() {
  try {
    // Ensure the user is authenticated
    const currentUser = await account.get();
    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    console.log("Authenticated user:", currentUser); // Debugging

    const userData = {
      name: currentUser.name,
      email: currentUser.email,
    };

    // Check if user already exists in the database
    const existingUsers = await databases.listDocuments(
      config.databaseId!,
      config.usersCollectionId!,
      [Query.equal("email", userData.email)]
    );

    if (existingUsers.documents.length > 0) {
      console.log("User already exists in the database.");
      return;
    }

    // Create new user document with only name and email
    await databases.createDocument(
      config.databaseId!,
      config.usersCollectionId!,
      ID.unique(),
      userData
    );

    console.log("User saved to database successfully.");
  } catch (error) {
    console.error("Error saving user to database:", error);
  }
}
export async function updateUserData(updatedData: { name?: string; email?: string; bio?: string; phone?: string }) {
  try {
    // Ensure user is authenticated
    const currentUser = await account.get();
    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    // Get user's existing record from database
    const existingUsers = await databases.listDocuments(
      config.databaseId!,
      config.usersCollectionId!,
      [Query.equal("email", [currentUser.email])] // Fix syntax issue
    );

    if (existingUsers.documents.length === 0) {
      throw new Error("User record not found in database.");
    }

    const userDocId = existingUsers.documents[0].$id; // Get user's document ID

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
    return null;
  }
}
