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
      endpoint: 'http://192.168.100.49:3000/moun',
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
    {
      name: 'monuments',
      coverImage: require('../../assets/images/_welcome.png'),
      endpoint: 'http://192.168.100.49:3000/monuments',
    },
  ];

  const navigateToCategoryDetail = (category) => {
    navigation.navigate('CategoryDetail', {
      categoryName: category.name,
      endpoint: category.endpoint,
    });
  };
  
  useEffect(() => {
    // Fetch category data (custom images and endpoints) from categoryData
    setCategories(categoryData);
  }, []);

  return (
    <View style={{ marginBottom: wp(4) }}>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: wp(5) }}
        style={{ marginTop: wp(2) }}
        showsHorizontalScrollIndicator={false}
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={{ alignItems: 'center', marginRight: wp(4) }}
            onPress={() => navigateToCategoryDetail(category)}
          >
            {/* Use custom cover images based on the category */}
            <Image
              source={category.coverImage}
              style={{ width: wp(20), height: wp(19), borderRadius: wp(3) }}
            />
            <Text
              style={{
                color: theme.colors.neutral700,
                fontSize: wp(3),
                fontWeight: '500',
                marginTop: wp(1),
              }}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Categories;
