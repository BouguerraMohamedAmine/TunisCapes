import React from 'react';
import { View, FlatList, Text, StyleSheet, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel'; // Import the Carousel component
import Lightbox from 'react-native-lightbox';
import Icon from 'react-native-vector-icons/EvilIcons'; // Replace with the icon library you installed


const SearchScreen = ({ route }) => {
  const { searchResults } = route.params;

  const allData = Object.keys(searchResults).reduce((accumulator, dataType) => {
    return accumulator.concat(searchResults[dataType]);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Lightbox>
        <Image source={{ uri: item }} style={styles.itemImage} />
      </Lightbox>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={allData}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>⦾ {item.name}</Text>
            <Text style={styles.itemDescription} numberOfLines={2}>
  {typeof item.description === 'string' ? item.description.split('\n').slice(0, 2).join('\n') : item.description}
</Text>
            {/* Render reviews */}
            <View style={styles.reviewsContainer}>
              {item.reviews.map((review) => (
                <View key={review._id} style={styles.reviewItem}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name="user" size={27} color="#454545" />
                  <Text style={styles.reviewUsername}>{review.username}</Text>
                </View>
                <Text style={styles.reviewRating}>Rating: {review.rating}</Text>
                <Text style={styles.reviewComment}>Comment: {review.comment}</Text>
              </View>
              ))}
            </View>
            {/* Render pictures if available */}
            {item.pictures && item.pictures.length > 0 && (
              <View style={styles.carouselContainer}>
                <Carousel
                  data={item.pictures}
                  renderItem={renderItem}
                  sliderWidth={300}
                  itemWidth={200}
                  layout={'default'}
                  loop={true}
                />
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop : 80
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 0,
    marginBottom: 16,
    marginHorizontal: 16,
    padding: 16,
    shadowColor: '#eee',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  itemName: {
    fontSize: 28,
    fontWeight: 'bold',
    textTransform:"capitalize",
    color: "#1F41BB",
    marginBottom: 12,
    fontFamily: 'YourCustomFont', // Replace with your custom font
    textShadowColor: '#000',
    textShadowRadius: 2,
  },
  itemDescription: {
    fontSize: 18,
    color: '#555',
    marginBottom: 12,
    fontFamily: 'YourCustomFont', // Replace with your custom font
    textShadowColor: '#000',
    textShadowRadius: 2,
  },
  reviewsContainer: {
    marginBottom: 16,
  },
  reviewsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    fontFamily: 'YourCustomFont', // Replace with your custom font
    textShadowColor: '#000',
    textShadowRadius: 2,
  },
  reviewItem: {
    marginBottom: 12,
  },
  reviewUsername: {
    fontSize: 15,
    fontWeight: '700',
    color: '#163753',
    fontFamily: 'sans-serif', // Replace with your custom font
  },
  reviewRating: {
    fontSize: 16,
    color: '#777',
    marginBottom: 4,
    fontFamily: 'YourCustomFont', // Replace with your custom font
    textShadowColor: '#000',
    textShadowRadius: 2,
  },
  reviewComment: {
    fontSize: 16,
    color: '#555',
    fontFamily: 'YourCustomFont', // Replace with your custom font
    textShadowColor: '#000',
    textShadowRadius: 2,
  },
  carouselContainer: {
    marginTop: 8,
    width:"100%"
  },
  imageContainer: {
    width:"100%",
    borderRadius: 12,
    overflow: 'hidden',
  },
  itemImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
});

export default SearchScreen;
