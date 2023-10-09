import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
const { height } = Dimensions.get("window");
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const WelcomeScreenTwo = ({ navigation }) => {

  const goToRegister = () => {
  
    navigation.navigate('Register');
  };

  const goToLogin = () => {

    navigation.navigate('Login');
  };
  
  const skip = () => {

    navigation.navigate('Home');
  };

  return (
    <SafeAreaView>
      <View style={{ paddingVertical: hp(12) }}>
        <ImageBackground
          style={{
            height: hp(40), // Use heightPercentageToDP for responsiveness
          }}
          resizeMode="contain"
          source={require("../../assets/images/welcome-img.png")}
        />
        <View
          style={{
            paddingHorizontal: wp(4), // Use widthPercentageToDP for responsiveness
            paddingTop: hp(6), // Use heightPercentageToDP for responsiveness
          }}
        >
          <Text
            style={{
              fontSize: wp(7), // Use widthPercentageToDP for responsiveness
              color: "#1F41BB",
              fontFamily: Font["sans-serif"],
              textAlign: "center",
              fontWeight: "800",
              textTransform: "capitalize",
            }}
          >
            Discover the Beauty of Tunisia
          </Text>

          <Text
            style={{
              fontSize: wp(3.5), // Use widthPercentageToDP for responsiveness
              color: "#000",
              fontFamily: Font["sans-serif"],
              textAlign: "center",
              marginTop: hp(2), // Use heightPercentageToDP for responsiveness
            }}
          >
            Unveil Tunisia's Splendor: Your Journey Begins Here.
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: wp(5), // Use widthPercentageToDP for responsiveness
            paddingTop: hp(6), // Use heightPercentageToDP for responsiveness
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={goToLogin}
            style={{
              backgroundColor: "#1F41BB",
              paddingVertical: hp(2), // Use heightPercentageToDP for responsiveness
              paddingHorizontal: wp(2), // Use widthPercentageToDP for responsiveness
              width: wp(48), // Use widthPercentageToDP for responsiveness
              borderRadius: wp(5), // Use widthPercentageToDP for responsiveness
              shadowColor: "#1F41BB",
              shadowOffset: {
                width: 0,
                height: hp(1), // Use heightPercentageToDP for responsiveness
              },
              shadowOpacity: 0.3,
              shadowRadius: wp(5), // Use widthPercentageToDP for responsiveness
            }}
          >
            <Text
              style={{
                fontFamily: Font["sans-serif"],
                color: "#fff",
                fontSize: wp(4), // Use widthPercentageToDP for responsiveness
                textAlign: "center",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={goToRegister}
            style={{
              paddingVertical: hp(2), // Use heightPercentageToDP for responsiveness
              paddingHorizontal: wp(2), // Use widthPercentageToDP for responsiveness
              width: wp(48), // Use widthPercentageToDP for responsiveness
              borderRadius: wp(5), // Use widthPercentageToDP for responsiveness
            }}
          >
            <Text
              style={{
                fontFamily: Font["sans-serif"],
                color: "#000",
                fontSize: wp(4), // Use widthPercentageToDP for responsiveness
                textAlign: "center",
              }}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>
        {/* Skip Registration and Login */}
        <TouchableOpacity
          onPress={skip}
          style={{
            padding: wp(2), // Use widthPercentageToDP for responsiveness
            paddingVertical: hp(6), // Use heightPercentageToDP for responsiveness
          }}
        >
          <Text
            style={{
              fontFamily: Font["sans-serif"],
              color: "#000",
              fontSize: wp(4), // Use widthPercentageToDP for responsiveness
              textAlign: "center",
            }}
          >
            Skip
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreenTwo;

const styles = StyleSheet.create({});
