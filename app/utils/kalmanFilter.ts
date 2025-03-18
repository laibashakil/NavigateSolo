// Define a WiFi network type
interface WifiNetwork {
    ssid: string;
    mac: string;
    signalStrength: string;
  }
  
  class KalmanFilter {
    private rssiEstimate: number;
    private errorCovariance: number;
    private processNoise: number;
    private measurementNoise: number;
    private lastValidEstimate: number | null = null;
    private signalHistory: number[] = [];
    private readonly HISTORY_SIZE = 3;
  
    constructor(processNoise: number = 0.5, measurementNoise: number = 2) {
      this.rssiEstimate = 0;
      this.errorCovariance = 1;
      this.processNoise = processNoise;
      this.measurementNoise = measurementNoise;
    }
  
    private isValidReading(rssi: number): boolean {
      return rssi >= -100 && rssi <= 0;
    }
  
    private getSignalVariability(): number {
      if (this.signalHistory.length < 2) return 0;
      
      // Calculate standard deviation of recent readings
      const mean = this.signalHistory.reduce((a, b) => a + b, 0) / this.signalHistory.length;
      const variance = this.signalHistory.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / this.signalHistory.length;
      return Math.sqrt(variance);
    }
  
    public filter(measuredRSSI: string | number): number {
      const rssiValue = typeof measuredRSSI === 'string' ? parseFloat(measuredRSSI) : measuredRSSI;
      
      // Validate the reading
      if (!this.isValidReading(rssiValue)) {
        return this.lastValidEstimate ?? rssiValue;
      }
  
      // Initialize estimate if this is the first reading
      if (this.lastValidEstimate === null) {
        this.rssiEstimate = rssiValue;
        this.lastValidEstimate = rssiValue;
        this.signalHistory.push(rssiValue);
        return rssiValue;
      }
  
      // Update signal history
      this.signalHistory.push(rssiValue);
      if (this.signalHistory.length > this.HISTORY_SIZE) {
        this.signalHistory.shift();
      }
  
      // Calculate signal variability
      const variability = this.getSignalVariability();
      
      // Adjust filter parameters based on signal variability
      this.processNoise = 0.5 + (variability * 0.1);
      this.measurementNoise = 2 + (variability * 0.2);
  
      // Detect and handle sudden large changes
      const suddenChange = Math.abs(rssiValue - this.lastValidEstimate) > 15;
      if (suddenChange) {
        // Use a weighted average with weights based on signal variability
        const historyWeight = Math.max(0.5, 1 - (variability * 0.1));
        this.rssiEstimate = (this.lastValidEstimate * historyWeight) + (rssiValue * (1 - historyWeight));
      } else {
        // Normal Kalman filter update
        this.errorCovariance += this.processNoise;
  
        // Kalman Gain
        const kalmanGain = this.errorCovariance / (this.errorCovariance + this.measurementNoise);
  
        // Correction update
        this.rssiEstimate += kalmanGain * (rssiValue - this.rssiEstimate);
        this.errorCovariance *= (1 - kalmanGain);
      }
  
      // Store this estimate for next time
      this.lastValidEstimate = this.rssiEstimate;
      
      return this.rssiEstimate;
    }
  }
  
  // Function to apply Kalman filter to smooth signals
  export const applyKalmanFilter = (scannedNetworks: WifiNetwork[]): WifiNetwork[] => {
    const kalmanFilters: Record<string, KalmanFilter> = {};
  
    return scannedNetworks.map((network: WifiNetwork) => {
      const networkId = `${network.ssid}_${network.mac}`;
      
      if (!kalmanFilters[networkId]) {
        kalmanFilters[networkId] = new KalmanFilter();
      }
  
      const filteredSignal = kalmanFilters[networkId].filter(network.signalStrength);
  
      // Ensure it stays within valid RSSI range (-100 to 0)
      const boundedSignal = Math.max(-100, Math.min(0, filteredSignal));
  
      return {
        ssid: network.ssid,
        mac: network.mac,
        signalStrength: boundedSignal.toString()
      };
    });
  };
  