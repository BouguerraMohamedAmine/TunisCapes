import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import BottomBar from '../constants/BottomBar';

export default function Map() {
  const navigation = useNavigation();
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.80496251206666,
    longitude: -122.42864252166667,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markers, setMarkers] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    console.log(location.coords.latitude, location.coords.longitude);
  };

  const addMarker = (event) => {
    // Get the latitude and longitude of the long-pressed location
    const { latitude, longitude } = event.nativeEvent.coordinate;

    // Create a new marker at the long-pressed location
    const newMarker = {
      latitude,
      longitude,
      id: Date.now().toString(), // Assign a unique ID to the marker
    };

    // Add the new marker to the markers array
    setMarkers([...markers, newMarker]);
  };

  const removeMarker = (markerId) => {
    // Filter out the marker with the specified ID and update the markers array
    const updatedMarkers = markers.filter((marker) => marker.id !== markerId);
    setMarkers(updatedMarkers);
  };

  useEffect(() => {
    userLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion} onLongPress={addMarker}>
        {markers.map((marker, index) => (
          <Marker
            key={marker.id}
            coordinate={marker}
            title={`Marker ${index + 1}`}
            onPress={() => removeMarker(marker.id)} // Remove the marker when tMaped
          />
        ))}
      </MapView>
      <BottomBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '92%',
  },
});