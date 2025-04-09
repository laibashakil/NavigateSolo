import { Vibration, Platform } from 'react-native';
import * as Speech from 'expo-speech';

/**
 * Plays a tone with vibration and speaks the navigation instruction
 * @param isArrival Whether this is an arrival tone (true) or a navigation instruction
 * @param textToSpeak Optional text to speak (for navigation instructions)
 */
export async function playTone(isArrival = false, textToSpeak?: string): Promise<void> {
  // Always vibrate for reliable feedback
  if (isArrival) {
    // Stronger pattern for arrival
    Vibration.vibrate([100, 200, 300, 200, 400, 200]);
  } else {
    // Simple pattern for navigation
    Vibration.vibrate([100, 100, 100]);
  }
  
  // Speak the text if provided
  if (textToSpeak) {
    try {
      // Stop any ongoing speech
      Speech.stop();
      
      // Speak the instruction
      await Speech.speak(textToSpeak, {
        language: 'en',
        pitch: 1.0,
        rate: 0.9,
      });
    } catch (error) {
      console.error("Failed to speak text:", error);
    }
  }
} 