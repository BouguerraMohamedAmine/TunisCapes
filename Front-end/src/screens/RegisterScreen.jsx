import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { Ionicons } from "@expo/vector-icons";
import AppTextInput from "../components/AppTextInput";
import { FontAwesome } from "@expo/vector-icons";
import { signUp } from '../../redux/action';
import { useDispatch } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import ImageUpload from "../screens/blog/ImageUpload.js"; // Make sure to adjust the path
import ImageUploadTwo from "../constants/ImageUploadTwo";

const RegisterScreen = () => {
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null); // Store the selected profile Image
  const navigation = useNavigation();
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };
  

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://192.168.100.46:3000/users', {
        username: userName,
        email,
        password,
        profileImage: profileImage, // Include the profile Image URL
      });
  
      if (response.status === 201) {
        Alert.alert('Registration Success', 'You can now sign in.');
  
        // Create userData object with relevant user information
        const userData = {
          _id: response.data._id, // Use the ID from the response
          username: userName,
          email: email,
          password: password,
          profileImage: profileImage, // Include the profile Image URL
        };
  
        // Dispatch the signUp action with the userData
        dispatch(signUp(userData));
  
        navigation.navigate('Home');
      } else {
        console.error('Registration failed:', response.statusText);
        Alert.alert('Registration Failed', 'Please try again.');
      }
    } catch (error) {
      console.error('Network error:', error);
      Alert.alert('Network Error', 'There was an error connecting to the server.');
    }
  };
  
  return (
    <SafeAreaView>
    <View
      style={{
        padding: wp(4),
        paddingVertical: hp(8),
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: wp(8),
          color: "#1F41BB",
          fontFamily: Font["sans-serif"],
          marginVertical: hp(2),
          fontWeight: "700",
          textTransform: "capitalize",
        }}
      >
        Create account
      </Text>
      <Text
        style={{
          fontFamily: Font["sans-serif"],
          fontSize: wp(4),
          maxWidth: "70%",
          textAlign: "center",
          fontWeight: "600",
        }}
      >
        Create an account to unlock the full Tunisian adventure.
      </Text>

     <View style={{ alignItems: 'center', paddingVertical:12 }}>
  <Text style={{
    textAlign: "center",
    fontSize: FontSize.small,
    color:'#626262'
  }}>
    Upload Profile Picture
  </Text>
</View>

  <ImageUploadTwo changeImage={(imageUri) => setProfileImage(imageUri)} />


      <View
        style={{
        /*   marginVertical: hp(1), */
          width: "100%",
          paddingHorizontal: wp(2),
        }}
      >
        <AppTextInput
          placeholder="Username"
          onChangeText={(text) => setUserName(text)}
          value={userName}
        />
        <AppTextInput
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <AppTextInput
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.passwordToggle}
        >
          <FontAwesome
            name={isPasswordVisible ? "eye" : "eye-slash"}
            size={wp(4)}
            color="#000"
          />
        </TouchableOpacity>
      </View>

  

      <TouchableOpacity
        onPress={handleSignUp}
        style={{
          padding: wp(2),
          backgroundColor: "#1F41BB",
          paddingVertical: hp(2), // Use heightPercentageToDP for responsiveness
      paddingHorizontal: wp(2), // Use widthPercentageToDP for responsiveness
      width: wp(48),
      marginVertical: hp(3),
      borderRadius: wp(5),
          shadowColor: "#1F41BB",
          shadowOffset: {
            width: 0,
            height: hp(1),
          },
          shadowOpacity: 0.3,
          shadowRadius: wp(4),
        }}
      >
        <Text
          style={{
            fontFamily: Font["sans-serif"],
            color: "#fff",
            textAlign: "center",
            fontSize: wp(5),
          }}
        >
          Sign Up
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={goToLogin}
        style={{
          padding: wp(4),
        }}
      >
        <Text
          style={{
            fontFamily: Font["sans-serif"],
            color: "#000",
            textAlign: "center",
            fontSize: wp(4),
            textDecorationLine: "underline",
          }}
        >
          Already have an account
        </Text>
      </TouchableOpacity>

      <View
        style={{
          marginVertical: hp(3),
        }}
      >
        <Text
          style={{
            fontFamily: Font["sans-serif"],
            color: "#1F41BB",
            textAlign: "center",
            fontSize: wp(4),
          }}
        >
          Or continue with
        </Text>

        <View
          style={{
            marginTop: hp(2), // Use heightPercentageToDP for responsiveness
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              padding: wp(2), // Use widthPercentageToDP for responsiveness
              backgroundColor: "#ECECEC",
              borderRadius: wp(2.5), // Use widthPercentageToDP for responsiveness
              marginHorizontal: wp(2), // Use widthPercentageToDP for responsiveness
            }}
          >
            <Ionicons
              name="logo-google"
              color={"#000"}
              size={wp(7)} // Use widthPercentageToDP for responsiveness
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: wp(2), // Use widthPercentageToDP for responsiveness
              backgroundColor: "#ECECEC",
              borderRadius: wp(2.5), // Use widthPercentageToDP for responsiveness
              marginHorizontal: wp(2), // Use widthPercentageToDP for responsiveness
            }}
          >
            <Ionicons
              name="logo-apple"
              color={"#000"}
              size={wp(7)} // Use widthPercentageToDP for responsiveness
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: wp(2), // Use widthPercentageToDP for responsiveness
              backgroundColor: "#ECECEC",
              borderRadius: wp(2.5), // Use widthPercentageToDP for responsiveness
              marginHorizontal: wp(2), // Use widthPercentageToDP for responsiveness
            }}
          >
            <Ionicons
              name="logo-facebook"
              color={"#000"}
              size={wp(7)} // Use widthPercentageToDP for responsiveness
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({

  passwordToggle: {
    position: "absolute",
    top: Spacing * 21.5,
    right: Spacing * 2,
  },
  passwordToggle2:  {
    position: "absolute",
    top: Spacing * 21.5,
    right: Spacing * 2,
  }
});