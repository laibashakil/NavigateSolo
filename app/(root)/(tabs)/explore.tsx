// Explore.tsx
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import * as Speech from 'expo-speech';
import MapComponent from '@/components/MapComponent';
import PickerComponent from '@/components/PickerComponent';
import { Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { grid } from '@/constants/data';

export default function App() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [position, setPosition] = useState({ row: 0, col: 0 });
  const [destination, setDestination] = useState({ row: 0, col: 0 });
  const [subscription, setSubscription] = useState(null);
  const [path, setPath] = useState<{ row: number; col: number }[]>([]);

  const _subscribe = () => {
    setSubscription(Accelerometer.addListener(setData));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const speakDirection = (direction: string) => {
    Speech.speak(direction);
  };

  const move = (newRow: number, newCol: number, direction: string) => {
    if (
      newRow >= 0 &&
      newRow < grid.length &&
      newCol >= 0 &&
      newCol < grid[0].length
    ) {
      const currentCell = grid[position.row][position.col];
      const targetCell = grid[newRow][newCol];

      if (
        (currentCell === 1 && (targetCell === 1 || targetCell === 0)) ||
        (currentCell === 0 && (targetCell === 2 || targetCell === 3)) ||
        (currentCell === 2 && (targetCell === 2 || targetCell === 0)) ||
        (currentCell === 3 && (targetCell === 3 || targetCell === 0))
      ) {
        setPosition({ row: newRow, col: newCol });
        speakDirection(direction);
      }
    }
  };

  const moveForward = () => move(position.row - 1, position.col, 'Proceed forward.');
  const moveBackward = () => move(position.row + 1, position.col, 'Proceed backward.');
  const moveLeft = () => move(position.row, position.col - 1, 'Take a left turn.');
  const moveRight = () => move(position.row, position.col + 1, 'Take a right turn.');

  const calculateMovement = () => {
    if (Math.abs(data.x) > Math.abs(data.y)) {
      if (data.x > 0) moveRight();
      else moveLeft();
    } else {
      if (data.y > 0) moveForward();
      else moveBackward();
    }
  };

  useEffect(() => {
    calculateMovement();
  }, [data.x, data.y]);

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const moveDirectly = () => {
    const newPath = [];
    let currentRow = position.row;
    let currentCol = position.col;

    // Move row by row towards the destination
    while (currentRow !== destination.row) {
      if (currentRow < destination.row) {
        currentRow += 1;
      } else {
        currentRow -= 1;
      }
      newPath.push({ row: currentRow, col: currentCol });
    }

    // Move column by column towards the destination
    while (currentCol !== destination.col) {
      if (currentCol < destination.col) {
        currentCol += 1;
      } else {
        currentCol -= 1;
      }
      newPath.push({ row: currentRow, col: currentCol });
    }

    setPath(newPath); // Set the path for the grid
  };

  useEffect(() => {
    if (destination.row !== position.row || destination.col !== position.col) {
      moveDirectly(); // Create the path if the position and destination are different
    }
  }, [destination]);

  const groupAreas = (grid: number[][]) => {
    const visited = Array.from({ length: grid.length }, () =>
      Array(grid[0].length).fill(false)
    );
    const labels: { [key: string]: string } = {};
    let classroomCounter = 1;
    let washroomCounter = 1;

    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    const floodFill = (row: number, col: number, type: number, label: string) => {
      const stack = [[row, col]];
      const cells = []; // To store all cells in the current group
      visited[row][col] = true;

      while (stack.length > 0) {
        const [currentRow, currentCol] = stack.pop();
        cells.push([currentRow, currentCol]);

        for (const [dRow, dCol] of directions) {
          const newRow = currentRow + dRow;
          const newCol = currentCol + dCol;

          if (
            newRow >= 0 &&
            newRow < grid.length &&
            newCol >= 0 &&
            newCol < grid[0].length &&
            !visited[newRow][newCol] &&
            grid[newRow][newCol] === type
          ) {
            visited[newRow][newCol] = true;
            stack.push([newRow, newCol]);
          }
        }
      }

      if (cells.length > 0) {
        const centerIndex = Math.floor(cells.length / 2);
        let [midRow, midCol] = cells[centerIndex];

        if (midRow > 0 && grid[midRow - 1][midCol] === type) {
          midRow -= 1;
        }

        if (midCol > 0 && grid[midRow][midCol - 1] === type) {
          midCol -= 1;
        }

        labels[`${midRow}-${midCol}`] = label;
      }
    };

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        if (!visited[row][col]) {
          if (grid[row][col] === 2) {
            const label = `Class ${classroomCounter++}`;
            floodFill(row, col, 2, label);
          } else if (grid[row][col] === 3) {
            const label = `WR ${washroomCounter++}`;
            floodFill(row, col, 3, label);
          }
        }
      }
    }

    return labels;
  };

  const areaLabels = groupAreas(grid);

  const options = Object.keys(areaLabels).map((key) => ({
    label: areaLabels[key],
    value: key,
  }));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.pickerContainer}>
        <PickerComponent 
          title="Choose Current Position"
          selectedValue={`${position.row}-${position.col}`}
          onValueChange={(itemValue) => {
            const [row, col] = itemValue.split('-').map(Number);
            setPosition({ row, col });
          }}
          options={options}
        />
        <PickerComponent 
          title="Choose Destination"
          selectedValue={`${destination.row}-${destination.col}`}
          onValueChange={(itemValue) => {
            const [row, col] = itemValue.split('-').map(Number);
            setDestination({ row, col });
          }}
          options={options}
        />
      </View>
      <MapComponent grid={grid} position={position} path={path} areaLabels={areaLabels} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f7f7f7',
  },
  pickerContainer: {
    marginBottom: -30,
  },
});