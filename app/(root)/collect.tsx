import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { scanWiFi } from '@/utils/scanWiFi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

interface WifiReading {
  ssid: string;
  mac: string;
  signalStrength: string;
}

interface LocationData {
  location: string;
  signals: WifiReading[];
}

const READINGS_PER_LOCATION = 3;
const SECONDS_PER_READING = 30;

const CollectScreen = () => {
  const router = useRouter();
  const [locationName, setLocationName] = useState('');
  const [isCollecting, setIsCollecting] = useState(false);
  const [currentReading, setCurrentReading] = useState(0);
  const [countdown, setCountdown] = useState(SECONDS_PER_READING);
  const [readings, setReadings] = useState<WifiReading[][]>([]);
  const [status, setStatus] = useState('Ready to collect');
  const [collectedData, setCollectedData] = useState<LocationData | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isCollecting && currentReading < READINGS_PER_LOCATION) {
      if (countdown > 0) {
        timer = setInterval(() => {
          setCountdown(prev => prev - 1);
        }, 1000);
      } else {
        collectReading();
      }
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isCollecting, countdown, currentReading]);

  const startCollection = () => {
    if (!locationName.trim()) {
      Alert.alert('Error', 'Please enter a location name');
      return;
    }

    setCollectedData(null);
    setIsCollecting(true);
    setCurrentReading(0);
    setCountdown(SECONDS_PER_READING);
    setReadings([]);
    setStatus('Move to position 1 and wait...');
  };

  const collectReading = async () => {
    try {
      const wifiData = await scanWiFi();
      setReadings(prev => [...prev, wifiData]);
      
      if (currentReading + 1 < READINGS_PER_LOCATION) {
        setCurrentReading(prev => prev + 1);
        setCountdown(SECONDS_PER_READING);
        setStatus(`Move to position ${currentReading + 2} and wait...`);
      } else {
        await processAndSaveData();
      }
    } catch (error) {
      console.error('Error collecting WiFi data:', error);
      Alert.alert('Error', 'Failed to collect WiFi data');
      resetCollection();
    }
  };

  const processAndSaveData = async () => {
    try {
      // Create a map to store averaged signals
      const signalMap = new Map<string, { 
        ssid: string, 
        totalStrength: number, 
        count: number 
      }>();

      // Process all readings
      readings.forEach(reading => {
        reading.forEach(signal => {
          const key = signal.mac;
          const strength = parseFloat(signal.signalStrength);
          
          if (!signalMap.has(key)) {
            signalMap.set(key, { 
              ssid: signal.ssid, 
              totalStrength: strength, 
              count: 1 
            });
          } else {
            const current = signalMap.get(key)!;
            signalMap.set(key, {
              ...current,
              totalStrength: current.totalStrength + strength,
              count: current.count + 1
            });
          }
        });
      });

      // Convert to averaged signals
      const averagedSignals: WifiReading[] = Array.from(signalMap.entries())
        .map(([mac, data]) => ({
          ssid: data.ssid,
          mac,
          signalStrength: (data.totalStrength / data.count).toFixed(1)
        }))
        .filter(signal => {
          // Only keep signals that were present in majority of readings
          const presence = signalMap.get(signal.mac)!.count;
          return presence >= Math.ceil(READINGS_PER_LOCATION / 2);
        });

      // Create location entry
      const locationEntry: LocationData = {
        location: locationName,
        signals: averagedSignals
      };

      // Load existing data
      const existingData = await AsyncStorage.getItem('wifiData');
      const wifiData: LocationData[] = existingData ? JSON.parse(existingData) : [];

      // Add new location data
      const updatedData = [...wifiData, locationEntry];
      await AsyncStorage.setItem('wifiData', JSON.stringify(updatedData));

      // Set the data to display on screen
      setCollectedData(locationEntry);
      setStatus('Collection complete!');
      setIsCollecting(false);

      // Log the data to the terminal in the same format as shown on screen
      console.log("\n📝 COLLECTED WIFI DATA");
      console.log("=====================");
      console.log(`Location: ${locationName}`);
      console.log("Data Format:");
      
      const formattedTerminalOutput = `{
  "location": "${locationEntry.location}",
  "signals": [${locationEntry.signals.map((signal, index) => `
    {
      "ssid": "${signal.ssid}",
      "mac": "${signal.mac}",
      "signalStrength": "${signal.signalStrength}"
    }${index < locationEntry.signals.length - 1 ? ',' : ''}`).join('')}
  ]
}`;
      
      console.log(formattedTerminalOutput);
      console.log("=====================");
      console.log(`Total signals: ${averagedSignals.length}`);
    } catch (error) {
      console.error('Error processing and saving data:', error);
      Alert.alert('Error', 'Failed to save location data');
      resetCollection();
    }
  };

  const resetCollection = () => {
    setIsCollecting(false);
    setCurrentReading(0);
    setCountdown(SECONDS_PER_READING);
    setReadings([]);
    setStatus('Ready to collect');
  };

  const goBack = () => {
    setCollectedData(null);
    setLocationName('');
    router.back();
  };

  // Format the collected data as JSON string for display
  const formatCollectedData = (data: LocationData) => {
    return JSON.stringify(data, null, 2);
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-2xl font-bold">Collect WiFi Data</Text>
        <TouchableOpacity 
          onPress={goBack}
          disabled={isCollecting}
        >
          <Text className="text-blue-500 text-lg">Done</Text>
        </TouchableOpacity>
      </View>
      
      {!collectedData ? (
        <>
          <View className="bg-gray-50 rounded-lg p-4 mb-4">
            <Text className="text-sm text-gray-500 mb-2">Location Name</Text>
            <TextInput
              className="bg-white p-2 rounded border border-gray-200"
              value={locationName}
              onChangeText={setLocationName}
              placeholder="Enter location name"
              editable={!isCollecting}
            />
          </View>

          <View className="bg-gray-50 rounded-lg p-4 mb-4">
            <Text className="text-sm text-gray-500 mb-2">Status</Text>
            <Text className="text-lg font-semibold">{status}</Text>
            {isCollecting && (
              <>
                <Text className="mt-2">Reading: {currentReading + 1}/{READINGS_PER_LOCATION}</Text>
                <Text>Time remaining: {countdown}s</Text>
                <ActivityIndicator size="large" className="mt-4" />
              </>
            )}
          </View>

          <TouchableOpacity
            className={`p-4 rounded-lg ${
              isCollecting ? 'bg-gray-400' : 'bg-blue-500'
            }`}
            onPress={startCollection}
            disabled={isCollecting}
          >
            <Text className="text-white text-center text-lg font-semibold">
              {isCollecting ? 'Collection in Progress...' : 'Start Collection'}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text className="text-lg font-bold mb-2">Data Collected Successfully!</Text>
          <Text className="mb-4">Location: {collectedData.location}</Text>
          
          <ScrollView 
            className="bg-gray-50 p-4 rounded-lg mb-4"
            style={{ maxHeight: 300 }}
          >
            <Text className="font-bold">Collected WiFi Data:</Text>
            <Text className="font-mono mt-2" selectable={true}>
              {`{\n  "location": "${collectedData.location}",\n  "signals": [`}
              {collectedData.signals.map((signal, index) => (
                `\n    {\n      "ssid": "${signal.ssid}",\n      "mac": "${signal.mac}",\n      "signalStrength": "${signal.signalStrength}"\n    }${index < collectedData.signals.length - 1 ? ',' : ''}`
              ))}
              {`\n  ]\n}`}
            </Text>
          </ScrollView>
          
          <Text className="text-green-600 mb-4">
            This data has been saved and can be used for location detection.
          </Text>
          
          <TouchableOpacity
            className="bg-blue-500 p-4 rounded-lg"
            onPress={() => {
              setCollectedData(null);
              setLocationName('');
            }}
          >
            <Text className="text-white text-center text-lg font-semibold">
              Collect Another Location
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default CollectScreen; 