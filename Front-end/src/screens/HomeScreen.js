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
import Colors from '../constants/Colors';
import SortDestination from '../components/sortDestinations';
import Destinations from '../components/destinations';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import BottomBar from '../constants/BottomBar';
import SearchResultsComponent from './SearchResultsComponent';
import axios from 'axios';

const ios = Platform.OS == 'ios';
const topMargin = ios ? 'mt-3' : 'mt-10';

const colors = {
  lightGray: 'gray',
};

export default function HomeScreen() {
  const navigation = useNavigation();
  const [activeUser, setActiveUser] = useState(null);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  const user = useSelector(state => state.user);

  useEffect(() => {
    // Simulated user authentication and data retrieval
    const simulatedUser = { username: 'JohnDoe', email: 'john@example.com' };
    setActiveUser(simulatedUser);
  }, []);

  // Function to navigate to the Profile screen
  const openProfile = () => {
    navigation.navigate('Profile', { activeUser });
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://192.168.10.4:3000/search/${query}`);
      setSearchResults(response.data);

      // Navigate to SearchResultComponent with the search results
      navigation.navigate('SearchResultsComponent', { searchResults: response.data });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>Let's Discover</Text>
          {user ? (
            <>
              <TouchableOpacity onPress={openProfile}>
                <Image source={require('../../assets/images/avatar.png')} style={styles.avatarImage} />
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
            onSubmitEditing={handleSearch}
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
       
        <View style={{ marginHorizontal: wp(5) }}>
          <SearchResultsComponent searchResults={searchResults} />
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
    // Add your styles for the destinations container here
  },
  searchBarContainer: {
    marginHorizontal: wp(5),
    marginBottom: hp(1),
  },
  searchInput: {
    fontSize: wp(4),
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 50,
  },
  searchButton: {
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

  searchButtonText: {
    fontFamily: Font["sans-serif"],
    color: Colors.onPrimary,
    fontSize: 16,
    textAlign: "center",
  },
  
});
