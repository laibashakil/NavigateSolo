/**
 * Safe Audio utility that handles Audio playback with error fallbacks
 * This prevents app crashes when Expo Audio isn't available
 */

let audioModuleAvailable = true;
let Audio: any = null;

// Try to import the Audio module - use a more direct approach
try {
  // Native imports to ensure bundling works properly
  const ExpoAV = require('expo-av');
  Audio = ExpoAV.Audio;
  
  // Initialize audio session to make sure audio works
  Audio.setAudioModeAsync({
    playsInSilentModeIOS: true,
    staysActiveInBackground: false,
    shouldDuckAndroid: true,
  }).catch((error: any) => {
    console.warn('Failed to configure audio session:', error);
  });
  
} catch (error) {
  console.warn('Audio module not available:', error);
  audioModuleAvailable = false;
}

/**
 * Play a sound file safely with direct playback handling
 * @param soundAsset Sound asset to play
 * @returns Promise with sound object or null if unavailable
 */
export async function playSoundSafely(soundAsset: any): Promise<any> {
  // Skip if audio module not available
  if (!audioModuleAvailable || !Audio) {
    console.log('Audio module not available, using vibration only');
    return null;
  }

  try {
    // Create the sound with explicit volume control
    const soundObject = new Audio.Sound();
    await soundObject.loadAsync(soundAsset);
    
    // Set maximum volume
    await soundObject.setVolumeAsync(1.0);
    
    // Play sound with a slight delay to ensure it's ready
    setTimeout(async () => {
      try {
        await soundObject.playAsync();
      } catch (playError) {
        console.warn('Error during delayed play:', playError);
      }
    }, 100);
    
    return soundObject;
  } catch (error) {
    // Disable audio if an error occurs
    console.error('Error creating/playing sound:', error);
    audioModuleAvailable = false;
    return null;
  }
}

/**
 * Check if audio functionality is available
 * @returns boolean indicating if audio is available
 */
export function isAudioAvailable(): boolean {
  return audioModuleAvailable;
}

/**
 * Unload a sound object safely
 * @param sound Sound object to unload
 */
export async function unloadSoundSafely(sound: any): Promise<void> {
  if (sound && typeof sound.unloadAsync === 'function') {
    try {
      await sound.unloadAsync();
    } catch (error) {
      console.warn('Error unloading sound:', error);
    }
  }
} 