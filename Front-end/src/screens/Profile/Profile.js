import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, ScrollView } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function Profile({ navigation }) {
  // Sample data for traveler reviews or pictures
  const [likedPlaces, setLikedPlaces] = useState([
    { id: '1', name: 'Paris', imageUrl: require('../../../assets/images/beach.png') },
    { id: '2', name: 'Rome', imageUrl: require('../../../assets/images/camp.png') },
    // Add more liked places as needed
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
        <Text style={styles.sectionTitle}>Reviews and Pictures</Text>
        {/* Add your reviews or pictures here */}
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
    marginTop: wp(8),

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
});
