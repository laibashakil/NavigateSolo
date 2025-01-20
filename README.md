# Project Setup and Build Commands

This document serves as a reference for the commands I have run in the terminal for setting up and building the project.

## Initial Setup

1. `npm install --save nativewind tailwindcss`
2. `npx tailwindcss init`
3. `npx pod-install`
4. `npx expo customize metro.config.js`
5. `npx expo install react-native-appwrite react-native-url-polyfill`
6. `npx expo install react-native-maps`
7. `npx expo install expo-location`

## Running the Project

1. `npx expo start`

## EAS CLI Setup and Builds

1. `npm install -g eas-cli`
2. `eas login`
3. `eas build -p android --profile preview`
4. `eas build --platform android`
5. `expo build:android`
6. `npx expo build:android`
7. `eas build:run -p android --latest`
8. `eas build --p android`
9. `eas build -p android --profile preview`

## Additional Common Commands

1. `npm install`
