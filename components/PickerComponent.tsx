// components/PickerComponent.tsx
import React from 'react';
import { Text } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Correct import here

interface PickerProps {
  title: string;
  selectedValue: string;
  onValueChange: (itemValue: string) => void;
  options: { label: string; value: string }[];
}

const PickerComponent: React.FC<PickerProps> = ({ title, selectedValue, onValueChange, options }) => (
  <>
    <Text>{title}</Text>
    <Picker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      style={styles.picker}>
      {options.map((option) => (
        <Picker.Item key={option.value} label={option.label} value={option.value} />
      ))}
    </Picker>
  </>
);

const styles = {
  picker: {
    height: 50,
    width: 200,
  },
};

export default PickerComponent;