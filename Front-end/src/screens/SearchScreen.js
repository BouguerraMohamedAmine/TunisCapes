import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, Button, Image } from 'react-native';
import Lightbox from 'react-native-lightbox';
import { useNavigation } from '@react-navigation/native';
import SearchResultsComponent from './SearchResultsComponent';

const SearchComponent = ({ route }) => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const { query } = route.params;
    setQuery(query);
    handleSearch(query);
  }, [route.params]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://192.168.100.45:3000/search/${query}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error(error);
    }
  };

  const allResults = [
    ...(results.cities || []),
    ...(results.deserts || []),
    ...(results.events || []),
    ...(results.hotels || []),
    ...(results.maisonhotes || []),
    ...(results.monuments || []),
    ...(results.mountains || []),
    ...(results.museums || []),
    ...(results.seas || []),
    ...(results.restaurants || []),
  ];

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={query}
        onChangeText={text => setQuery(text)}
      />
      <Button title="Search" onPress={handleSearch} />

      {allResults.length > 0 && (
        <FlatList
          data={allResults}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <View style={styles.imagesContainer}>
                {item.pictures && item.pictures.map((picture, picIndex) => (
                  <View key={picIndex} style={styles.imageContainer}>
                   
                      <Image
                        source={{ uri: picture }}
                        style={styles.itemImage}
                      />
                    
                  </View>
                ))}
              </View>
            </View>
          )}
        />
      )}

      {results.length > 0 && <SearchResultsComponent searchResults={results} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  itemDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
  },
  itemImage: {
    width: 100,
    height: 140,
    borderRadius: 8,
    resizeMode: 'cover',
    marginBottom: 12,
  },
  imagesContainer: {
    flexDirection: 'row', // Display images in a row
    justifyContent: 'space-between', // Add space between images
    alignItems: 'center', // Align images vertically
  },
  imageContainer: {
    flex: 1,
    marginRight: 15, // Add some space between images
  },
});

export default SearchComponent;
