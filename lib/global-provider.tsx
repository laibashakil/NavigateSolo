import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router"; // ✅ Import router for navigation

interface GlobalContextType {
  isLogged: boolean;
  user: User | null;
  loading: boolean;
  refetch: () => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // ✅ Get router instance

  // Function to fetch current user from Google Sign-In
  const fetchCurrentUser = async () => {
    try {
      const googleUser = await GoogleSignin.getCurrentUser();
      if (googleUser) {
        const email = googleUser.user.email.trim().toLowerCase();
        
        if (email.endsWith("@cloud.neduet.edu.pk")) {
          setUser({
            id: googleUser.user.id,
            name: googleUser.user.name || "No Name",
            email: googleUser.user.email,
            avatar: googleUser.user.photo || "",
          });

          console.log("✅ User is logged in, redirecting to home...");
          
          // ✅ Redirect to index page (default home)
          setTimeout(() => {
            router.replace("/(root)/(tabs)");
          }, 700);
        } else {
          console.log("❌ Invalid email, logging out...");
          await GoogleSignin.signOut();
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("❌ Error fetching Google user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const isLogged = !!user;

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        user,
        loading,
        refetch: fetchCurrentUser,
      }}
    >
      {!loading && children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error("useGlobalContext must be used within a GlobalProvider");

  return context;
};

export default GlobalProvider;
