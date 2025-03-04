import React, { useEffect, useState, useRef } from "react";
import { View, Text, TextInput, Button, Dimensions, Alert, FlatList, TouchableOpacity } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import * as Speech from 'expo-speech';

const OPENROUTESERVICE_API_KEY = "5b3ce3597851110001cf6248b834120f36cb44e0b8faf95d5ef770ec"; 

export default function NavigationApp() {
  const [userLocation, setUserLocation] = useState(null);  
  const [destination, setDestination] = useState("");
  const [routeCoords, setRouteCoords] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [navigationActive, setNavigationActive] = useState(false);
  const mapRef = useRef(null);
  const locationSubscription = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Allow location access to use navigation.");
        return;
      }
  
      let location = await Location.getCurrentPositionAsync({});
      if (!location.coords) {
        Alert.alert("Error", "Could not get your location.");
        return;
      }
  
      setUserLocation(location.coords);
    })();
  }, []);
  
  const fetchSuggestions = async (query) => {
    if (!query || !userLocation) return;
  
    const BOUNDING_BOX = "67.1105,24.9216,67.1270,24.9350"; // Approx. bounds for NED University, Karachi
  
    try {
      const response = await fetch(
        // `https://api.openrouteservice.org/geocode/autocomplete?api_key=${OPENROUTESERVICE_API_KEY}&text=${encodeURIComponent(query)}`

        `https://api.openrouteservice.org/geocode/autocomplete?api_key=${OPENROUTESERVICE_API_KEY}&text=${encodeURIComponent(query)}&boundary.rect.min_lon=${BOUNDING_BOX.split(",")[0]}&boundary.rect.min_lat=${BOUNDING_BOX.split(",")[1]}&boundary.rect.max_lon=${BOUNDING_BOX.split(",")[2]}&boundary.rect.max_lat=${BOUNDING_BOX.split(",")[3]}`
      );
  
      const data = await response.json();
      let results = data.features || [];
  
      // Hardcoded location for NED Auditorium
      const hardcodedLocation = {
        type: "Feature",
        properties: {
          id: "custom-ned-auditorium",
          label: "NED University Auditorium, Karachi",
        },
        geometry: {
          type: "Point",
          coordinates: [67.112136, 24.932571], // Replace with actual coordinates
        },
      };
  
      // If query contains "Auditorium", add the hardcoded location
      // if (query.toLowerCase().includes("auditorium")) {
      //   console.log("API Response:", data);

      //   results = [hardcodedLocation, ...results];
      // }
      if (query.toLowerCase().includes("ned university auditorium")) {
        results = [{
          type: "Feature",
          properties: { id: "custom-ned-auditorium", label: "NED University Auditorium, Karachi" },
          geometry: { type: "Point", coordinates: [67.111111, 24.932571] }
        }];
      }
      
      
  
      setSuggestions(results);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };
  







  const handleSelectDestination = (place) => {
    setDestination(place.properties.label);
    setSuggestions([]); 
  };







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
    setCurrentStepIndex(0);
    setNavigationActive(true);
  
    if (steps.length > 0) {
      startNavigation(steps);  
    }
  
    if (mapRef.current) {
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      });
    }
  };



  const startNavigation = async (routeSteps) => {
    if (!routeSteps.length) return;
    Speech.speak(routeSteps[0]);

    locationSubscription.current = await Location.watchPositionAsync(
      { accuracy: Location.Accuracy.High, distanceInterval: 3 },
      (location) => {
        if (navigationActive) {
          checkNextStep(location.coords, routeSteps);
        }
      }
    );
  };



  const stopNavigation = () => {
    Speech.stop();
    if (locationSubscription.current) {
      locationSubscription.current.remove();
      locationSubscription.current = null;
    }
    setNavigationActive(false);
    Alert.alert("Navigation Stopped", "You have stopped navigation.");
  };
  


  const checkNextStep = (userCoords, routeSteps) => { 
    if (currentStepIndex >= routeSteps.length) {
      Speech.speak("You have arrived at your destination.");
      setNavigationActive(false);
      return;
    }

    const nextStep = routeSteps[currentStepIndex];
    const match = nextStep.match(/\d+/);
    const nextStepDistance = match ? parseInt(match[0]) : 0;

    if (nextStepDistance <= 5) {
      const newIndex = currentStepIndex + 1;
      setCurrentStepIndex(newIndex);

      if (newIndex < routeSteps.length) {
        Speech.speak(routeSteps[newIndex]);
      } else {
        Speech.speak("You have arrived at your destination.");
        setNavigationActive(false);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="Enter Destination"
        value={destination}
        onChangeText={(text) => {
          setDestination(text);
          fetchSuggestions(text);
        }}
        style={{ margin: 10, padding: 10, borderWidth: 1, borderRadius: 5 }}
      />

      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.properties.id}
          style={{ backgroundColor: "white", maxHeight: 200, marginHorizontal: 10 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelectDestination(item)}
              style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" }}
            >
              <Text>{item.properties.label}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <Button title="Get Directions" onPress={fetchRoute} />
      {navigationActive && <Button title="Stop Navigation" onPress={stopNavigation} color="red" />}

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
        {routeCoords.length > 0 && <Polyline coordinates={routeCoords} strokeWidth={3} strokeColor="blue" />}
      </MapView>
    </View>
  );
}


