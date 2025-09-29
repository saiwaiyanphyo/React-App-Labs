import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';

// Get device dimensions
const { width, height } = Dimensions.get('window');

// Marker type definition
interface MarkerData {
  latlng: {
    latitude: number;
    longitude: number;
  };
  title: string;
  description: string;
}

// Functional component for the App
const App: React.FC = () => {
  // Define state for the region and markers
  const [region, setRegion] = useState<Region>({
    latitude: 13.764884,
    longitude: 100.538265,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  const [markers] = useState<MarkerData[]>([
    {
      latlng: { latitude: 13.764884, longitude: 100.538265 },
      title: 'Victory Monument',
      description: 'A large military monument in Bangkok, Thailand.',
    },
    {
      latlng: { latitude: 13.763681, longitude: 100.538125 },
      title: 'Saxophone Club',
      description: 'A music pub for saxophone lovers.',
    },
    {
      latlng: { latitude: 13.764595, longitude: 100.537438 },
      title: 'Coco Department Store',
      description: 'A fashion department store.',
    },
  ]);

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
      >
        {markers.map((marker, i) => (
          <Marker
            key={i}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
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
