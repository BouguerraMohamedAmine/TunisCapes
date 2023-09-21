import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, ScrollView } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function Profile({ navigation }) {
  // Sample data for traveler reviews or pictures
  const [likedPlaces, setLikedPlaces] = useState([
    { id: '1', name: 'Paris', imageUrl: require('../../../assets/images/beach.png') },
    { id: '2', name: 'Rome', imageUrl: require('../../../assets/images/camp.png') },
    { id: '3', name: 'Rome', imageUrl: require('../../../assets/images/camp.png') },
    { id: '4', name: 'Rome', imageUrl: require('../../../assets/images/camp.png') },
    { id: '5', name: 'Rome', imageUrl: require('../../../assets/images/camp.png') },
    { id: '7', name: 'Rome', imageUrl: require('../../../assets/images/camp.png') },

  ]);
  const [reviews, setReviews] = useState([
    {
      id: '1',
      username: 'JohnDoe',
      date: 'September 15, 2023',
      rating: 4.5,
      text: 'Had an amazing time in Paris. The Eiffel Tower is breathtaking!',
    },
    {
      id: '2',
      username: 'Traveler123',
      date: 'August 28, 2023',
      rating: 5.0,
      text: 'Rome is a must-visit destination. The history and culture are incredible!',
    },
    // Add more reviews as needed
  ]);


  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/images/left-arrow.png')} style={styles.backButton} />
        </TouchableOpacity>
      </View>

      {/* Profile Info */}
      <View style={styles.profileInfo}>
        <Image source={require('../../../assets/images/avatar.png')} style={styles.profileImage} />
        <View style={styles.profileDetails}>
        <Text style={styles.profileName}>username</Text>
        <Text style={styles.profileLocation}>hello</Text>
        </View>
      </View>

      {/* Liked Places */}
      <View style={styles.likedPlaces}>
        <Text style={styles.sectionTitle}>Liked Places</Text>
        <FlatList
          data={likedPlaces}
          keyExtractor={(item) => item.id}
          horizontal
          renderItem={({ item }) => (
            <View style={styles.likedPlaceItem}>
              <Image source={item.imageUrl} style={styles.likedPlaceImage} />
              <Text style={styles.likedPlaceName}>{item.name}</Text>
            </View>
          )}
        />
      </View>

      {/* Reviews and Pictures */}
      <View style={styles.reviewsContainer}>
      <Text style={styles.sectionTitle}>Reviews</Text>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reviewItem}>
            <Text style={styles.reviewUsername}>{item.username}</Text>
            <Text style={styles.reviewDate}>{item.date}</Text>
            <View style={styles.reviewRatingContainer}>
              <Text style={styles.reviewRating}>{item.rating}</Text>
              <Image
                source={require('../../../assets/images/camp.png')} // You can replace this with your star icon
                style={styles.starIcon}
              />
            </View>
            <Text style={styles.reviewText}>{item.text}</Text>
          </View>
        )}
      />
    </View>
  </ScrollView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    paddingTop: wp(2),
  },
  backButton: {
    height: wp(6),
    width: wp(6),
    marginTop: wp(10),

  },
  profileInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: wp(6),
    marginTop: wp(9),
  },
  profileImage: {
    height: wp(20),
    width: wp(20),
    borderRadius: wp(10),
    justifyContent : "flex-start"
  },
  profileDetails: {
    marginLeft: wp(5),
  },
  profileName: {
    fontSize: wp(5),
    fontWeight: 'bold',
  },
  profileLocation: {
    fontSize: wp(4),
    color: 'gray',
  },
  likedPlaces: {
    paddingHorizontal: wp(5),
    marginTop: wp(4),
  },
  sectionTitle: {
    fontSize: wp(5),
    fontWeight: 'bold',
    marginBottom: wp(4),
  },
  likedPlaceItem: {
    marginRight: wp(4),
  },
  likedPlaceImage: {
    height: wp(40),
    width: wp(40),
    borderRadius: wp(2),
    marginBottom: wp(2),
  },
  likedPlaceName: {
    fontSize: wp(4),
    color: 'gray',
  },
  reviewsContainer: {
    paddingHorizontal: wp(5),
    marginTop: wp(4),
  },
  reviewsContainer: {
    paddingHorizontal: wp(5),
    marginTop: wp(4),
  },
  sectionTitle: {
    fontSize: wp(5),
    fontWeight: 'bold',
    marginBottom: wp(4),
  },
  reviewItem: {
    marginBottom: wp(4),
  },
  reviewUsername: {
    fontSize: wp(4.5),
    fontWeight: 'bold',
  },
  reviewDate: {
    fontSize: wp(3.5),
    color: 'gray',
    marginBottom: wp(2),
  },
  reviewRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: wp(2),
  },
  reviewRating: {
    fontSize: wp(4),
    fontWeight: 'bold',
    marginRight: wp(1),
  },
  starIcon: {
    width: wp(4),
    height: wp(4),
    tintColor: 'gold', // Customize the color as needed
  },
  reviewText: {
    fontSize: wp(4),
    color: 'black',
  },
});
