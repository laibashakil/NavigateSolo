import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const SeatDetection = () => {
  return (
    <WebView
      source={{ uri: 'https://live-seat-detection.streamlit.app' }}
      style={{ flex: 1 }}
      startInLoadingState={true}
      renderLoading={() => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading Seat Detection...</Text>
        </View>
      )}
    />
  );
};

export default SeatDetection;
