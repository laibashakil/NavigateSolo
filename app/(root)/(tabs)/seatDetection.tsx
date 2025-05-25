import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useRef } from 'react';

const SeatDetection = () => {
  const webViewRef = useRef<WebView>(null);

  // Function to reload the WebView when the tab is focused
  const reloadWebView = useCallback(() => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  }, []);

  // Use useFocusEffect to reload the WebView every time the tab is focused
  useFocusEffect(
    useCallback(() => {
      reloadWebView();
    }, [reloadWebView])
  );

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: 'https://live-seat-detection.streamlit.app' }}
      style={{ flex: 1 }}
      allowsInlineMediaPlayback={true}
      mediaPlaybackRequiresUserAction={false}
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