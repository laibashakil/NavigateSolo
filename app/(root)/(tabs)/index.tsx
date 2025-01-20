import React, { useState, useEffect, useRef } from "react";
import { Text, View, Button, Dimensions, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";

import Search from "@/components/Search";
import icons from "@/constants/icons";
import { useGlobalContext } from "@/lib/global-provider";

export default function App() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<Location.LocationObjectCoords | null>(null);
  const mapRef = useRef<MapView | null>(null);

  const { user } = useGlobalContext();

  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    setUserLocation(location.coords);

    if (mapRef.current && location.coords) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  useEffect(() => {
    getUserLocation(); // Get location once on mount
  }, []);

  return (
    <SafeAreaView className="h-full bg-white">
      {/* Header Section */}
      <View className="px-5">
        <View className="flex flex-row items-center justify-between mt-5">
          <View className="flex flex-row">
            <Image
              source={{ uri: user?.avatar }}
              className="size-12 rounded-full"
            />
            <View className="flex flex-col items-start ml-2 justify-center">
              <Text className="text-xs font-rubik text-black-100">
                Good Morning
              </Text>
              <Text className="text-base font-rubik-medium text-black-300">
                {user?.name}
              </Text>
            </View>
          </View>
          <Image source={icons.bell} className="size-6" />
        </View>

        {/* Search Bar */}
        <Search />
      </View>

      {/* Map Section */}
      <View style={{ flex: 1 }}>
        <MapView
          ref={mapRef}
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height ,
          }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          followsUserLocation={true}
        >
          {userLocation && (
            <Marker coordinate={userLocation} title="Your Location" />
          )}
        </MapView>

        <View
          style={{
            position: "absolute",
            bottom: 70,
            left: 0,
            right: 0,
            padding: 5,
          }}
        >
          {/* <Button title="Go To Current Location" onPress={getUserLocation} />
          {errorMsg && (
            <Text style={{ textAlign: "center", color: "red" }}>{errorMsg}</Text>
          )} */}
        </View>
      </View>
    </SafeAreaView>
  );
}
