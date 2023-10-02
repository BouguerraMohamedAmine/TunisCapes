import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { HeartIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

export default function Destinations() {
  const navigation = useNavigation();
  const [destinationData, setDestinationData] = useState([]);

  useEffect(() => {
    // Fetch city data from your API
    fetch('http://192.168.100.50:3000/cities') // Replace with your actual API URL

      .then((response) => response.json())
      .then((data) => setDestinationData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <View className="mx-4 flex-row justify-between flex-wrap">
      {destinationData.map((item, index) => {
        return <DestinationCard navigation={navigation} item={item} key={index} />;
      })}
    </View>
  );
}

const DestinationCard = ({ item, navigation }) => {
  const [isFavourite, toggleFavourite] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Destination', { ...item })}
      style={{ width: wp(44), height: wp(65) }}
      className="flex justify-end relative p-4 py-6 space-y-2 mb-5"
    >
      {/* Update the following lines to display city data */}
      <Image source={{ uri: item.pictures[0] }} style={{ width: wp(44), height: wp(65), borderRadius: 35 }} className="absolute" />

      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={{ width: wp(44), height: hp(15), borderBottomLeftRadius: 35, borderBottomRightRadius: 35 }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        className="absolute bottom-0"
      />

      <TouchableOpacity
        onPress={() => toggleFavourite(!isFavourite)}
        style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}
        className="absolute top-1 right-3 rounded-full p-3"
      >
        <HeartIcon size={wp(5)} color={isFavourite ? 'red' : 'white'} />
      </TouchableOpacity>

      <Text style={{ fontSize: wp(6) }} className="text-white font-semibold capitalize">
        {item.name}
      </Text>
      <Text style={{ fontSize: wp(2.2) }} className="text-white">
  {item.description?.length > 50
    ? `${item.description.substring(0, 50)}...`
    : item.description}
</Text>
    </TouchableOpacity>
  );
}
