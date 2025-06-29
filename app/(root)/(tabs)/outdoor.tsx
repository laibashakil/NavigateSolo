//OUTDOORrrr
import React, { useEffect, useState, useRef } from "react";
import { View, Text, Button, Alert, FlatList, TouchableOpacity, Modal } from "react-native";
import * as Location from "expo-location";
import * as Speech from 'expo-speech';
import { Picker } from '@react-native-picker/picker';
import haversine from "haversine";
import { Magnetometer } from 'expo-sensors';
import { useFocusEffect } from '@react-navigation/native';

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
  const [currentInstruction, setCurrentInstruction] = useState("");
  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());
  const [lastLocation, setLastLocation] = useState(null);
  const autoUpdateInterval = useRef(null);
  const [showDestinationModal, setShowDestinationModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     return () => {
  //       if (navigationActive) {
  //         console.log("Stopping navigation due to tab change.");
  //         stopNavigation();
  //       }
  //     };
  //   }, [navigationActive])
  // );

  // Add automatic route update every 10 seconds
  useEffect(() => {
    if (navigationActive) {
      autoUpdateInterval.current = setInterval(() => {
        console.log("Auto-updating route...");
        forceUpdateNavigation();
      }, 30000); // 10 seconds
    } else {
      if (autoUpdateInterval.current) {
        clearInterval(autoUpdateInterval.current);
        autoUpdateInterval.current = null;
      }
    }

    return () => {
      if (autoUpdateInterval.current) {
        clearInterval(autoUpdateInterval.current);
        autoUpdateInterval.current = null;
      }
    };
  }, [navigationActive]);
  
  // useFocusEffect(
  //   React.useCallback(() => {
  //     return () => {
  //       if (navigationActive) {
  //         console.log("Stopping navigation due to tab change.");
  //         stopNavigation();
  //       }
  //     };
  //   }, [navigationActive])
  // );

  // Compass heading logic
  useEffect(() => {
    const subscription = Magnetometer.addListener(data => {
      let angle = Math.atan2(data.y, data.x) * (180 / Math.PI);
      angle = angle - 90;
      angle = angle < 0 ? angle + 360 : angle;
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

  const getDirectionAngle = (direction) => {
    switch(direction.toLowerCase()) {
      case 'north': return 0;
      case 'north-east': return 45;
      case 'east': return 90;
      case 'south-east': return 135;
      case 'south': return 180;
      case 'south-west': return 225;
      case 'west': return 270;
      case 'north-west': return 315;
      default: return 0;
    }
  };

  const helpAlignDirection = () => {
    if (!currentInstruction || heading === null) {
      Alert.alert("Error", "No current instruction or heading available");
      return;
    }

    // Extract direction from current instruction, including compound directions
    const directionMatch = currentInstruction.match(/(north|south|east|west|north-east|south-east|north-west|south-west)/i);
    if (!directionMatch) {
      Alert.alert("Error", "No direction found in current instruction");
      return;
    }

    // Get the exact direction from the instruction
    const targetDirection = directionMatch[0].toLowerCase();
    const currentDirection = getDirection(heading).toLowerCase();
    
    console.log("Instruction direction:", targetDirection);
    console.log("Current direction:", currentDirection);
    
    // Get angles for both directions
    const targetAngle = getDirectionAngle(targetDirection);
    const currentAngle = heading;
    
    console.log("Target angle:", targetAngle);
    console.log("Current angle:", currentAngle);
    
    // Calculate the shortest turn angle
    let angleDiff = targetAngle - currentAngle;
    
    // Normalize the angle difference to be between -180 and 180 degrees
    if (angleDiff > 180) {
      angleDiff -= 360;
    } else if (angleDiff < -180) {
      angleDiff += 360;
    }

    // Determine turn direction and speak instruction
    const turnDirection = angleDiff > 0 ? "right" : "left";
    const turnAmount = Math.abs(Math.round(angleDiff));
    
    const message = `Turn ${turnDirection} ${turnAmount} degrees to face ${targetDirection}, then ${currentInstruction}`;
    console.log(`Current: ${currentDirection} (${currentAngle}°), Target: ${targetDirection} (${targetAngle}°), Turn: ${turnDirection} ${turnAmount}°`);
    Speech.speak(message);
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
            // Check remaining steps and announce proximity
        const remainingSteps = stepList.length - currentStepIndex;
        if (remainingSteps <= 10) {
          Speech.speak("You have reached your destination");
          endNavigation();
        } else if (remainingSteps <= 15) {
          Speech.speak(`You are very close to ${selectedDestination.label}`);
        }
  };

  const startNavigation = async (stepList) => {
    if (!stepList.length) return;

    setCurrentInstruction(stepList[0].instruction.replace(/^\d+\.\s*/, ''));
    Speech.speak(stepList[0].instruction.replace(/^\d+\.\s*/, ''));
    setSteps(stepList);

    locationSubscription.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        distanceInterval: 1,
        timeInterval: 1000,
      },
      (location) => {
        const userCoords = location.coords;
        setUserLocation(userCoords);
        setLastLocation(userCoords);
        setLastUpdateTime(Date.now());

        // Calculate distance to destination using haversine formula
        if (selectedDestination && navigationActive) {
          const distanceToDestination = haversine(
            { latitude: userCoords.latitude, longitude: userCoords.longitude },
            { latitude: selectedDestination.coordinates[1], longitude: selectedDestination.coordinates[0] },
            { unit: 'meter' }
          );

          console.log("Distance to destination:", distanceToDestination, "meters");

          if (distanceToDestination <= 70) {
            console.log("Reached destination!");
            Speech.speak("You have reached your destination");
            // stopNavigation();
            // Speech.stop();
            // if (locationSubscription.current) {
            //   locationSubscription.current.remove();
            //   locationSubscription.current = null;
            // }
            // setNavigationActive(false);
            // setSteps([]);
            // Alert.alert("Navigation Stopped", "You have stopped navigation.");
              setTimeout(() => {
    // Stop location updates
            if (locationSubscription.current) {
              locationSubscription.current.remove();
              locationSubscription.current = null;
            }

            // Stop navigation state
            setNavigationActive(false);
            setSteps([]);

            // Show alert
            Alert.alert("Navigation Stopped", "You have reached your destination.");
          }, 10000); 
          } else if (distanceToDestination <= 75) {
            console.log("Very close to destination!");
            Speech.speak(`You are very close to ${selectedDestination.label}`);
          }
        }
      }
    );
  };

  const forceUpdateNavigation = () => {
    // Stop current navigation components
    Speech.stop();
    if (locationSubscription.current) {
      locationSubscription.current.remove();
      locationSubscription.current = null;
    }
    
    // Immediately fetch new route
    fetchRoute();
    
  };

  const stopNavigation = () => {
    Speech.stop();
    if (locationSubscription.current) {
      locationSubscription.current.remove();
      locationSubscription.current = null;
    }
    setNavigationActive(false);
    setSteps([]);
    Alert.alert("Navigation Stopped", "You have stopped navigation.");
  };

    const endNavigation = () => {
    Speech.stop();
    if (locationSubscription.current) {
      locationSubscription.current.remove();
      locationSubscription.current = null;
    }
    setNavigationActive(false);
    setSteps([]);
    Alert.alert("Navigation Stopped", "You have reached your destination.");
  };

return (
  <View style={{ flex: 1, padding: 10, backgroundColor: "#ffffff" }}>
    <Text className="text-black text-left text-sl" style={{ fontSize: 20 }}>
      You're facing: {heading !== null ? getDirection(heading) : 'Loading...'}
    </Text>

    {/* <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Select Destination</Text>
    <View style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 10, backgroundColor: "white" }}>
      <Picker selectedValue={selectedDestination} onValueChange={setSelectedDestination}>
        <Picker.Item label="-- Select a destination --" value={null} enabled={false} />
        {destinations.map((dest, index) => (
          <Picker.Item key={index} label={dest.label} value={dest} />
        ))}
      </Picker>
    </View> */}

        {/* Destination Selection */}
    <View className="bg-gray-50 rounded-lg p-3 mb-3">
      <View className="flex-row justify-between items-center">
        <Text className="text-base">Destination</Text>
        <TouchableOpacity 
          onPress={() => setShowDestinationModal(true)}
          className="bg-blue-500 px-3 py-1 rounded"
        >
          <Text className="text-white">Select</Text>
        </TouchableOpacity>
      </View>
      <Text className="text-lg mt-1">
        {selectedDestination ? selectedDestination.label : "No destination selected"}
      </Text>
    </View>

    <TouchableOpacity
      className={`p-4 mt-3 rounded-lg ${selectedDestination ? (navigationActive ? 'bg-red-500' : 'bg-blue-500') : 'bg-gray-400'}`}
      onPress={() => {
        if (!selectedDestination) return;
        if (navigationActive) {
          stopNavigation();
        } else {
          fetchRoute();
        }
      }}
      disabled={!selectedDestination}
    >
      <Text className="text-white text-center text-lg font-semibold">
        {navigationActive ? 'Stop Navigation' : selectedDestination ? 'Get Directions' : 'Select a Destination First'}
      </Text>
    </TouchableOpacity>

    {navigationActive && (
      <>
        <TouchableOpacity className="p-4 mt-3 rounded-lg bg-green-500" onPress={forceUpdateNavigation}>
          <Text className="text-white text-center text-lg font-semibold">Update Route</Text>
        </TouchableOpacity>

        <TouchableOpacity className="p-4 mt-3 rounded-lg bg-purple-500" onPress={helpAlignDirection}>
          <Text className="text-white text-center text-lg font-semibold">Help Align Direction</Text>
        </TouchableOpacity>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Current Instruction:</Text>
          <View style={{
            backgroundColor: '#e0f7ff',
            padding: 15,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#b3e0ff'
          }}>
            <Text style={{ fontSize: 16, color: '#0066cc' }}>
              {currentInstruction}
            </Text>
          </View>

          <View style={{ marginTop: 15 }}>
            <View>
              {lastLocation && (
                <Text style={{ fontSize: 12, color: '#999' }}>
                  Lat: {lastLocation.latitude.toFixed(6)}, Lon: {lastLocation.longitude.toFixed(6)}
                </Text>
              )}
            </View>

            <View style={{ marginTop: 15 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Upcoming Instructions:</Text>
              <FlatList
                data={steps.slice(currentStepIndex + 1)}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={{
                    backgroundColor: '#f0f0f0',
                    padding: 10,
                    marginVertical: 5,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: '#ddd'
                  }}>
                    <Text style={{ fontSize: 14, color: '#333' }}>
                      {item.instruction}
                    </Text>
                  </View>
                )}
                style={{ maxHeight: 200 }}
              />
            </View>
          </View>
        </View>
      </>
    )}


{/* Destination Selection Modal */}
    <Modal
      animationType="slide"
      transparent={true}
      visible={showDestinationModal}
      onRequestClose={() => setShowDestinationModal(false)}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white rounded-lg p-4 w-11/12 max-w-md">
          <Text className="text-xl font-bold mb-3">Select Destination</Text>
          
          <View className="bg-gray-50 rounded border border-gray-200 mb-3">
            <Picker
              selectedValue={selectedDestination}
              onValueChange={(itemValue) => setSelectedDestination(itemValue)}
            >
              <Picker.Item label="Choose your destination" value={null} />
              {destinations.map((dest, index) => (
                <Picker.Item key={index} label={dest.label} value={dest} />
              ))}
            </Picker>
          </View>
          
          <View className="flex-row justify-between">
            <TouchableOpacity 
              className="bg-gray-300 px-6 py-2 rounded-lg w-5/12"
              onPress={() => setShowDestinationModal(false)}
            >
              <Text className="text-center">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="bg-blue-500 px-6 py-2 rounded-lg w-5/12"
              onPress={() => {
                if (selectedDestination) {
                  setShowDestinationModal(false);
                }
              }}
            >
              <Text className="text-white text-center">Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>



  </View>
);
}