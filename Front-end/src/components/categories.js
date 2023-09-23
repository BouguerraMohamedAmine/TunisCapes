import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { theme } from '../theme';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();

  const categoryData = [
    {
      name: 'hotels',
      coverImage: require('../../assets/images/_welcome.png'),
      endpoint: 'http://192.168.100.49:3000/hotels',
    },
    {
      name: 'seas',
      coverImage: require('../../assets/images/_welcome.png'),
      endpoint: 'http://192.168.100.49:3000/seas',
    },
    {
      name: 'mountains',
      coverImage: require('../../assets/images/_welcome.png'),
      endpoint: 'http://192.168.100.49:3000/mountains',
    },
    {
      name: 'guesthouse',
      coverImage: require('../../assets/images/_welcome.png'),
      endpoint: 'http://192.168.100.49:3000/guesthouse',
    },
    {
      name: 'museums',
      coverImage: require('../../assets/images/_welcome.png'),
      endpoint: 'http://192.168.100.49:3000/museums',
    },
  ];
  
  useEffect(() => {
    // Fetch category data (custom images and endpoints) from categoryData
    setCategories(categoryData);
  }, []);

  const navigateToCategoryDetail = (category) => {
    // Make a request to the collection endpoint for the selected category
    axios
      .get(category.endpoint)
      .then((response) => {
        // Assuming your API response contains data related to the selected category
        const categoryData = response.data;
        // Navigate to the CategoriesList screen with the category data
        navigation.navigate('CategoriesList', { categoryData });
      })
      .catch((error) => {
        console.error(`Error fetching ${category.name} data:`, error);
      });
  };

  return (
    <View style={{ marginBottom: wp(4) }}>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: wp(5) }}
        style={{ marginTop: wp(2) }}
        showsHorizontalScrollIndicator={false}
      >
        {categories.map((category, index) => (
          <TouchableOpacity key={index} style={{ alignItems: 'center', marginRight: wp(4) }} onPress={() => navigateToCategoryDetail(category)}>
            {/* Use custom cover images based on the category */}
            <Image source={category.coverImage} style={{ width: wp(20), height: wp(19), borderRadius: wp(3) }} />
            <Text style={{ color: theme.colors.neutral700, fontSize: wp(3), fontWeight: '500', marginTop: wp(1) }}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Categories;
