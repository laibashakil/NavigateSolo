import React, { useEffect, useState, useRef } from "react";
import { View, Text, Button, Dimensions, Alert, FlatList, TouchableOpacity } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import * as Speech from 'expo-speech';
import { Picker } from '@react-native-picker/picker';

const OPENROUTESERVICE_API_KEY = "5b3ce3597851110001cf6248b834120f36cb44e0b8faf95d5ef770ec";

const destinations = [
  { label: "NED University Auditorium, Karachi", coordinates: [67.112123, 24.932170] },
  { label: "CSIT LABS", coordinates: [67.114156, 24.93122] },
  { label: "LIBRARY", coordinates: [67.111012, 24.933095] },
  { label: "ENTRY GATE", coordinates: [67.115573, 24.930022] },
  { label: "EXIT GATE", coordinates: [67.115675, 24.930042] },
  { label: "CSIT CLASSROOMS", coordinates: [67.114358, 24.931009] },
  { label: "STAFF BUILDING", coordinates: [67.113578, 24.931156]},
  { label: "DMS CAFETERIA", coordinates: [67.114286, 24.932456] } 
]; 

export default function NavigationApp() {
    const [userLocation, setUserLocation] = useState(null);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [routeCoords, setRouteCoords] = useState([]);
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

    const fetchRoute = async () => {
        if (!selectedDestination) {
            Alert.alert("Error", "Please select a destination.");
            return;
        }

        const destCoords = selectedDestination.coordinates;
        console.log("Routing to:", destCoords);

        if (!userLocation) {
            Alert.alert("Error", "User location is not available yet.");
            return;
        }

        const destLatLng = { latitude: destCoords[1], longitude: destCoords[0] };
        const travelMode = "foot-walking";
        const routeResponse = await fetch(
            `https://api.openrouteservice.org/v2/directions/${travelMode}?api_key=${OPENROUTESERVICE_API_KEY}&start=${userLocation.longitude},${userLocation.latitude}&end=${destLatLng.longitude},${destLatLng.latitude}`
        );

        const routeData = await routeResponse.json();

        if (!routeData.features || routeData.features.length === 0) {
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
        <View className="flex-1 bg-gray-100 p-1">
            <Text className="text-lg font-semibold text-gray-800 mb-2 pt-4">Select Destination</Text>

            <View className="border border-gray-300 rounded-lg bg-white">

            <Picker
                selectedValue={selectedDestination}
                onValueChange={(itemValue) => setSelectedDestination(itemValue)}
                className="p-2"
            >
                {destinations.map((dest, index) => (
                    <Picker.Item key={index} label={dest.label} value={dest} />
                ))}
            </Picker>
            </View>
            <View className="mt-2">
                <Button title="Get Directions" onPress={fetchRoute} />
            </View>
            {navigationActive && (
                <View className="mt-2">
                <Button title="Stop Navigation" onPress={stopNavigation} color="red" />
                </View>
            )
            }

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
