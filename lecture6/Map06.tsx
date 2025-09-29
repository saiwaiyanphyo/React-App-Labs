import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  Image,
} from 'react-native';
import MapView, { Marker, Callout, Region } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

interface MarkerType {
  latlng: {
    latitude: number;
    longitude: number;
  };
  title: string;
  image: any;
  description: string;
  photo: any;
}

const App: React.FC = () => {
  const [region, setRegion] = useState<Region>({
    latitude: 13.764884,
    longitude: 100.538265,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  const [markers] = useState<MarkerType[]>([
    {
      latlng: { latitude: 13.764884, longitude: 100.538265 },
      title: 'Victory Monument',
      image: require('./images/attention.png'),
      description: 'A large military monument in Bangkok, Thailand.',
      photo: require('./images/Victory_Monument.jpg'),
    },
    {
      latlng: { latitude: 13.763681, longitude: 100.538125 },
      title: 'Saxophone Club',
      image: require('./images/music.png'),
      description: 'A music pub for saxophone lover',
      photo: require('./images/Saxophone.jpg'),
    },
    {
      latlng: { latitude: 13.764595, longitude: 100.537438 },
      title: 'COCO Department Store',
      image: require('./images/shopping.png'),
      description: 'A fashion department store',
      photo: require('./images/coco.jpg'),
    },
  ]);

  const onRegionChangeComplete = (region: Region) => {
    setRegion(region);
  };

  const moveMaptoLocation = useCallback((newRegion: Region) => {
    setRegion(newRegion);
  }, []);

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
            image={marker.image}
          >
            <Callout>
              <View style={styles.callout}>
                <Image style={styles.calloutPhoto} source={marker.photo} />
                <Text style={styles.calloutTitle}>{marker.title}</Text>
                <Text>{marker.description}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.container}>
        <View style={{ padding: 5 }}>
          <Button
            title="Victory Monument"
            onPress={() =>
              moveMaptoLocation({
                latitude: 13.764884,
                longitude: 100.538265,
                latitudeDelta: 0.002,
                longitudeDelta: 0.002,
              })
            }
          />
        </View>
        <View style={{ padding: 5 }}>
          <Button
            title="Saxophone Club"
            onPress={() =>
              moveMaptoLocation({
                latitude: 13.763681,
                longitude: 100.538125,
                latitudeDelta: 0.002,
                longitudeDelta: 0.002,
              })
            }
          />
        </View>
        <View style={{ padding: 5 }}>
          <Button
            title="Coco Department Store"
            onPress={() =>
              moveMaptoLocation({
                latitude: 13.764595,
                longitude: 100.537438,
                latitudeDelta: 0.002,
                longitudeDelta: 0.002,
              })
            }
          />
        </View>
      </View>
    </View>
  );
};

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
  callout: {
    flex: 1,
    paddingRight: 10,
    paddingBottom: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  calloutPhoto: {
    flex: 1,
    width: 166,
    height: 83,
  },
  calloutTitle: {
    fontSize: 16,
  },
});

export default App;
