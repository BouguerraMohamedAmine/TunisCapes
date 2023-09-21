import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Platform, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import Categories from '../components/categories';
import SortCategories from '../components/sortCategories';
import Destinations from '../components/destinations';

const ios = Platform.OS == 'ios';
const topMargin = ios ? 'mt-3' : 'mt-10';

  export default function HomeScreen({ navigation }) {
    // Function to navigate to the Profile screen
    const openProfile = () => {
      navigation.navigate('Profile');
    };
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* avatar */}
        <View style={{ marginHorizontal: wp(5), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: hp(2) }}>
        <Text style={{ fontSize: wp(7), fontWeight: 'bold', color: 'gray' }}>Let's Discover</Text>
        <TouchableOpacity onPress={openProfile}>
          <Image source={require('../../assets/images/avatar.png')} style={{ height: wp(12), width: wp(12) }} />
        </TouchableOpacity>
      </View>
        {/* search bar */}
        <View style={{ marginHorizontal: wp(5), marginBottom: hp(1) }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'lightgray', borderRadius: 50, paddingHorizontal: wp(4), paddingVertical: hp(1), marginRight: wp(2) }}>
            <MagnifyingGlassIcon size={20} strokeWidth={3} color="gray" />
            <TextInput
              placeholder='Search destination'
              placeholderTextColor={'gray'}
              style={{ flex: 1, fontSize: wp(4), marginLeft: wp(2), padding: 0 }}
            />
          </View>
        </View>

        {/* categories */}
        <View style={{ marginBottom: hp(2) }}>
          <Categories />
        </View>

        {/* sort categories */}
        <View style={{ marginBottom: hp(2) }}>
          <SortCategories />
        </View>

        {/* destinations */}
        <View>
          <Destinations />
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}
