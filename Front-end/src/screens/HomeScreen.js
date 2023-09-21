import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Platform, TextInput, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import Categories from '../components/categories';
import SortCategories from '../components/sortCategories';
import Destinations from '../components/destinations';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ios = Platform.OS == 'ios';
const topMargin = ios ? 'mt-3' : 'mt-10';

const colors = {
  lightGray: 'gray',
};

export default function HomeScreen() {
  const navigation = useNavigation();
  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    // Simulated user authentication and data retrieval
    const simulatedUser = { username: 'JohnDoe', email: 'john@example.com' };
    setActiveUser(simulatedUser);
  }, []);

  // Function to navigate to the Profile screen
  const openProfile = () => {
    navigation.navigate('Profile', { activeUser });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* avatar */}
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>Let's Discover</Text>
          <TouchableOpacity onPress={openProfile} >
            <Image source={require('../../assets/images/avatar.png')} style={styles.avatarImage} />
          </TouchableOpacity>
        </View>
        {/* search bar */}
        <View style={styles.searchBarContainer}>
          <View style={styles.searchInputContainer}>
            <MagnifyingGlassIcon size={20} strokeWidth={3} color="gray" />
            <TextInput
              placeholder='Search destination'
              placeholderTextColor={'gray'}
              style={styles.searchInput}
            />
          </View>
        </View>
        {/* categories */}
        <View style={styles.categoriesContainer}>
          <Categories />
        </View>
        {/* sort categories */}
        <View style={styles.sortCategoriesContainer}>
          <SortCategories />
        </View>
        {/* destinations */}
        <View style={styles.destinationsContainer}>
          <Destinations />
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ChatScreen")}
            style={styles.chatButton}
          >
            <Entypo name="chat" size={24} color={colors.lightGray} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    marginHorizontal: wp(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  avatarText: {
    fontSize: wp(7),
    fontWeight: 'bold',
    color: 'gray',
    marginTop: 50,
  },
  avatarImage: {
    height: wp(12),
    width: wp(12),
    marginTop: 50,
  },
  searchBarContainer: {
    marginHorizontal: wp(5),
    marginBottom: hp(1),
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    borderRadius: 50,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    marginRight: wp(2),
  },
  searchInput: {
    flex: 1,
    fontSize: wp(4),
    marginLeft: wp(2),
    padding: 0,
  },
  categoriesContainer: {
    marginBottom: hp(1),
    marginTop: 20,
  },
  sortCategoriesContainer: {
    marginBottom: hp(3),
  },
  destinationsContainer: {
    // Define your styles for destinations here
  },
  container: {
    // Define your common container styles here
  },
  chatButton: {
    // Define your chat button styles here
  },
});
