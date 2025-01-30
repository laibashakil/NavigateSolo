import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import * as Speech from 'expo-speech';
import { Picker } from '@react-native-picker/picker'; // Correct import here
import { grid } from '@/constants/data';

export default function App() {
  const [{ x, y }, setData] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ row: 0, col: 0 });
  const [destination, setDestination] = useState({ row: 0, col: 0 });
  const [subscription, setSubscription] = useState(null);
  const [path, setPath] = useState([]); // Store path coordinates

  const _subscribe = () => {
    setSubscription(Accelerometer.addListener(setData));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const speakDirection = (direction) => {
    Speech.speak(direction);
  };

  const move = (newRow, newCol, direction) => {
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
    if (Math.abs(x) > Math.abs(y)) {
      if (x > 0) moveRight();
      else moveLeft();
    } else {
      if (y > 0) moveForward();
      else moveBackward();
    }
  };

  useEffect(() => {
    calculateMovement();
  }, [x, y]);

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  // Direct path calculation (simplified)
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
    // Automatically find path when destination is set
    if (destination.row !== position.row || destination.col !== position.col) {
      moveDirectly(); // Create the path if the position and destination are different
    }
  }, [destination]); // Run whenever destination changes

  // Function to group and label connected areas
  const groupAreas = (grid) => {
    const visited = Array.from({ length: grid.length }, () =>
      Array(grid[0].length).fill(false)
    );
    const labels = {};
    let classroomCounter = 1;
    let washroomCounter = 1;

    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    const floodFill = (row, col, type, label) => {
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

  // Creating list of options for dropdowns
  const options = Object.keys(areaLabels).map((key) => ({
    label: areaLabels[key],
    value: key,
  }));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.pickerContainer}>
        {/* Dropdown for Current Position */}
        <Text>Choose Current Position</Text>
        <Picker
          selectedValue={`${position.row}-${position.col}`}
          onValueChange={(itemValue) => {
            const [row, col] = itemValue.split('-').map(Number);
            setPosition({ row, col });
          }}
          style={styles.picker}>
          {options.map((option) => (
            <Picker.Item key={option.value} label={option.label} value={option.value} />
          ))}
        </Picker>

        {/* Dropdown for Destination */}
        <Text>Choose Destination</Text>
        <Picker
          selectedValue={`${destination.row}-${destination.col}`}
          onValueChange={(itemValue) => {
            const [row, col] = itemValue.split('-').map(Number);
            setDestination({ row, col });
          }}
          style={styles.picker}>
          {options.map((option) => (
            <Picker.Item key={option.value} label={option.label} value={option.value} />
          ))}
        </Picker>
      </View>

      <View style={styles.mapContainer}>
        {grid.map((row, rowIndex) => (
          <View style={styles.row} key={rowIndex}>
            {row.map((cell, colIndex) => {
              let cellColor = 'white'; // Default cell color
              let label = '';

              // Assign colors based on cell type
              if (cell === 1) cellColor = 'lightgray'; // Corridor
              if (cell === 2) cellColor = 'lightgreen'; // Classroom
              if (cell === 3) cellColor = 'yellow'; // Washroom
              if (cell === 0) cellColor = 'orange'; // Door

              // Highlight path in red
              if (path.some((p) => p.row === rowIndex && p.col === colIndex)) {
                cellColor = 'red'; // Path color
              }

              // Highlight current position
              if (rowIndex === position.row && colIndex === position.col) {
                cellColor = 'blue'; // User's current position color
                label = 'You';
              } else {
                label = areaLabels[`${rowIndex}-${colIndex}`] || '';
              }

              return (
                <TouchableOpacity
                  key={colIndex}
                  style={[styles.cell, { backgroundColor: cellColor }]}>
                  <Text style={styles.cellText}>{label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f7f7f7',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  pickerContainer: {
    marginBottom: -30,
  },
  picker: {
    height: 50,
    width: 200,
  },
  mapContainer: {
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 40,
    height: 30,
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    fontSize: 10,
    color: '#000',
  },
});
