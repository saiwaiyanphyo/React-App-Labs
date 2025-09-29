import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface StocksButtonProps {
  code: string;
  name: string;
  onPress: (code: string, name: string) => void;
}

const StocksButton: React.FC<StocksButtonProps> = ({ code, name, onPress }) => {
  const handlePress = () => {
    onPress(code, name);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text>{code}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
    height: 50,
    width: 100,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
  },
});

export default StocksButton;