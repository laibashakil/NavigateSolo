// components/MapComponent.tsx
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

interface MapProps {
  grid: number[][];
  position: { row: number; col: number };
  path: { row: number; col: number }[];
  areaLabels: { [key: string]: string };
}

const MapComponent: React.FC<MapProps> = ({ grid, position, path, areaLabels }) => (
  <View style={styles.mapContainer}>
    {grid.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((cell, colIndex) => {
          let cellColor = getCellColor(cell, path, position, rowIndex, colIndex);
          let label = getCellLabel(position, rowIndex, colIndex, areaLabels);

          return (
            <TouchableOpacity key={colIndex} style={[styles.cell, { backgroundColor: cellColor }]}>
              <Text style={styles.cellText}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    ))}
  </View>
);

const getCellColor = (cell: number, path: { row: number; col: number }[], position: { row: number; col: number }, rowIndex: number, colIndex: number): string => {
  let cellColor = 'white'; // Default cell color
  if (cell === 1) cellColor = 'lightgray'; // Corridor
  else if (cell === 2) cellColor = 'lightgreen'; // Classroom
  else if (cell === 3) cellColor = 'yellow'; // Washroom
  else if (cell === 0) cellColor = 'orange'; // Door

  // Highlight path in red
  if (path.some((p) => p.row === rowIndex && p.col === colIndex)) {
    cellColor = 'red'; // Path color
  }

  // Highlight current position
  if (rowIndex === position.row && colIndex === position.col) {
    cellColor = 'blue'; // User's current position color
  }
  return cellColor;
};

const getCellLabel = (position: { row: number; col: number }, rowIndex: number, colIndex: number, areaLabels: { [key: string]: string }): string => {
  if (rowIndex === position.row && colIndex === position.col) {
    return 'You';
  }
  return areaLabels[`${rowIndex}-${colIndex}`] || '';
};

const styles = StyleSheet.create({
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

export default MapComponent;