import React, { useRef, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

const MultipleRefsExample: React.FC = () => {
  // State to store the values of the inputs
  const [inputValues, setInputValues] = useState<string[]>(['', '', '']);

  // Array of refs for TextInput fields
  const inputRefs = useRef<TextInput[]>([]);

  // Function to focus on the next input field
  const focusNext = (index: number) => {
    if (inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Function to log the value of all inputs
  const logValues = () => {
    inputValues.forEach((value, index) => {
      console.log(`Input ${index + 1} value:`, value);
    });
  };

  // Handler for text change in TextInput
  const handleTextChange = (text: string, index: number) => {
    const newValues = [...inputValues];
    newValues[index] = text;
    setInputValues(newValues);
  };

  return (
    <View style={styles.container}>
      {[0, 1, 2].map((_, index) => (
        <View key={index} style={styles.inputContainer}>
          <Text>Input {index + 1}</Text>
          <TextInput
            style={styles.input}
            ref={(el) => (inputRefs.current[index] = el!)} // Assign each TextInput ref
            onChangeText={(text) => handleTextChange(text, index)} // Update the corresponding state
            onSubmitEditing={() => focusNext(index)} // Focus on next input when done
            placeholder={`Enter value ${index + 1}`}
            value={inputValues[index]} // Bind value to state
          />
        </View>
      ))}

      <Button title="Log Values" onPress={logValues} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
});

export default MultipleRefsExample;
