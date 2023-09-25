import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import * as Location from 'expo-location';

export default function LocationComponent() {
  const [location, setLocation] = useState();
  const [address, setAddress] = useState('');

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      console.log("Location:");
      console.log(currentLocation);
    };
    getPermissions();
  }, []);

  const geocode = async () => {
    const geocodedLocation = await Location.geocodeAsync(address);
    console.log("Geocoded Address:");
    console.log(geocodedLocation);
  };

  const reverseGeocode = async () => {
    const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
      longitude: location.coords.longitude,
      latitude: location.coords.latitude
    });

    console.log("Reverse Geocoded:");
    console.log(reverseGeocodedAddress);
  };

  return (
    <View>
      <TextInput
        placeholder='Address'
        value={address}
        onChangeText={setAddress}
      />
      <Button title="Geocode Address" onPress={geocode} />
      <Button title="Reverse Geocode Current Location" onPress={reverseGeocode} />
    </View>
  );
}
