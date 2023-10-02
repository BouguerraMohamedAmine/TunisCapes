
import React, { useState } from 'react';
import { View, TextInput, Button, Image, FlatList, Text, StyleSheet } from 'react-native';
import SearchResultsComponent from './SearchResultsComponent'; 
import Lightbox from 'react-native-lightbox';
import { useNavigation } from '@react-navigation/native';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);

  const navigation = useNavigation(); // Access the navigation object

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://192.168.10.4:3000/search/${query}`);
      const data = await response.json();
      setResults(data);

      // Navigate to SearchResultComponent with the search results
      navigation.navigate('SearchResultsComponent', { searchResults: data });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={handleSearch} />

      {results.cities && (
        <FlatList
          data={results.cities}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              {item.pictures && item.pictures.map((picture, picIndex) => (
                <View key={picIndex}>
                  <Lightbox>
                    <Image
                      source={{ uri: picture }}
                      style={styles.itemImage}
                    />
                  </Lightbox>
                </View>
              ))}
            </View>
          )}
        />
      )}

      {results.restaurants && (
        <FlatList
          data={results.restaurants}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.cuisine}</Text>
              <Text style={styles.itemDescription}>{item.price}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              {item.pictures && item.pictures.map((picture, picIndex) => (
                <View key={picIndex}>
                  <Lightbox>
                    <Image
                      source={{ uri: picture }}
                      style={styles.itemImage}
                    />
                  </Lightbox>
                </View>
              ))}
            </View>
          )}
        />
      )}

      {results.hotels && (
        <FlatList
          data={results.hotels}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              {item.pictures && item.pictures.map((picture, picIndex) => (
                <View key={picIndex}>
                  <Lightbox>
                    <Image
                      source={{ uri: picture }}
                      style={styles.itemImage}
                    />
                  </Lightbox>
                </View>
              ))}
            </View>
          )}
        />
      )}

      {results.deserts && (
        <FlatList
          data={results.deserts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              {item.pictures && item.pictures.map((picture, picIndex) => (
                <View key={picIndex}>
                  <Lightbox>
                    <Image
                      source={{ uri: picture }}
                      style={styles.itemImage}
                    />
                  </Lightbox>
                </View>
              ))}
            </View>
          )}
        />
      )}

      {results.events && (
        <FlatList
          data={results.events}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>Time: {item.time}</Text>
              <Text style={styles.itemDescription}>Contact: {item.contact}</Text>

              <FlatList
                data={item.pictures}
                keyExtractor={(pic, picIndex) => picIndex.toString()}
                horizontal
                renderItem={({ item: picture, index: picIndex }) => (
                  <View key={picIndex} style={{ marginRight: 8 }}>
                    <Lightbox>
                      <Image
                        source={{ uri: picture }}
                        style={styles.itemImage}
                      />
                    </Lightbox>
                  </View>
                )}
              />
            </View>
          )}
        />
      )}
      {results.maisonHotes && (
        <FlatList
          data={results.maisonHotes}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              {item.pictures && item.pictures.map((picture, picIndex) => (
                <View key={picIndex}>
                  <Lightbox>
                    <Image
                      source={{ uri: picture }}
                      style={styles.itemImage}
                    />
                  </Lightbox>
                </View>
              ))}
            </View>
          )}
        />
      )}

      {results.monuments && (
        <FlatList
          data={results.monuments}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              {item.pictures && item.pictures.map((picture, picIndex) => (
                <View key={picIndex}>
                  <Lightbox>
                    <Image
                      source={{ uri: picture }}
                      style={styles.itemImage}
                    />
                  </Lightbox>
                </View>
              ))}
            </View>
          )}
        />
      )}

      {results.mountains && (
        <FlatList
          data={results.mountains}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              {item.pictures && item.pictures.map((picture, picIndex) => (
                <View key={picIndex}>
                  <Lightbox>
                    <Image
                      source={{ uri: picture }}
                      style={styles.itemImage}
                    />
                  </Lightbox>
                </View>
              ))}
            </View>
          )}
        />
      )}

      {results.museums && (
        <FlatList
          data={results.museums}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              {item.pictures && item.pictures.map((picture, picIndex) => (
                <View key={picIndex}>
                  <Lightbox>
                    <Image
                      source={{ uri: picture }}
                      style={styles.itemImage}
                    />
                  </Lightbox>
                </View>
              ))}
            </View>
          )}
        />
      )}

      {results.seas && (
        <FlatList
          data={results.seas}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              {item.pictures && item.pictures.map((picture, picIndex) => (
                <View key={picIndex}>
                  <Lightbox>
                    <Image
                      source={{ uri: picture }}
                      style={styles.itemImage}
                    />
                  </Lightbox>
                </View>
              ))}
            </View>
          )}
        />
      )}

{results && <SearchResultsComponent searchResults={results} />}
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
    width: '100%',
    height: 240,
    borderRadius: 8, 
    resizeMode: 'cover',
    marginBottom: 12, 
  },
});

export default SearchComponent;
