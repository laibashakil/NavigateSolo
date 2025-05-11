import { View, Text } from 'react-native';
import * as Linking from 'expo-linking';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const SeatDetection = () => {
  // Function to open the Streamlit app
  const openSeatDetection = () => {
    const url = 'https://live-seat-detection.streamlit.app'; // Your Streamlit Cloud URL
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };

  // Use useFocusEffect to run the function every time the tab is focused
  useFocusEffect(
    useCallback(() => {
      openSeatDetection();
    }, []) // Empty dependency array for useCallback to prevent unnecessary re-renders
  );

  // Render a fallback UI while the URL is being opened
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Opening Streamlit app...</Text>
    </View>
  );
};

export default SeatDetection;