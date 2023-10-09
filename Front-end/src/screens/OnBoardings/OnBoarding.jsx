import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function OnBoarding() {
    const navigation = useNavigation();
    const [locationIndex, setLocationIndex] = useState(0);

    // Define the locations and their descriptions
    const locations = [
        {
            name: 'Sidi Bou Said, Tunis',
            desc: 'Sidi Bou Said is a picturesque coastal village known for its charming blue-and-white architecture, perched on the cliffs overlooking the Mediterranean Sea. It\'s a popular destination for its artistic ambiance and breathtaking views.',
            imageSource: require('../../../assets/sidibousaid.jpg')
        },
        {
            name: 'El Jem, Mahdia',
            desc: 'El Jem is home to one of the most well-preserved Roman amphitheaters in the world, often referred to as the "Tunisian Colosseum." This ancient city showcases Tunisia\'s rich history and is a UNESCO World Heritage Site.',
            imageSource: require('../../../assets/eljem.jpg')
        },
        {
            name: 'El Kasbah, El Kef',
            desc: 'El Kasbah in Kef is a historic fortress nestled in the hills of northwestern Tunisia. It stands as a testament to Tunisia\'s past, offering a glimpse into its cultural and architectural heritage.',
            imageSource: require('../../../assets/kasbah.jpg')
        },
        {
            name: 'The Great Mosque, Kairouan',
            desc: "Kairouan, Tunisia: Known as the City of 50 Mosques,Kairouan is a cultural hub with a rich Islamic heritage. Its Great Mosque, a UNESCO site, and historic medina offer a glimpse into Tunisia's religious and architectural legacy.",
            imageSource: require('../../../assets/kairouan.jpg')
        },
        {
            name: 'Sahara, Tozeur',
            desc: 'Tozeur is a desert oasis located in southwestern Tunisia. It is renowned for its unique architecture, especially the distinctive earthen buildings known as "ksour." Tozeur is a gateway to the Sahara Desert and offers opportunities for desert adventures, including camel treks and visits to nearby salt flats. The town is also famous for its date palm groves and the annual Tozeur International Oasis Festival.',
            imageSource: require('../../../assets/tozeur.jpg')
        }
    ];

    useEffect(() => {
        // Rotate through locations every 4 seconds
        const interval = setInterval(() => {
            setLocationIndex((prevIndex) => (prevIndex + 1) % locations.length);
        }, 4000);

        // Clear the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    const currentLocation = locations[locationIndex];

    return (
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            {/* Background image */}
            <Image
                source={currentLocation.imageSource}
                style={{ height: '100%', width: '100%', position: 'absolute' }}
            />

            {/* Content & gradient */}
            <View style={{ padding: 20}}>
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={{ width: wp('100%'), height: hp('60%'), position: 'absolute', bottom: 0 }}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                />
                <View style={{ marginBottom: 20 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: wp('10') }}>{currentLocation.name}</Text>
                    <Text style={{ color: '#ccc', fontWeight: 'bold', fontSize: wp('4') }}>{currentLocation.desc}</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("Welcome")} style={{ backgroundColor: '#fff', alignSelf: 'center', padding: 10, borderRadius: 50 }}>
                    <Text style={{ color: '#000', fontWeight: '600', fontSize: wp('3') }}>Let's go!</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
