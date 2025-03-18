// Define a WiFi network type
interface WifiNetwork {
    ssid: string;
    signalStrength: number;
  }
  
  class KalmanFilter {
    private rssiEstimate: number;
    private errorCovariance: number;
    private processNoise: number;
    private measurementNoise: number;
  
    constructor(processNoise: number = 2, measurementNoise: number = 1) { // Increased processNoise, reduced measurementNoise
      this.rssiEstimate = 0;
      this.errorCovariance = 1;
      this.processNoise = processNoise;
      this.measurementNoise = measurementNoise;
    }
  
    public filter(measuredRSSI: number): number {
      // Prediction update
      this.errorCovariance += this.processNoise;
  
      // Kalman Gain
      const kalmanGain = this.errorCovariance / (this.errorCovariance + this.measurementNoise);
  
      // Correction update
      this.rssiEstimate += kalmanGain * (measuredRSSI - this.rssiEstimate);
      this.errorCovariance *= (1 - kalmanGain);
  
      return this.rssiEstimate;
    }
  }
  
  // Function to apply Kalman filter and increase signal variation
  export const applyKalmanFilter = (scannedNetworks: WifiNetwork[]): WifiNetwork[] => {
    const kalmanFilters: Record<string, KalmanFilter> = {};
  
    return scannedNetworks.map((network: WifiNetwork) => {
      if (!kalmanFilters[network.ssid]) {
        kalmanFilters[network.ssid] = new KalmanFilter();
      }
  
      let filteredSignal = kalmanFilters[network.ssid].filter(network.signalStrength);
  
      // 🔥 Increase signal variation dynamically
      const boostFactor = 1.2 + Math.random() * 0.3; // Randomize slightly (1.2 to 1.5 range)
      filteredSignal *= boostFactor;
  
      // Ensure it stays within valid RSSI range (-100 to 0)
      filteredSignal = Math.max(-100, Math.min(0, filteredSignal));
  
      return {
        ssid: network.ssid,
        signalStrength: filteredSignal,
      };
    });
  };
  