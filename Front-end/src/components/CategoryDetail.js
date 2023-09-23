// CategoryDetail.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import axios from 'axios';
import { theme } from '../theme';

const CategoryDetail = ({ route }) => {
  const { categoryName, endpoint } = route.params;
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    // Fetch category data from the provided endpoint
    axios
      .get(endpoint)
      .then((response) => {
        // Assuming your API response contains data related to the category
        const data = response.data;
        setCategoryData(data);
      })
      .catch((error) => {
        console.error(`Error fetching ${categoryName} data:`, error);
      });
  }, [categoryName, endpoint]);

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 16 }}>
        {categoryName}
      </Text>
      <FlatList
      data={categoryData}
      keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
      renderItem={({ item }) => (
    
          <View style={{ margin: 16 }}>
            <Image
              source={{ uri: item.image }} // Assuming your data has an image URL
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

export default CategoryDetail;