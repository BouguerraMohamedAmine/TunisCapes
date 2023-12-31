import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { ClockIcon, HeartIcon, MapPinIcon, SunIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';

const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : 'mt-10';

export default function DestinationScreen(props) {
  const item = props.route.params;
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);

  // Default duration of 33 and add 2 hours
  const defaultDuration = 33;
  const updatedDuration = item.duration + 2;

  return (
    <View className="bg-white flex-1">
      {/* destination image */}
      <Image source={{ uri: item.pictures[0] }} style={{ width: wp(100), height: hp(55) }} />
      <StatusBar style={'light'} />

      {/* back button */}
      <SafeAreaView className={"flex-row justify-between items-center w-full absolute " + topMargin}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full ml-4"
          style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}
        >
          <ChevronLeftIcon size={wp(7)} strokeWidth={4} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleFavourite(!isFavourite)}
          className="p-2 rounded-full mr-4"
          style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}
        >
          <HeartIcon size={wp(7)} strokeWidth={4} color={isFavourite ? "red" : "white"} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* title & description & booking button */}
      <View style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }} className="px-5 flex flex-1 justify-between bg-white pt-8 -mt-14">
        <ScrollView showsVerticalScrollIndicator={false} className="space-y-5">
          <View className="flex-row justify-between items-start">
            <Text style={{ fontSize: wp(7) }} className="capitalize font-bold flex-1 text-neutral-700">
              {item?.name}
            </Text>
          </View>
          <Text style={{ fontSize: wp(3.7) }} className="text-neutral-700 tracking-wide mb-2">
            {item?.description}
          </Text>
          <View className="flex-row justify-between mx-1">
          <View className="flex-row space-x-2 items-start">
            <ClockIcon size={wp(7)} color="skyblue" />
            <View className="flex space-y-2">
              <Text style={{ fontSize: wp(4.5) }} className="font-bold text-neutral-700">
                2H
              </Text>
              <Text className="text-neutral-600 tracking-wide">Duration</Text>
            </View>
          </View>
          <View className="flex-row space-x-2 items-start">
            <MapPinIcon size={wp(7)} color="#f87171" />
            <View className="flex space-y-2">
              <Text className="text-neutral-600 tracking-wide">Distance</Text>
              <Text style={{ fontSize: wp(4.5) }} className="font-bold text-neutral-700">
                200 km
              </Text>
            </View>
          </View>
          <View className="flex-row space-x-2 items-start">
            <SunIcon size={wp(7)} color="orange" />
            <View className="flex space-y-2">
              <Text style={{ fontSize: wp(4.5) }} className="font-bold text-neutral-700">
                34°
              </Text>
              <Text className="text-neutral-600 tracking-wide">Sunny</Text>
            </View>
          </View>
        </View>
        </ScrollView>
      </View>
    </View>
  );
}
