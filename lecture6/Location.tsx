import React, { useState, useEffect, useCallback } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Device from 'expo-device';

const { width, height } = Dimensions.get('window');

const App: React.FC = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [region, setRegion] = useState<Region>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [pin, setPin] = useState<boolean>(false); // pin is dropped or not

  const onRegionChangeComplete = useCallback((newRegion: Region) => {
    setRegion(newRegion);
  }, []);

  const handleDropPin = useCallback(() => {
    // implement this
  }, []);

  useEffect(() => {
    const getLocationAsync = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMessage('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const newRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setRegion(newRegion);
      setLocation(location);
    };

    if (Platform.OS === 'android' && !Device.isDevice) {
      console.log(Device.isDevice);
      setErrorMessage('Oops, this will not work on Sketch in an Android emulator. Try it on your device!');
    } else {
      getLocationAsync();
    }
  }, []);

  const renderMap = () => {
    if (errorMessage) {
      return <Text style={styles.paragraph}>{errorMessage}</Text>;
    } else {
      return (
        // change this to include marker
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={onRegionChangeComplete}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      {renderMap()}
      <TouchableHighlight onPress={handleDropPin}>
        <Text>Drop Pin</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
  map: {
    width: width,
    height: height,
  },
});

export default App;
