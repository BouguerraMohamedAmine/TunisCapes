// SearchResultsComponent.js

import React, { useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { Animated } from 'react-native';

const SearchResultsComponent = ({ searchResults }) => {
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  }, []);

  if (!searchResults || typeof searchResults !== 'object') {
    return <Text>No results found.</Text>;
  }

  return (
    <Animated.ScrollView style={{ opacity }}>
      <ScrollView>
        {Object.keys(searchResults).map((category) => (
          <View key={category}>
            <Text style={styles.categoryTitle}>{category}</Text>
            {Array.isArray(searchResults[category]) && (
              <View>
                {searchResults[category].map((item, index) => (
                  <View key={index}>
                    <Text>{item.name}</Text>
                    {item.pictures && item.pictures.map((picture, picIndex) => (
                      <View key={picIndex}>
                        <Image
                          source={{ uri: picture }}
                          style={styles.image}
                        />
                        <Text>{item.description}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default SearchResultsComponent;
