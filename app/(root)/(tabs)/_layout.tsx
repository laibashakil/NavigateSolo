import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const TabIcon = ({
  focused,
  iconName,
  title,
}: {
  focused: boolean;
  iconName: string; // Use only MaterialIcons for consistency
  title: string;
}) => (
  <View className="flex-1 mt-1 flex flex-col items-center">
    <MaterialIcons
      name={iconName}
      size={27} // Consistent size for all icons
      color={focused ? "#0061FF" : "#666876"}
      style={{ marginBottom: -4}} // Add margin to prevent cutoff
    />
    <Text
      className={`${
        focused
          ? "text-primary-300 font-rubik-medium"
          : "text-black-200 font-rubik"
      } text-xs text-center mt-2`} // Remove w-full to prevent wrapping issues
      numberOfLines={1} // Prevent wrapping for consistency
      style={{ width: 95 }}     >
      {title}
    </Text>
  </View>
);

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopColor: "#0061FF1A",
          borderTopWidth: 1,
          minHeight: 70,
          paddingBottom: 0, // Ensure space above system navigation bar
        },
      }}
    >
      
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon 
              focused={focused} 
              iconName="home-filled"// Use MaterialIcons equivalents
              title="Home" 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="indoor"
        options={{
          title: "Indoor",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon 
              focused={focused} 
              iconName={focused ? "meeting-room" : "door-front"} // Use MaterialIcons equivalents
              title="Indoor" 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="outdoor"
        options={{
          title: "Outdoor",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon 
              focused={focused} 
              iconName="park"
              title="Outdoor" 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="seatDetection"
        options={{
          title: "Seat Detection",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="event-seat" title="Seat Detection" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="person" title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;