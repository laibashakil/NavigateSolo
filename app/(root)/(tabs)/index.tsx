import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<Location.LocationObjectCoords | null>(null);
  const mapRef = useRef<MapView | null>(null);

  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    setUserLocation(location.coords); // Update user location
    console.log('User Location:', location.coords); // Debugging line

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
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
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
        {/* Only render the Marker if userLocation is available */}
        {userLocation && (
          <Marker coordinate={userLocation} title="Your Location" />
        )}
      </MapView>

      <View
        style={{
          position: 'absolute',
          bottom: 70,
          left: 0,
          right: 0,
          padding: 5,
        }}
      >
        <Button title="Get Location" onPress={getUserLocation} />
        {errorMsg && (
          <Text style={{ textAlign: 'center', color: 'red' }}>{errorMsg}</Text>
        )}
      </View>
    </View>
  );
}
