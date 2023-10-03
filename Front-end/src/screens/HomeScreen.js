import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  TextInput,
  StyleSheet
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Categories from '../components/categories';
import Spacing from '../constants/Spacing';
import Font from '../constants/Font';
import Colors from '../constants/Colors.jsx';
import SortDestination from '../components/sortDestinations';
import Destinations from '../components/destinations';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import BottomBar from '../constants/BottomBar';

const ios = Platform.OS == 'ios';

const colors = {
  lightGray: 'gray',
};

export default function HomeScreen() {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');

  const user = useSelector(state => state.user);

  // Function to navigate to the SearchComponent with the search query
  const handleSearch = () => {
    navigation.navigate('SearchScreen', { query });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>Let's Discover</Text>
          {user ? (
            <>
              <TouchableOpacity onPress={() => navigation.navigate('Profile', { activeUser })}>
                <Image source={{ uri: user.profileImage }} style={styles.avatarImage} />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity 
                onPress={() => navigation.navigate('Login')}
                style={styles.registerButton}
              >
                <Text style={styles.registerButtonText}>Register</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={query}
            onChangeText={text => setQuery(text)}
          />
          <TouchableOpacity 
            onPress={handleSearch}
            style={styles.searchButton}
          >
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoriesContainer}>
          <Categories />
        </View>
        
        <View style={styles.sortCategoriesContainer}>
          <SortDestination />
        </View>
        
        <View style={styles.destinationsContainer}>
          <Destinations />
        </View>
       
      </ScrollView>
      <View>
        <BottomBar />
      </View>
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
    marginTop: ios ? 3 : 10,
  },
  avatarImage: {
    height: wp(12),
    width: wp(12),
    marginTop: ios ? 3 : 10,
  },
  searchBarContainer: {
    marginHorizontal: wp(5),
    marginBottom: hp(1),
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    fontSize: wp(4),
    marginLeft: wp(2),
    padding: 0,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 50,
    height: hp(6),
  },
  searchButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing * 1.5,
    paddingHorizontal: Spacing * 2,
    borderRadius: Spacing,
    marginLeft: Spacing,
  },
  searchButtonText: {
    fontFamily: Font['sans-serif'],
    color: Colors.onPrimary,
    fontSize: 16,
    textAlign: 'center',
  },
  categoriesContainer: {
    marginBottom: hp(1),
    marginTop: 20,
  },
  sortCategoriesContainer: {
    marginBottom: hp(3),
  },
  destinationsContainer: {
    // Add your styles for the destinations container here
  },
  registerButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing * 1.5,
    paddingHorizontal: Spacing * 2,
    borderRadius: Spacing,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: Spacing,
    },
    shadowOpacity: 0.3,
    shadowRadius: Spacing,
  },
  registerButtonText: {
    fontFamily: Font['sans-serif'],
    color: Colors.onPrimary,
    fontSize: 16,
    textAlign: 'center',
  },
});
