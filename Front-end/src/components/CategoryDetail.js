import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { theme } from '../theme';

const CategoryDetail = ({ route }) => {
  // Get the city data passed from the previous screen
  const { city } = route.params;

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        {/* Display the category image */}
        <Image source={{ uri: city.pictures[0] }} style={{ width: 200, height: 200, borderRadius: 10 }} />
        {/* Display the category name */}
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10 }}>{city.name}</Text>
      </View>

      {/* Additional category details */}
      <View style={{ paddingHorizontal: 20 }}>
        {/* Display more details about the category */}
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Category Details:</Text>
        <Text style={{ fontSize: 16 }}>{city.description}</Text>

        {/* Add more details or components to display additional information */}
      </View>
    </ScrollView>
  );
};

export default CategoryDetail;
