# NavigateSolo - Accessible Navigation System

<div align="center">

**An intelligent navigation system designed for accessibility and independence**

[![React Native](https://img.shields.io/badge/React%20Native-0.76.6-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-52.0.25-black.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue.svg)](https://www.typescriptlang.org/)
[![Appwrite](https://img.shields.io/badge/Appwrite-Backend-orange.svg)](https://appwrite.io/)

</div>

## 📱 Overview

NavigateSolo is a comprehensive navigation application designed to provide accessible navigation solutions for visually impaired individuals and anyone seeking independent navigation. The app combines cutting-edge technology with user-friendly design to make both indoor and outdoor navigation more accessible and reliable.

## ✨ Features

### 🏠 Indoor Navigation
- **WiFi Fingerprinting Technology**: Uses WiFi signal characteristics to determine precise indoor location
- **Real-time Location Detection**: Continuously scans and matches WiFi signals against stored fingerprints
- **Voice-guided Instructions**: Provides audio feedback with haptic vibrations for navigation guidance
- **Automatic Arrival Detection**: Notifies users when they reach their destination
- **Path Finding**: Calculates optimal routes between indoor locations
- **Kalman Filtering**: Reduces signal noise and improves location accuracy

### 🌍 Outdoor Navigation
- **GPS-based Navigation**: Utilizes device GPS for outdoor location tracking
- **OpenRouteService Integration**: Provides detailed walking directions and route optimization
- **Compass Integration**: Real-time compass heading with magnetometer data
- **Voice-guided Turn-by-turn**: Audio instructions with directional guidance
- **Automatic Route Updates**: Refreshes routes every 30 seconds for accuracy
- **Multiple Destinations**: Pre-configured popular locations with easy selection

### 🪑 Seat Detection
- **Real-time Seat Monitoring**: WebView integration with live seat detection system
- **Occupancy Tracking**: Identifies available and occupied seats in real-time
- **Accessible Interface**: Designed for easy navigation and seat selection
- **Cross-platform Compatibility**: Works seamlessly across different devices

### 👤 Profile Management
- **Google Sign-In Integration**: Secure authentication using Google accounts
- **User Profile Management**: Edit personal information, contact details, and preferences
- **Emergency Contacts**: Store and manage emergency contact information
- **Account Settings**: Comprehensive account customization options
- **Privacy Controls**: Manage data permissions and privacy settings

## 🛠️ Tech Stack

### Frontend & Mobile
- **React Native** (0.76.6) - Cross-platform mobile development
- **Expo** (52.0.25) - Development platform and build tools
- **TypeScript** (5.3.3) - Type-safe JavaScript development
- **NativeWind** (4.1.23) - Tailwind CSS for React Native
- **React Navigation** (7.0.14) - Navigation library
- **Expo Router** (4.0.16) - File-based routing

### Backend & Database
- **Appwrite** (0.6.0) - Backend-as-a-Service platform
- **Google Sign-In** (13.2.0) - Authentication service
- **AsyncStorage** (1.23.1) - Local data persistence

### Navigation & Location
- **Expo Location** (18.0.5) - GPS and location services
- **Expo Sensors** (14.0.2) - Device sensors (magnetometer, compass)
- **React Native Maps** (1.18.0) - Map integration
- **Haversine** (1.1.1) - Distance calculations
- **OpenRouteService API** - Route planning and directions

### WiFi & Signal Processing
- **React Native WiFi Reborn** (4.13.4) - WiFi scanning capabilities
- **Custom Kalman Filter** - Signal noise reduction algorithm
- **Signal Processing Algorithms** - Location matching and fingerprinting

### Audio & Accessibility
- **Expo Speech** (13.0.1) - Text-to-speech functionality
- **React Native TTS** (4.1.1) - Additional TTS capabilities
- **Expo Haptics** (14.0.1) - Haptic feedback
- **Expo AV** (15.0.2) - Audio/Video capabilities

### UI/UX & Styling
- **Expo Vector Icons** (14.0.2) - Icon library
- **Expo Blur** (14.0.2) - Visual effects
- **React Native Reanimated** (3.16.1) - Smooth animations
- **React Native Gesture Handler** (2.20.2) - Touch interactions
- **Custom Rubik Font Family** - Typography

### Development Tools
- **Jest** (29.2.1) - Testing framework with jest-expo preset
- **Babel** (7.25.2) - JavaScript compiler with Expo and NativeWind presets
- **Metro** - React Native bundler with NativeWind configuration
- **Expo Lint** - Built-in code linting from Expo CLI

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/laibashakil/NavigateSolo.git
   cd NavigateSolo
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with your Appwrite configuration:
   ```env
   EXPO_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
   EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
   EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
   EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID=your_collection_id
   EXPO_PUBLIC_APPWRITE_BUCKET_ID=your_bucket_id
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Run on device/simulator**
   ```bash
   # Android
   npm run android
   
   # iOS
   npm run ios
   
   # Web
   npm run web
   ```

## 📱 App Structure

```
NavigateSolo/
├── app/                          # Main application screens
│   ├── (root)/                   # Root navigation
│   │   ├── (tabs)/              # Tab-based navigation
│   │   │   ├── index.tsx        # Home screen
│   │   │   ├── indoor.tsx       # Indoor navigation
│   │   │   ├── outdoor.tsx      # Outdoor navigation
│   │   │   ├── seatDetection.tsx # Seat detection
│   │   │   └── profile.tsx      # User profile
│   │   ├── AboutScreen.tsx      # About page
│   │   ├── EditProfileScreen.tsx # Profile editing
│   │   ├── FAQScreen.tsx        # FAQ page
│   │   ├── PrivacyPolicyScreen.tsx # Privacy policy
│   │   └── collect.tsx          # WiFi data collection
│   ├── sign-in.jsx              # Authentication screen
│   └── _layout.tsx              # Root layout
├── lib/                         # Core libraries
│   ├── appwrite.ts              # Appwrite configuration
│   ├── global-provider.tsx      # Global state management
│   └── useAppwrite.ts           # Appwrite hooks
├── utils/                       # Utility functions
│   ├── kalmanFilter.ts          # Signal filtering
│   ├── locationFinder.ts        # Location matching
│   ├── scanWiFi.ts              # WiFi scanning
│   └── audioFallback.ts         # Audio utilities
├── constants/                   # App constants
│   ├── wifiData.ts              # WiFi fingerprint data
│   ├── roomConnections.ts       # Indoor navigation paths
│   └── icons.ts                 # Icon definitions
└── assets/                      # Static assets
    ├── fonts/                   # Custom fonts
    ├── images/                  # App images
    └── sounds/                  # Audio files
```

## 🔧 Configuration

### Appwrite Setup
1. Create an Appwrite project
2. Set up a database with a users collection
3. Configure authentication with Google Sign-In
4. Update environment variables with your Appwrite credentials

### Google Sign-In
1. Create a Google Cloud project
2. Enable Google Sign-In API
3. Configure OAuth 2.0 credentials
4. Update the client IDs in the app configuration

### OpenRouteService
1. Sign up for an OpenRouteService API key
2. Update the API key in the outdoor navigation component

## 📊 Features in Detail

### Indoor Navigation System
The indoor navigation uses WiFi fingerprinting technology to determine user location within buildings:

- **Signal Collection**: Scans for nearby WiFi networks and their signal strengths
- **Fingerprint Matching**: Compares current signals with stored location fingerprints
- **Kalman Filtering**: Reduces signal noise and improves accuracy
- **Path Calculation**: Determines optimal routes between locations
- **Voice Guidance**: Provides audio instructions with haptic feedback

### Outdoor Navigation System
GPS-based navigation with comprehensive routing capabilities:

- **Real-time GPS Tracking**: Continuous location updates
- **Route Optimization**: Calculates optimal walking paths
- **Compass Integration**: Provides directional guidance
- **Voice Instructions**: Turn-by-turn navigation with audio feedback
- **Automatic Updates**: Refreshes routes for accuracy

### Seat Detection System
Real-time seat monitoring through web integration:

- **Live Monitoring**: Real-time seat occupancy tracking
- **Accessible Interface**: Designed for easy navigation
- **Cross-platform**: Works on all supported devices
- **WebView Integration**: Seamless web app integration

### Profile Management
Comprehensive user account and settings management:

- **Secure Authentication**: Google Sign-In integration
- **Profile Customization**: Edit personal information and preferences
- **Emergency Contacts**: Store and manage emergency contact information
- **Privacy Settings**: Control data permissions and privacy
- **Account Security**: Secure session management

## 🎯 Target Users

- **Visually Impaired Individuals**: Primary target audience requiring accessible navigation
- **Students**: Campus navigation and seat finding
- **General Public**: Anyone seeking reliable indoor/outdoor navigation
- **Accessibility Advocates**: Supporting inclusive technology development

## 🤝 Contributing

We welcome contributions to improve NavigateSolo! Please read our contributing guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Development Team

**NavigateSolo** is a final year project developed by students from the Computer Science and Information Technology Department of NED University of Engineering and Technology, Karachi, Pakistan.

---

<div align="center">

**Made with ❤️ for accessibility and independence**

*NavigateSolo - Empowering independent navigation*

</div>
