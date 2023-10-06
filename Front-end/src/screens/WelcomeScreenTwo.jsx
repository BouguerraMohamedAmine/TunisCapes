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
      <View style={{paddingVertical: Spacing * 7}}>
        <ImageBackground
          style={{
            height: height / 2.5,
            
          }}
          resizeMode="contain"
          source={require("../../assets/images/welcome-img.png")}
        />
        <View
          style={{
            paddingHorizontal: Spacing * 4,
            paddingTop: Spacing * 6,
          }}
        >
          <Text
            style={{
              fontSize: FontSize.xxLarge,
              color: "#1F41BB",
              fontFamily: Font["sans-serif"],
              textAlign: "center",
              fontWeight: "800",
              textTransform: "capitalize"
            }}
          >
            Discover the Beauty of Tunisia 
          </Text>

          <Text
            style={{
              fontSize: FontSize.small,
              color: "#000",
              fontFamily: Font["sans-serif"],
              textAlign: "center",
              marginTop: Spacing * 2,
            }}
          >
            Unveil Tunisia's Splendor: Your Journey Begins Here.
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: Spacing * 2,
            paddingTop: Spacing * 6,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={goToLogin}
            style={{
              backgroundColor: "#1F41BB",
              paddingVertical: Spacing * 1.5,
              paddingHorizontal: Spacing * 2,
              width: "48%",
              borderRadius: Spacing,
              shadowColor: "#1F41BB",
              shadowOffset: {
                width: 0,
                height: Spacing,
              },
              shadowOpacity: 0.3,
              shadowRadius: Spacing,
            }}
          >
            <Text
              style={{
                fontFamily: Font["sans-serif"],
                color: "#fff",
                fontSize: FontSize.large,
                textAlign: "center",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={goToRegister}
            style={{
              paddingVertical: Spacing * 1.5,
              paddingHorizontal: Spacing * 2,
              width: "48%",
              borderRadius: Spacing,
            }}
          >
            <Text
              style={{
                fontFamily: Font["sans-serif"],
                color: "#000",
                fontSize: FontSize.large,
                textAlign: "center",
              }}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>
         {/*  Skip Registration and Login */}
         <TouchableOpacity
            onPress={skip}
            style={{
              padding: Spacing * 2,
              paddingVertical: Spacing * 6
            }}
          >
            <Text
              style={{
                fontFamily: Font["sans-serif"],
                color: "#000",
                fontSize: FontSize.large,
                textAlign: "center"
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
