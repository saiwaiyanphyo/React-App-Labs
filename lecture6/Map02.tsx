import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Region } from 'react-native-maps';

// Get device dimensions
const { width, height } = Dimensions.get('window');

// Functional component for the App
const App: React.FC = () => {
  // Define the state using the useState hook
  const [region, setRegion] = useState<Region>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Callback for region change
  const onRegionChangeComplete = (region: Region) => {
    setRegion(region);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={onRegionChangeComplete}
      />
      <View style={styles.container}>
        <Text>
          Latitude: {region.latitude}
          {'\n'}
          Longitude: {region.longitude}
          {'\n'}
          LatitudeDelta: {region.latitudeDelta}
          {'\n'}
          LongitudeDelta: {region.longitudeDelta}
        </Text>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    width: width,
    height: Math.floor(height * 2 / 3),
  },
});

export default App;
