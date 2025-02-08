// import React from 'react';
// import MapView from 'react-native-maps';
// import { StyleSheet, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <MapView style={styles.map} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     width: '100%',
//     height: '100%',
//   },
// });
//5b3ce3597851110001cf6248b834120f36cb44e0b8faf95d5ef770ec

import React, { useEffect, useState, useRef } from "react";
import { View, Text, TextInput, Button, Dimensions, Alert } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import * as Speech from 'expo-speech';

const OPENROUTESERVICE_API_KEY = "5b3ce3597851110001cf6248b834120f36cb44e0b8faf95d5ef770ec"; // Replace with your ORS key

export default function NavigationApp() {
  const [userLocation, setUserLocation] = useState<Location.LocationObjectCoords | null>(null);


  
  const [destination, setDestination] = useState("");
  const [routeCoords, setRouteCoords] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const mapRef = useRef<MapView | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Allow location access to use navigation.");
        return;
      }
  
      let location = await Location.getCurrentPositionAsync({});
      
      // Ensure lat/lon exist before updating state
      if (!location.coords.latitude || !location.coords.longitude) {
        Alert.alert("Error", "Could not get your location.");
        return;
      }
  
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        altitude: location.coords.altitude || 0, 
        accuracy: location.coords.accuracy || 1,
        altitudeAccuracy: location.coords.altitudeAccuracy || 1,
        heading: location.coords.heading || 0,
        speed: location.coords.speed || 0,
      });
    })();
  }, []);
  

  const fetchRoute = async () => {
    if (!destination) {
      Alert.alert("Error", "Please enter a destination.");
      return;
    }
  
    const geoResponse = await fetch(
      `https://api.openrouteservice.org/geocode/search?api_key=${OPENROUTESERVICE_API_KEY}&text=${encodeURIComponent(destination)}`
    );
    const geoData = await geoResponse.json();
  
    if (!geoData.features.length) {
      Alert.alert("Error", "Destination not found.");
      return;
    }
  
    const destCoords = geoData.features[0].geometry.coordinates;
    const destLatLng = { latitude: destCoords[1], longitude: destCoords[0] };
  
    if (!userLocation) {
      Alert.alert("Error", "User location is not available yet.");
      return;
    }
  
    console.log("User Location:", userLocation);
    console.log("Destination Coordinates:", destLatLng);
  
    const travelMode = "foot-walking";
    const routeResponse = await fetch(
      `https://api.openrouteservice.org/v2/directions/${travelMode}?api_key=${OPENROUTESERVICE_API_KEY}&start=${userLocation.longitude},${userLocation.latitude}&end=${destLatLng.longitude},${destLatLng.latitude}`
    );
  
    const routeData = await routeResponse.json();
  
    if (!routeData.features || !routeData.features.length) {
      Alert.alert("Error", "Route not found.");
      return;
    }
  
    const coordinates = routeData.features[0].geometry.coordinates.map((coord) => ({
      latitude: coord[1],
      longitude: coord[0],
    }));
  
    const steps = routeData.features[0].properties.segments[0].steps.map((step, index) => {
      const distance = step.distance.toFixed(0);
      const direction = step.instruction.replace("Head", "Go").replace("Continue", "Keep going");
      return `${index + 1}. ${direction} for ${distance} meters.`;
    });
  
    setRouteCoords(coordinates);
    setInstructions(steps);
  
    if (steps.length > 0) {
      startNavigation(steps);  // 🔥 Start navigation after fetching route
    }
  
    if (mapRef.current) {
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      });
    }
  };
  
  
  let currentStepIndex = 0;

  const startNavigation = async (routeSteps) => {
    if (!routeSteps.length) return;
  
    currentStepIndex = 0;
    Speech.speak(routeSteps[currentStepIndex]); // Speak first step
  
    Location.watchPositionAsync(
      { accuracy: Location.Accuracy.High, distanceInterval: 3 }, // Update every 3 meters
      (location) => {
        console.log("Updated Location:", location.coords);
        const userCoords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        checkNextStep(userCoords, routeSteps);
      }
    );
  };
  
  const checkNextStep = (userCoords, routeSteps) => {
    if (currentStepIndex >= routeSteps.length) {
      Speech.speak("You have arrived at your destination.");
      return;
    }
  
    const nextStep = routeSteps[currentStepIndex];
    const nextStepDistance = parseInt(nextStep.match(/\d+/)[0]);
  
    console.log(`Remaining distance: ${nextStepDistance}m`);
  
    if (nextStepDistance <= 5) {
      currentStepIndex++;
      if (currentStepIndex < routeSteps.length) {
        Speech.speak(routeSteps[currentStepIndex]);
      } else {
        Speech.speak("You have arrived at your destination.");
      }
    }
  };
  
  
  

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="Enter destination"
        value={destination}
        onChangeText={setDestination}
        style={{ borderWidth: 1, margin: 10, padding: 5 }}
      />
      <Button title="Get Directions" onPress={fetchRoute} />

      <MapView
        ref={mapRef}
        style={{ flex: 1, width: Dimensions.get("window").width }}
        initialRegion={{
          latitude: userLocation?.latitude || 37.78825,
          longitude: userLocation?.longitude || -122.4324,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation
      >
        {userLocation && <Marker coordinate={userLocation} title="Your Location" />}
        {routeCoords.length > 0 && (
          <>
            <Polyline coordinates={routeCoords} strokeWidth={4} strokeColor="blue" />
            <Marker coordinate={routeCoords[routeCoords.length - 1]} title="Destination" />
          </>
        )}
      </MapView>

      {instructions.length > 0 && (
        <View style={{ padding: 10, backgroundColor: "white" }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>{instructions[0]}</Text>
        </View>
      )}
    </View>
  );
}






// import React, { useState, useEffect, useRef } from "react";
// import { Text, View, Button, Dimensions, Image } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import * as Location from "expo-location";
// import { SafeAreaView } from "react-native-safe-area-context";

// import Search from "@/components/Search";
// import icons from "@/constants/icons";
// import { useGlobalContext } from "@/lib/global-provider";

// export default function App() {
//   const [errorMsg, setErrorMsg] = useState<string | null>(null);
//   const [userLocation, setUserLocation] = useState<Location.LocationObjectCoords | null>(null);
//   const mapRef = useRef<MapView | null>(null);

//   const { user } = useGlobalContext();

//   const getUserLocation = async () => {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== "granted") {
//       setErrorMsg("Permission to access location was denied");
//       return;
//     }

//     let location = await Location.getCurrentPositionAsync({
//       accuracy: Location.Accuracy.High,
//     });

//     setUserLocation(location.coords);

//     if (mapRef.current && location.coords) {
//       mapRef.current.animateToRegion({
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,
//       });
//     }
//   };

//   useEffect(() => {
//     getUserLocation(); // Get location once on mount
//   }, []);

//   return (
//     <SafeAreaView className="h-full bg-white">
//       {/* Header Section */}
//       <View className="px-5">
//         <View className="flex flex-row items-center justify-between mt-5">
//           <View className="flex flex-row">
//             <Image
//               source={{ uri: user?.avatar }}
//               className="size-12 rounded-full"
//             />
//             <View className="flex flex-col items-start ml-2 justify-center">
//               <Text className="text-xs font-rubik text-black-100">
//                 Good Morning
//               </Text>
//               <Text className="text-base font-rubik-medium text-black-300">
//                 {user?.name}
//               </Text>
//             </View>
//           </View>
//           <Image source={icons.bell} className="size-6" />
//         </View>

//         {/* Search Bar */}
//         <Search />
//       </View>

//       {/* Map Section */}
//       <View style={{ flex: 1 }}>
//         <MapView
//           ref={mapRef}
//           style={{
//             width: Dimensions.get("window").width,
//             height: Dimensions.get("window").height ,
//           }}
//           initialRegion={{
//             latitude: 37.78825,
//             longitude: -122.4324,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//           showsUserLocation={true}
//           followsUserLocation={true}
//         >
//           {userLocation && (
//             <Marker coordinate={userLocation} title="Your Location" />
//           )}
//         </MapView>

//         <View
//           style={{
//             position: "absolute",
//             bottom: 70,
//             left: 0,
//             right: 0,
//             padding: 5,
//           }}
//         >
//           {/* <Button title="Go To Current Location" onPress={getUserLocation} />
//           {errorMsg && (
//             <Text style={{ textAlign: "center", color: "red" }}>{errorMsg}</Text>
//           )} */}
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }



