//OUTDOOR

import React, { useEffect, useState, useRef } from "react";
import { View, Text, Button, Alert, FlatList, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import * as Speech from 'expo-speech';
import { Picker } from '@react-native-picker/picker';
import haversine from "haversine";
import { Magnetometer } from 'expo-sensors';

const OPENROUTESERVICE_API_KEY = "5b3ce3597851110001cf6248b834120f36cb44e0b8faf95d5ef770ec";

const destinations = [
  { label: "NED University Auditorium, Karachi", coordinates: [67.112123, 24.932170] },
  { label: "CSIT LABS", coordinates: [67.114156, 24.93122] },
  { label: "LIBRARY", coordinates: [67.111012, 24.933095] },
  { label: "EXIT GATE", coordinates: [67.115675, 24.930042] },
  { label: "CSIT CLASSROOMS", coordinates: [67.114358, 24.931009] },
  { label: "STAFF BUILDING", coordinates: [67.113578, 24.931156] },
  { label: "AUDITORIUM", coordinates: [67.112660, 24.931947] },
  { label: "DMS CAFETERIA", coordinates: [67.114286, 24.932456] }
];

export default function NavigationApp() {
  const [heading, setHeading] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [navigationActive, setNavigationActive] = useState(false);
  const locationSubscription = useRef(null);

  // Compass heading logic
  useEffect(() => {
    const subscription = Magnetometer.addListener(data => {
        let angle = Math.atan2(data.y, data.x) * (180 / Math.PI);
        angle = angle - 90; // adjust for correct orientation
        angle = angle < 0 ? angle + 360 : angle; // normalize to 0–360
        
      setHeading(Math.round(angle));
    });
    return () => subscription.remove();
  }, []);

  const getDirection = (angle) => {
    if (angle >= 337.5 || angle < 22.5) return 'North';
    if (angle >= 22.5 && angle < 67.5) return 'North-East';
    if (angle >= 67.5 && angle < 112.5) return 'East';
    if (angle >= 112.5 && angle < 157.5) return 'South-East';
    if (angle >= 157.5 && angle < 202.5) return 'South';
    if (angle >= 202.5 && angle < 247.5) return 'South-West';
    if (angle >= 247.5 && angle < 292.5) return 'West';
    if (angle >= 292.5 && angle < 337.5) return 'North-West';
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Allow location access to use navigation.");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    })();
  }, []);

  const fetchRoute = async () => {
    if (!selectedDestination || !userLocation) {
      Alert.alert("Error", "Select destination and wait for location.");
      return;
    }

    const destCoords = selectedDestination.coordinates;
    const response = await fetch(
      `https://api.openrouteservice.org/v2/directions/foot-walking?api_key=${OPENROUTESERVICE_API_KEY}&start=${userLocation.longitude},${userLocation.latitude}&end=${destCoords[0]},${destCoords[1]}`
    );
    const routeData = await response.json();

    if (!routeData.features || routeData.features.length === 0) {
      Alert.alert("Error", "Route not found.");
      return;
    }

    const segmentSteps = routeData.features[0].properties.segments[0].steps;
    const geometry = routeData.features[0].geometry.coordinates;

    const enrichedSteps = segmentSteps.map((step, index) => {
      const stepCoord = geometry[step.way_points[0]];
      const latLng = { latitude: stepCoord[1], longitude: stepCoord[0] };
      let instruction = step.instruction;
      let stepsCount = Math.round(step.distance / 0.75);

      instruction = instruction.replace(/\b(north|south|east|west)\b/gi, (dir) => {
        switch (dir.toLowerCase()) {
          case "north": return "ahead";
          case "south": return "behind";
          case "east": return "right";
          case "west": return "left";
          default: return dir;
        }
      }).replace("Head", "Move").replace("Continue", "Keep going");

      return {
        instruction: `${index + 1}. ${instruction} for about ${stepsCount} steps.`,
        coords: latLng,
      };
    });

    setSteps(enrichedSteps);
    setCurrentStepIndex(0);
    setNavigationActive(true);
    startNavigation(enrichedSteps);
  };

  const startNavigation = async (stepList) => {
    if (!stepList.length) return;

    Speech.speak(stepList[0].instruction);
    setSteps(stepList);

    locationSubscription.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation, // Use highest accuracy
        distanceInterval: 1, // Update every 1 meter
        timeInterval: 1000, // Update every 1 second
      },
      (location) => {
        setUserLocation(location.coords);
        if (navigationActive) {
          checkNextStep(location.coords, stepList);
        }
      }
    );
  };

  const checkNextStep = (currentCoords, stepList) => {
    if (currentStepIndex >= stepList.length) {
      Speech.speak("You have arrived at your destination.");
      setNavigationActive(false);
      return;
    }
  
    const targetCoords = stepList[currentStepIndex].coords;
    const distance = haversine(currentCoords, targetCoords, { unit: "meter" });
    console.log(`Step ${currentStepIndex + 1}: Distance to target = ${distance.toFixed(2)} meters`);
  
    if (distance <= 15) { // Increased threshold to 15 meters
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
  
      if (nextIndex < stepList.length) {
        Speech.speak(stepList[nextIndex].instruction);
      } else {
        Speech.speak("You have arrived at your destination.");
        setNavigationActive(false);
      }
    }
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

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: "#ffffff" }}>
      <Text className="text-black text-left text-sl" style={{ fontSize: 20 }}>
        You're facing: {heading !== null ? getDirection(heading) : 'Loading...'}
        {/* You're facing: {heading !== null ? `${getDirection(heading)} (${heading}°)` : 'Loading...'} */}
      </Text>

      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Select Destination</Text>
      <View style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 10, backgroundColor: "white" }}>
        <Picker selectedValue={selectedDestination} onValueChange={setSelectedDestination}>
          
          {destinations.map((dest, index) => (
            <Picker.Item key={index} label={dest.label} value={dest} />
          ))}
        </Picker>
        
      </View>

      <TouchableOpacity className="p-4 mt-3 rounded-lg bg-blue-500" onPress={fetchRoute}>
        <Text className="text-white text-center text-lg font-semibold">Get Directions</Text>
      </TouchableOpacity>

      {navigationActive && (
      <TouchableOpacity className="p-4 mt-3 rounded-lg bg-red-500" onPress={stopNavigation}>
        <Text className="text-white text-center text-lg font-semibold">Stop Navigation</Text>
      </TouchableOpacity>
        // <Button title="Stop Navigation" onPress={stopNavigation} color="red" />
      )}

      {steps.length > 0 && (
        <View style={{ marginTop: 20, maxHeight: 250 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Directions:</Text>
          <FlatList
            data={steps}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <Text
                style={{
                  fontSize: 16,
                  marginVertical: 4,
                  color: index === currentStepIndex ? 'blue' : 'black',
                  fontWeight: index === currentStepIndex ? 'bold' : 'normal',
                  backgroundColor: index === currentStepIndex ? '#e0f7ff' : 'transparent',
                  padding: 4,
                  borderRadius: 5
                }}
              >
                {item.instruction}
              </Text>
            )}
          />
        </View>
      )}
    </View>
  );
}