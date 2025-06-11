import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView, Modal, Vibration, Alert, ToastAndroid, Platform, SafeAreaView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { scanWiFi } from "@/utils/scanWiFi";
import { applyKalmanFilter } from "@/utils/kalmanFilter";
import { findBestLocation } from "@/utils/locationFinder";
import { useRouter, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { findShortestPath, pathToDirections } from "@/constants/roomConnections";

interface WifiNetwork {
  ssid: string;
  mac: string;
  signalStrength: string;
}

const SCAN_COOLDOWN = 30; // 30 seconds cooldown between scans
const AUTO_NAVIGATION_INTERVAL = 20000; // 20 seconds between navigation instructions (increased from 10)
const ARRIVAL_CHECK_INTERVAL = 15000; // Check for arrival every 15 seconds

const IndoorScreen = () => {
  const router = useRouter();
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [destinationLocation, setDestinationLocation] = useState<string>("");
  const [availableLocations, setAvailableLocations] = useState<string[]>([]);
  const [lastScanTime, setLastScanTime] = useState<string>("Never");
  const [scanStatus, setScanStatus] = useState<"idle" | "scanning" | "processing" | "cooldown">("idle");
  const [networkCount, setNetworkCount] = useState<number>(0);
  const [cooldownTimer, setCooldownTimer] = useState<number>(0);
  const [navigationActive, setNavigationActive] = useState(false);
  const [navigationSteps, setNavigationSteps] = useState<string[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showDestinationModal, setShowDestinationModal] = useState(false);
  const [showCurrentLocationModal, setShowCurrentLocationModal] = useState(false);
  const [estimatedArrivalTime, setEstimatedArrivalTime] = useState<string | null>(null);
  const [hasArrived, setHasArrived] = useState(false);

  // Load available locations from storage
  useEffect(() => {
    const loadLocations = async () => {
      try {
        // Always use hardcoded locations instead of loading from AsyncStorage
        const hardcodedLocations = [
          "CSIT Room 1",
          "CSIT Room 2",
          "CSIT Room 3",
          "CSIT Room 4",
          "CSIT Room 5",
          "CSIT Room 6",
          "CSIT Room 7",
          "CSIT Room 8",
          "CSIT Lab 2",
          "CSIT Lab 3",
          "CSIT Lab 4",
          "CSIT Lab 5",
          "CSIT Project Lab",
          "CSIT Entrance",
          "CSIT Exit",
          "CSIT Lab Exit",
          "CSIT Lab Entrance"
        ];
        setAvailableLocations(hardcodedLocations);
        console.log("Using hardcoded locations:", hardcodedLocations);
      } catch (error) {
        console.error("Failed to load locations:", error);
        const hardcodedLocations = [
          "CSIT Room 1",
          "CSIT Room 2",
          "CSIT Room 3",
          "CSIT Room 4",
          "CSIT Room 5",
          "CSIT Room 6",
          "CSIT Room 7",
          "CSIT Room 8",
          "CSIT Lab 2",
          "CSIT Lab 3",
          "CSIT Lab 4",
          "CSIT Lab 5",
          "CSIT Project Lab",
          "CSIT Entrance",
          "CSIT Exit",
          "CSIT Lab Exit",
          "CSIT Lab Entrance"
        ];
        setAvailableLocations(hardcodedLocations);
      }
    };

    loadLocations();
  }, []);

  // Remove playNavigationSound function and replace with simple visual feedback
  const showNavigationFeedback = (isArrival = false, instructionText?: string) => {
    try {
      // Show toast notification for feedback
      if (Platform.OS === 'android') {
        ToastAndroid.show(
          isArrival 
            ? 'Arrived at destination!' 
            : instructionText || 'Navigation instruction',
          ToastAndroid.LONG
        );
      }
      
      // Just vibrate for feedback
      Vibration.vibrate(isArrival ? 500 : 200);
    } catch (error: any) {
      console.warn("Navigation feedback not available:", error);
      // Show error toast
      if (Platform.OS === 'android') {
        ToastAndroid.show(
          'Navigation feedback failed: ' + (error.message || 'Unknown error'),
          ToastAndroid.LONG
        );
      }
      // Fallback to basic vibration
      Vibration.vibrate(isArrival ? 500 : 200);
    }
  };

  // Play an announcement with visual and haptic feedback when arriving at destination
  const announceArrival = () => {
    // Visual feedback
    Alert.alert(
      "Destination Reached!",
      `You have arrived at ${destinationLocation}`,
      [{ text: "OK", onPress: () => setNavigationActive(false) }]
    );
    
    // Just vibrate for feedback
    Vibration.vibrate(500);
    
    // Update state
    setHasArrived(true);
    setNavigationActive(false);
  };

  // Function to find the path between two locations using our new module
  const findPath = (start: string, end: string): string[] => {
    if (start === end) {
      setHasArrived(true);
      return ["You are already at your destination"];
    }

    // Get the shortest path between locations using the new module
    const shortestPath = findShortestPath(start, end);
    
    // If no path is found, return an error message
    if (shortestPath.length === 0) {
      return ["No known route to destination. Please try another route."];
    }
    
    // Convert the path to human-readable directions
    const directions = pathToDirections(shortestPath);
    
    // Split each direction into individual steps if it contains numbered steps
    const splitDirections = directions.flatMap(direction => {
      // Check if the direction contains numbered steps
      if (direction.match(/^\d+\./)) {
        // Split by newlines and filter out empty lines
        return direction.split('\n').filter(step => step.trim());
      }
      return [direction];
    });
    
    // Calculate estimated arrival time (for display purposes)
    if (splitDirections.length > 0) {
      let etaMinutes = Math.ceil(splitDirections.length * 15 / 60); // Rough estimate
      setEstimatedArrivalTime(`${etaMinutes} minute${etaMinutes > 1 ? 's' : ''}`);
    }
    
    return splitDirections;
  };

  // Handle cooldown timer
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    
    if (scanStatus === "cooldown" && cooldownTimer > 0) {
      timer = setInterval(() => {
        setCooldownTimer(prev => {
          if (prev <= 1) {
            setScanStatus("idle");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [scanStatus, cooldownTimer]);

  // Auto-navigation guidance with user waiting time
  useEffect(() => {
    if (navigationActive && navigationSteps.length > 0 && currentStepIndex < navigationSteps.length) {
      // Initial instruction when starting navigation
      const currentInstruction = navigationSteps[currentStepIndex];
      showNavigationFeedback(false, currentInstruction);
    }
  }, [navigationActive, navigationSteps, currentStepIndex]);

  // Update navigation when location changes
  useEffect(() => {
    if (navigationActive && currentLocation && destinationLocation && currentLocation !== destinationLocation) {
      // When location changes, update the path
      const newPath = findPath(currentLocation, destinationLocation);
      setNavigationSteps(newPath);
      setCurrentStepIndex(0);
      
      // Show the first instruction of the new path immediately
      if (newPath.length > 0) {
        showNavigationFeedback(false, newPath[0]);
      }
    }
  }, [navigationActive, currentLocation, destinationLocation]);

  // Check for arrival at destination
  useEffect(() => {
    let arrivalCheckTimer: NodeJS.Timeout | undefined;
    
    if (navigationActive && currentLocation && destinationLocation) {
      arrivalCheckTimer = setInterval(() => {
        // Check if we've arrived at the destination
        if (currentLocation === destinationLocation && !hasArrived) {
          announceArrival();
        }
      }, ARRIVAL_CHECK_INTERVAL);
    }
    
    return () => {
      if (arrivalCheckTimer) clearInterval(arrivalCheckTimer);
    };
  }, [navigationActive, currentLocation, destinationLocation, hasArrived]);

  // Auto-scan periodically when navigation is active
  useEffect(() => {
    let autoScanTimer: NodeJS.Timeout | undefined;
    
    if (navigationActive && scanStatus === "idle") {
      // Trigger immediate scan when navigation starts
      scanWiFiAndUpdate();
      
      autoScanTimer = setInterval(() => {
        scanWiFiAndUpdate();
      }, SCAN_COOLDOWN * 1000); // Convert to milliseconds
    }
    
    return () => {
      if (autoScanTimer) clearInterval(autoScanTimer);
    };
  }, [navigationActive, scanStatus]);

  const scanWiFiAndUpdate = async () => {
    try {
      setScanStatus("scanning");
      console.log("\n🔄 Starting new WiFi scan...");
      console.log(`⏰ Time: ${new Date().toLocaleTimeString()}`);
      
      const liveData: WifiNetwork[] = await scanWiFi();
      setNetworkCount(liveData.length);
      console.log(`📡 Found ${liveData.length} WiFi networks`);

      if (liveData.length > 0) {
        setScanStatus("processing");
        const filteredData = applyKalmanFilter(liveData);
        const detectedLocation = findBestLocation(filteredData);
        
        // Check if we've arrived at destination
        if (navigationActive && detectedLocation === destinationLocation && !hasArrived) {
          announceArrival();
        }
        // If location changed during navigation, update route
        else if (navigationActive && currentLocation !== detectedLocation && destinationLocation) {
          console.log(`🔄 Location changed to ${detectedLocation}, updating navigation`);
          // Location change is handled by the location change effect
          setCurrentLocation(detectedLocation);
        } else {
          setCurrentLocation(detectedLocation);
        }
        
        setLastScanTime(new Date().toLocaleTimeString());
        
        // Start cooldown period
        setScanStatus("cooldown");
        setCooldownTimer(SCAN_COOLDOWN);
      } else {
        console.log("⚠️ No WiFi networks found");
        setScanStatus("cooldown");
        setCooldownTimer(SCAN_COOLDOWN);
      }
    } catch (error) {
      console.error("❌ Scan failed:", error);
      setScanStatus("cooldown");
      setCooldownTimer(SCAN_COOLDOWN);
    }
  };

  const startNavigation = () => {
    if (!currentLocation || !destinationLocation) {
      console.log("Cannot start navigation: missing current or destination location");
      return;
    }
    
    // Reset arrival state
    setHasArrived(false);
    
    const path = findPath(currentLocation, destinationLocation);
    setNavigationSteps(path);
    setCurrentStepIndex(0);
    setNavigationActive(true);
    console.log(`🧭 Starting navigation from ${currentLocation} to ${destinationLocation}`);
    console.log(`🧭 Path: ${path.join(' -> ')}`);
  };

  const stopNavigation = () => {
    setNavigationActive(false);
    setNavigationSteps([]);
    setCurrentStepIndex(0);
    setEstimatedArrivalTime(null);
    setHasArrived(false);
    console.log("🛑 Navigation stopped");
  };

  // Add focus effect to handle navigation when screen loses focus
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        // Cleanup when screen loses focus
        if (navigationActive) {
          stopNavigation();
          if (Platform.OS === 'android') {
            ToastAndroid.show('Navigation stopped', ToastAndroid.SHORT);
          }
        }
      };
    }, [navigationActive])
  );

  const getStatusColor = () => {
    switch (scanStatus) {
      case "scanning": return "text-blue-500";
      case "processing": return "text-yellow-500";
      case "cooldown": return "text-orange-500";
      default: return "text-green-500";
    }
  };

  const getStatusText = () => {
    switch (scanStatus) {
      case "scanning": return "Scanning WiFi networks...";
      case "processing": return "Processing signals...";
      case "cooldown": return `Ready in ${cooldownTimer}s`;
      default: return "Ready to scan";
    }
  };

  const isScanDisabled = scanStatus !== "idle";

  // Clear WiFi data from storage
  /*
  const clearWiFiData = async () => {
    try {
      await AsyncStorage.removeItem('wifiData');
      console.log("Cleared WiFi data from storage");
      
      // Keep using the same hardcoded locations
      const hardcodedLocations = [
        "Laiba's room", 
        "Laiba's room 2", 
        "Laiba's Lounge", 
        "Laiba's kitchen",
        "Laiba's Drawing Room",
        "Alishba's room",
        "Alishba Room2",
        "Alishba's lounge"
      ];
      setAvailableLocations(hardcodedLocations);
      
      // Show confirmation
      if (Platform.OS === 'android') {
        ToastAndroid.show('WiFi data cleared!', ToastAndroid.SHORT);
      } else {
        Alert.alert('Success', 'WiFi data cleared');
      }
    } catch (error) {
      console.error("Failed to clear WiFi data:", error);
      
      if (Platform.OS === 'android') {
        ToastAndroid.show('Failed to clear WiFi data', ToastAndroid.SHORT);
      } else {
        Alert.alert('Error', 'Failed to clear WiFi data');
      }
    }
  };
  */

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="flex-1 p-4">
          {/* Header */}
          <Text className="text-2xl font-bold mb-4">Indoor Navigation</Text>

          {/* Current Location */}
          <View className="bg-gray-50 rounded-lg p-3 mb-3">
            <View className="flex-row justify-between items-center">
              <Text className="text-base">Current Location</Text>
            </View>
            <Text className="text-lg mt-1">
              {currentLocation || "Not detected yet"}
            </Text>
          </View>

          {/* Destination */}
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
              {destinationLocation || "No destination selected"}
            </Text>
          </View>

          {/* Navigation Section */}
          {navigationActive && (
            <View className="bg-blue-50 rounded-lg p-3 mb-3">
              <Text className="text-base font-medium mb-2">Navigation Active</Text>
              
              <ScrollView 
                className="bg-white rounded p-2 max-h-96"
                contentContainerStyle={{ paddingBottom: 8 }}
              >
                {navigationSteps.map((step, index) => (
                  <View 
                    key={index} 
                    className={`p-4 mb-3 rounded ${
                      index === currentStepIndex 
                        ? 'bg-blue-100 border border-blue-500' 
                        : 'bg-gray-50'
                    }`}
                  >
                    <Text 
                      className={`text-base ${
                        index === currentStepIndex 
                          ? 'text-blue-800 font-bold' 
                          : 'text-gray-700'
                      }`}
                    >
                      {step}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Action Buttons */}
          <View>
            {/* Detect Location Button */}
            <TouchableOpacity
              className={`p-3 rounded-lg ${
                isScanDisabled ? "bg-gray-400" : "bg-blue-500"
              }`}
              onPress={scanWiFiAndUpdate}
              disabled={isScanDisabled}
            >
              <Text className="text-white text-center text-base font-medium">
                {scanStatus === "scanning" ? "Scanning..." : 
                 scanStatus === "processing" ? "Processing..." : 
                 scanStatus === "cooldown" ? `Scan in ${cooldownTimer}s` : 
                 "Detect Location"}
              </Text>
            </TouchableOpacity>

            {/* Start Navigation Button */}
            {!navigationActive && currentLocation && destinationLocation && (
              <TouchableOpacity
                className="bg-green-500 p-3 rounded-lg mt-3"
                onPress={startNavigation}
              >
                <Text className="text-white text-center text-base font-medium">
                  Start Navigation
                </Text>
              </TouchableOpacity>
            )}

            {/* Stop Navigation Button */}
            {navigationActive && (
              <TouchableOpacity
                className="bg-red-500 p-3 rounded-lg mt-3"
                onPress={stopNavigation}
              >
                <Text className="text-white text-center text-base font-medium">
                  Stop Navigation
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>

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
                selectedValue={destinationLocation}
                onValueChange={(itemValue) => setDestinationLocation(itemValue)}
              >
                <Picker.Item label="Choose your destination" value="" />
                {availableLocations.map((location) => (
                  <Picker.Item key={location} label={location} value={location} />
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
                  if (destinationLocation) {
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
    </SafeAreaView>
  );
};

export default IndoorScreen;
