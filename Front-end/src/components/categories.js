import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { theme } from '../theme';
import axios from 'axios';

export default function Categories() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // Fetch cities data from your API using Axios
    axios.get('http://192.168.100.49:3000/cities')
      .then((response) => {
        // Assuming your API response contains an array of city objects
        const cityData = response.data;
        setCities(cityData);
      })
      .catch((error) => {
        console.error('Error fetching cities:', error);
      });
  }, []);

  return (
    <View style={{ marginBottom: wp(4) }}>
      <View style={{ marginHorizontal: wp(5), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: wp(4), fontWeight: 'bold', color: theme.colors.neutral700 }}>Categories</Text>
        <TouchableOpacity>
          <Text style={{ fontSize: wp(4), color: theme.colors.text }}>See all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: wp(5) }}
        style={{ marginTop: wp(2) }}
        showsHorizontalScrollIndicator={false}
      >
        {cities.map((city, index) => (
          <TouchableOpacity key={index} style={{ alignItems: 'center', marginRight: wp(4) }}>
            {/* Assuming city.image is the URL of the city's image */}
            <Image source={{ uri: city.pictures[0] }} style={{ width: wp(20), height: wp(19), borderRadius: wp(3) }} />
            <Text style={{ color: theme.colors.neutral700, fontSize: wp(3), fontWeight: '500', marginTop: wp(1) }}>
              {city.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
