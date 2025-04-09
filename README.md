# NavigateSolo: Indoor Navigation System using WiFi Fingerprinting

## Overview
This project implements an indoor navigation system using WiFi fingerprinting technology. The system uses the unique characteristics of WiFi signals (signal strength, MAC addresses, and SSIDs) to determine a user's location within a building. This approach is particularly useful in environments where GPS signals are weak or unavailable.

## How It Works

### 1. WiFi Fingerprinting
WiFi fingerprinting works by creating a "fingerprint" of WiFi signals at different locations. Each fingerprint consists of:
- SSID (Network name)
- MAC address (Unique identifier of the access point)
- Signal strength (RSSI - Received Signal Strength Indicator)

### 2. Data Collection Process
The system uses a two-phase approach:

#### Phase 1: Data Collection
1. Open the app and navigate to the "Collect Data" screen
2. Enter the name of the location you want to map
3. The system will take 3 readings at 30-second intervals
4. For each reading:
   - Stand still at the exact location
   - Wait for the 30-second countdown to complete
   - The system automatically collects WiFi signals
5. The readings are averaged to create a stable fingerprint
6. The data is saved to the device's storage

#### Phase 2: Navigation
1. Open the "Indoor" screen
2. The system continuously scans for WiFi signals
3. Using the collected fingerprints, it:
   - Compares current signals with stored fingerprints
   - Applies Kalman filtering to smooth signal variations
   - Calculates the best matching location
   - Updates the user's position in real-time

## Technical Implementation

### Core Components

1. **Signal Processing**
   - Kalman Filter: Reduces signal noise and improves accuracy
   - Signal averaging: Combines multiple readings for stability
   - Signal strength normalization: Converts raw RSSI to standardized values

2. **Location Matching Algorithm**
   - Compares current WiFi signals with stored fingerprints
   - Uses weighted scoring system considering:
     - Signal strength differences
     - Network stability
     - Trusted networks
     - Unique network presence
   - Confidence scoring for location determination

3. **Navigation Features**
   - Real-time location updates
   - Path finding between locations
   - Arrival detection
   - Audio feedback for navigation

### Data Structure
The system stores location data in the following format:
```json
{
  "location": "Room Name",
  "signals": [
    {
      "ssid": "Network Name",
      "mac": "MAC Address",
      "signalStrength": "RSSI Value"
    }
  ]
}
```

## Pros and Cons of WiFi-based Indoor Navigation

### Advantages
1. **No Additional Hardware Required**
   - Uses existing WiFi infrastructure
   - Works with standard smartphones

2. **Cost-Effective**
   - No need for specialized beacons or sensors
   - Minimal setup costs

3. **Wide Coverage**
   - Works in most indoor environments
   - Can cover large areas

4. **Privacy-Focused**
   - No need for camera access
   - Works without internet connection

### Limitations
1. **Signal Variability**
   - WiFi signals can fluctuate
   - Affected by obstacles and interference

2. **Setup Requirements**
   - Requires initial data collection
   - Needs stable WiFi environment

3. **Accuracy Limitations**
   - Typically 2-5 meters accuracy
   - Less precise than specialized systems

4. **Environmental Dependence**
   - Performance varies with building layout
   - Affected by WiFi network changes

## Best Practices for Data Collection

1. **Location Selection**
   - Choose distinct, well-defined locations
   - Avoid areas with signal interference
   - Mark exact spots for consistency

2. **Data Collection Tips**
   - Take readings at different times of day
   - Ensure stable WiFi environment
   - Collect multiple readings per location
   - Wait for 30 seconds at each spot

3. **Signal Quality**
   - Aim for at least 3-4 strong signals per location
   - Note trusted networks (e.g., your own router)
   - Avoid areas with too many overlapping signals

## Usage Instructions

### Data Collection
1. Open the app
2. Tap "Collect Data"
3. Enter location name
4. Press "Start Collection"
5. Stand still at the location
6. Wait for all 3 readings to complete
7. Review the collected data
8. Tap "Done" to save

### Navigation
1. Open the app
2. Go to "Indoor" screen
3. Wait for initial location detection
4. Select destination if needed
5. Follow the navigation guidance
6. System will announce arrival

## Technical Requirements
- Android device with WiFi capability
- Minimum Android version: 9.0
- WiFi enabled environment
- Sufficient WiFi access points

## Troubleshooting

### Common Issues
1. **Location Not Detected**
   - Ensure WiFi is enabled
   - Check if location has been properly mapped
   - Move to a different spot and try again

2. **Inaccurate Location**
   - Recollect data for the location
   - Check for new WiFi networks
   - Ensure stable signal environment

3. **Navigation Issues**
   - Clear app cache
   - Restart the app
   - Verify data collection quality

## Future Improvements
1. Machine learning for better accuracy
2. Crowdsourced data collection
3. Multi-floor support
4. Integration with other sensors
5. Offline map support

## Adding New Locations to the Navigation System

### Step-by-Step Guide

1. **Collect WiFi Data for the New Location**
   - Open the app and tap on the "Collect Data" button
   - Enter the name of the new location
   - Follow the data collection process (standing still for 3 readings)
   - Save the collected data

2. **Update the wifiData.ts File**
   - Copy the data output from the terminal/console
   - Open the `constants/wifiData.ts` file
   - Add the new location data in the proper format:
   ```typescript
   {
     "location": "New Location Name",
     "signals": [
       {
         "ssid": "WiFi Network Name",
         "mac": "XX:XX:XX:XX:XX:XX",
         "signalStrength": "-XX.X"
       },
       // Other networks...
     ]
   }
   ```

3. **Add the Location to the Hardcoded Locations List**
   - Open the `app/(root)/(tabs)/indoor.tsx` file
   - Find the `hardcodedLocations` array
   - Add your new location name to the array:
   ```typescript
   const hardcodedLocations = [
     // Existing locations...
     "New Location Name" 
   ];
   ```

4. **Define Room Connections**
   - Open the `constants/roomConnections.ts` file
   - Add new entries to the `roomConnections` array for both directions:
   ```typescript
   { 
     from: "Existing Location", 
     to: "New Location", 
     direction: "Instructions on how to get there", 
     steps: 8,
     timeSeconds: 12
   },
   { 
     from: "New Location", 
     to: "Existing Location", 
     direction: "Instructions for returning", 
     steps: 8,
     timeSeconds: 12
   },
   ```
   - Update the `roomAdjacencyMap` object to include connections:
   ```typescript
   "New Location": ["Connected Location 1", "Connected Location 2"],
   "Connected Location 1": ["Existing Connections", "New Location"]
   ```

5. **Test the Navigation**
   - Restart the app to apply all changes
   - Use the "Detect Location" button to verify detection works
   - Test navigation to and from the new location