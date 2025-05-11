const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Custom reporter to filter logs - only show critical errors
const customReporter = {
  update: (event) => {
    // Only show critical errors, ignore everything else
    if (event.type === 'error' && event.level === 'critical') {
      console.error(event.message);
    }
  },
};

// Add reporter to config
config.reporter = customReporter;

// Suppress additional logging
process.env.EXPO_DEBUG = 'false';
process.env.DEBUG = '';

module.exports = withNativeWind(config, { input: "./app/global.css" });