import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { theme } from '../theme';

const CategoryDetail = ({ route, navigation }) => {
  const { categoryName, endpoint } = route.params;
  const [categoryData, setCategoryData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

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

  const handleItemPress = (item) => {
    setSelectedItem(item);
    navigation.navigate('ItemDetail', { item });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{categoryName}</Text>
      <FlatList
        data={categoryData}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleItemPress(item)} style={styles.gridItem}>
            <View style={styles.card}>
              <Image source={{ uri: item.pictures[0] }} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        numColumns={2} // Display two items per row (grid layout)
      />
      {selectedItem && <ItemDetail item={selectedItem} />}
    </View>
  );
};

const ItemDetail = ({ item }) => {
  return (
    <View style={styles.itemDetailContainer}>
      <Text style={styles.itemDetailTitle}>{item.name}</Text>
      <Image source={{ uri: item.pictures[0] }} style={styles.itemDetailImage} />
      <Text style={styles.itemDetailDescription}>{item.description}</Text>
      <Text style={styles.itemDetailPrice}>{item.price}dt</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  gridItem: {
    flex: 1,
    margin: 8,
  },
/*   card: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 0,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 2,
  }, */
  cardImage: {
    width: '100%',
    aspectRatio: 1, // Make the image square
    borderRadius: 35,
  },
  cardTitle: {
    fontSize: 25,
    fontWeight: '700',
    color:"#fff",
    margin: 8,
    position: "absolute",
    bottom:20
  },
  itemDetailContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  itemDetailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemDetailImage: {
    width: '100%',
    aspectRatio: 1, // Make the image square
    borderRadius: 10,
  },
  itemDetailDescription: {
    fontSize: 14,
    color: theme.colors.neutral700,
    marginVertical: 16,
  },
  itemDetailPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CategoryDetail;
