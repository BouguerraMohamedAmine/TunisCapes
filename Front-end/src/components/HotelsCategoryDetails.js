// hotelsCategoryDetails.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import axios from 'axios';
import { theme } from '../theme';

const HotelsCategoryDetails = ({ route }) => {
  const { categoryData } = route.params;
  const [hotelsData, setHotelsData] = useState([]);

  useEffect(() => {
    // Fetch hotels data from the provided endpoint in categoryData
    axios.get(categoryData.endpoint)
      .then((response) => {
        // Assuming your API response contains an array of hotel data
        const hotelsData = response.data;
        setHotelsData(hotelsData);
      })
      .catch((error) => {
        console.error('Error fetching hotels data:', error);
      });
  }, [categoryData]);

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 16}}>
        Hotels in {categoryData.name}
      </Text>
      <FlatList
        data={hotelsData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ margin: 16 }}>
            <Image
              source={{ uri: item.image }} // Assuming your hotel data has an image URL
              style={{ width: 200, height: 100, borderRadius: 10 }}
            />
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 8 }}>
              {item.name}
            </Text>
            <Text style={{ fontSize: 14, color: theme.colors.neutral700, marginTop: 4 }}>
              {item.description}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default HotelsCategoryDetails;
