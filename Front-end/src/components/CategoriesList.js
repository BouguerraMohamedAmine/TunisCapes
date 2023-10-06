import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { theme } from '../theme';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation from React Navigation
import axios from 'axios';
const Categories = () => {
  const [cities, setCities] = useState([]);
  const navigation = useNavigation(); // Initialize useNavigation
  const categoryCoverImages = {
    hotels: require('../../assets/images/_welcome.png'),
    seas: require('../../assets/images/_welcome.png'),
    mountains: require('../../assets/images/_welcome.png'),
    guesthouse: require('../../assets/images/_welcome.png'),
    museums: require('../../assets/images/_welcome.png'),
  };
  
  useEffect(() => {
    // Fetch cities data from your API using Axios
    axios
      .get('http://192.168.10.3:3000/cities')
    
      .then((response) => {
        // Assuming your API response contains an array of city objects
        const cityData = response.data;
        setCities(cityData);
      })
      .catch((error) => {
        console.error('Error fetching cities:', error);
      });
  }, []);

  const navigateToCategoriesList = () => {
    // Navigate to CategoriesList screen when "See all" is clicked
    navigation.navigate('CategoriesList', { cities }); // Pass data to CategoriesList if needed
  };

  const navigateToCategoryDetail = (city) => {
    // Navigate to CategoryDetail screen when a category image is clicked
    navigation.navigate('CategoryDetail', { city });
  };

  return (
    <View style={{ marginBottom: wp(4) }}>
      <View style={{ marginHorizontal: wp(5), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: wp(4), fontWeight: 'bold', color: theme.colors.neutral700 }}>Categories</Text>
        <TouchableOpacity onPress={navigateToCategoriesList}>
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
          <TouchableOpacity key={index} style={{ alignItems: 'center', marginRight: wp(4) }} onPress={() => navigateToCategoryDetail(city)}>
            {/* Use custom cover images based on the category */}
            <Image source={categoryCoverImages[city.categor]} style={{ width: wp(20), height: wp(19), borderRadius: wp(3) }} />
            <Text style={{ color: theme.colors.neutral700, fontSize: wp(3), fontWeight: '500', marginTop: wp(1) }}>
              {city.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Categories;
