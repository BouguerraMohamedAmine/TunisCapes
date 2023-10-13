import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  TextInput,
  StyleSheet,
  Button,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
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
import EventSlider from './EventSlider';

const ios = Platform.OS == 'ios';


export default function HomeScreen() {
  const user = useSelector((state) => state.user);
  const navigation = useNavigation();
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://192.168.10.3:3000/search/${query}`);
      const data = await response.json();
      navigation.navigate('SearchScreen', { searchResults: data });
    } catch (error) {
      console.error(error);
    }
  };

  const navigateToEventList = () => {
    navigation.navigate('EventList');
  };

  const events = [
    {
      id: 1,
      name: 'The International Festival of Carthage 55th session',
      date: 'October 15, 2023',
      image: 'https://scontent.ftun15-1.fna.fbcdn.net/v/t1.6435-9/66426658_749045588847772_1171644521180561408_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=730e14&_nc_ohc=F4CYQrnwpDoAX-t8jqQ&_nc_ht=scontent.ftun15-1.fna&oh=00_AfDAuNqDjHVmwb-uWGKCaJx22ti6B3S0MZn4GCfetHMFcQ&oe=6544D5BF',
    },
    {
      id: 2,
      name: 'Sicca Jazz Festival | 8TH Edition- El Kef, Tunisia',
      date: 'November 5, 2023',
      image: 'https://siccajazz.siccaveneria.com/wp-content/uploads/2022/03/4-BONEY-FIELDS-scaled.jpg',
    },
    // Add more event objects as needed
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <Text style={styles.avatarText}>Tuniscapes</Text>
            {/* <Image source={require('../../assets/logo.png')} style={styles.logo} /> */}
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('WeatherScreen')}>
              <Image source={require('../../assets/weatherTwo.png')} style={styles.weatherIcon} />
            </TouchableOpacity>
            {user ? (
              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Image source={{ uri: user.profileImage }} style={styles.avatarImage} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.registerButton}>
                <Image source={require('../../assets/login.png')} style={styles.constIcon} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.input}
            placeholder="Find a match..."
            value={query}
            onChangeText={(text) => setQuery(text)}
          />
         {/*  <Button title="Search" onPress={handleSearch} /> */}
         <TouchableOpacity onPress={handleSearch}>
          <Image source={require('../../assets/search.png')} 
          style={styles.constIcon}/>
         </TouchableOpacity>
        </View>

        <View style={styles.categoriesContainer}>
          <Categories />
        </View>

       {/*  <View style={styles.sortCategoriesContainer}>
          <SortDestination />
        </View> */}

        <View style={styles.container}>
      {/* Use the EventSlider component with your event data */}
      <TouchableOpacity onPress={navigateToEventList}>
      <EventSlider events={events} />
      </TouchableOpacity>
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
    marginHorizontal: wp(7),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(2),
    marginTop: 40,
  },
  avatarText: {
    fontSize: wp(7),
    fontWeight: 'bold',
    color: '#C5C5C7',
    marginTop: ios ? 3 : 7,
  },
  avatarImage: {
    height: wp(10),
    width: wp(10),
    marginTop: ios ? 3 : 7,
    borderRadius: 25,
  },
  searchBarContainer: {
    marginHorizontal: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderColor:"#eee",
    borderWidth:1
  },
  input: {
    flex: 1,
    fontSize: wp(4),
    padding: 0,
    borderWidth: 1,
    borderColor: '#FAFAFA',
    borderRadius: 20,
    height: hp(5),
    marginLeft: 15,
    textAlign: 'center',
  },
  categoriesContainer: {
    marginBottom: hp(1),
    marginTop: 10,
  },
  sortCategoriesContainer: {
    marginBottom: hp(1),
  },
  destinationsContainer: {
    // Add your styles for the destinations container here
  },
  registerButton: {

    paddingVertical: Spacing * 2.5,
    borderRadius: Spacing,
    shadowColor: "#1F41BB",
    shadowOffset: {
      width: 0,
      height: Spacing,
    },
    shadowOpacity: 0.3,
    shadowRadius: Spacing,
  },
  registerButtonText: {
    fontFamily: Font['sans-serif'],
    color: "#fff",
    fontSize: 16,
    textAlign: 'center',
  },
  constIcon : {
    width: 26, height : 26, marginRight:20
  },
  searchIcon : { width:26, height:26 , marginLeft:15},

  weatherIcon : {
    width: 45, height : 45, marginRight:8
  },
  headerContainer: {
    marginHorizontal: hp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1),
   marginTop: hp(4)
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
 /*  logo : {
    width: 230
  } */
  container : {
    borderWidth : 0,
    borderColor: "#fff"
  }
});
