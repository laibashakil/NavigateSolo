// StepDetector.tsx
import React, { useState, useEffect } from 'react';
import { Pedometer, Accelerometer, Magnetometer } from 'expo-sensors';

interface StepDetectorProps {
  onMove: (direction: { direction: 'forward' | 'backward' | 'left' | 'right' }) => void;
  onSensorUpdate: (data: { 
    accelerometer: { x: number; y: number; z: number } | null; 
    magnetometer: { x: number; y: number; z: number } | null; 
    steps: number 
  }) => void;
}

export default function StepDetector({ onMove, onSensorUpdate }: StepDetectorProps) {
  const [accelerometerData, setAccelerometerData] = useState<{ x: number; y: number; z: number } | null>(null);
  const [magnetometerData, setMagnetometerData] = useState<{ x: number; y: number; z: number } | null>(null);
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    const unsubscribeAccelerometer = Accelerometer.addListener(data => {
      setAccelerometerData(data);
    });
    const unsubscribeMagnetometer = Magnetometer.addListener(data => {
      setMagnetometerData(data);
    });
    const unsubscribePedometer = Pedometer.watchStepCount(result => {
      setSteps(result.steps);
    });

    return () => {
      unsubscribeAccelerometer.remove();
      unsubscribeMagnetometer.remove();
      unsubscribePedometer.remove();
    };
  }, []);

  useEffect(() => {
    onSensorUpdate({ 
      accelerometer: accelerometerData, 
      magnetometer: magnetometerData, 
      steps 
    });
  }, [accelerometerData, magnetometerData, steps]);

  useEffect(() => {
    if (steps % 4 === 0 && steps !== 0 && accelerometerData && magnetometerData) {
      const { x: accelX = 0, y: accelY = 0 } = accelerometerData;
      const { x: magX = 0, y: magY = 0 } = magnetometerData;
      const accelerationThreshold = 0.005;
      const movementThreshold = 5; // Assuming 5 units is significant movement in magnetometer readings

      let direction: 'forward' | 'backward' | 'left' | 'right' = 'forward';

      if (Math.abs(accelX) > accelerationThreshold || Math.abs(accelY) > accelerationThreshold) {
        if (Math.abs(magX) > movementThreshold || Math.abs(magY) > movementThreshold) {
          if (Math.abs(magX) > Math.abs(magY)) {
            direction = magX > 0 ? 'right' : 'left';
          } else {
            direction = magY > 0 ? 'backward' : 'forward';
          }
        } else {
          if (Math.abs(accelX) > Math.abs(accelY)) {
            direction = accelX > 0 ? 'right' : 'left';
          } else {
            direction = accelY > 0 ? 'backward' : 'forward';
          }
        }
        console.log("Triggering move after 4 steps!");
        console.log("Direction:", direction);
        onMove({ direction });
      }
    }
  }, [steps, accelerometerData, magnetometerData, onMove]);

  return null;
}