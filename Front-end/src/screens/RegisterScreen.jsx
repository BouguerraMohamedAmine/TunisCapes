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

import ImageUpload from "../screens/blog/ImageUpload.js"; // Make sure to adjust the path

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
      const response = await axios.post('http://192.168.10.3:3000/users', {
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
          padding: Spacing * 2,
          paddingVertical: Spacing * 5
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: FontSize.xLarge,
              color: "#1F41BB",
              fontFamily: Font["sans-serif"],
              marginVertical: Spacing * 3,
              fontWeight:"700",
              textTransform:"capitalize"
            }}
          >
            Create account
          </Text>
          <Text
            style={{
              fontFamily: Font["sans-serif"],
              fontSize: FontSize.small,
              maxWidth: "80%",
              textAlign: "center",
              fontWeight:"600"
            }}
          >
           Create an account to unlock the full Tunisian adventure.
          </Text>
        </View>
        <View
          style={{
            marginVertical: Spacing * 3,
          }}
        >
          <AppTextInput placeholder="Username" 
           onChangeText={(text) => setUserName(text)}
           value={userName}
           />
          <AppTextInput placeholder="Email" 
          onChangeText={(text) => setEmail(text)}
          value={email}/>
          <AppTextInput placeholder="Password"
             onChangeText={(text) => setPassword(text)}
             value={password}
          secureTextEntry={!isPasswordVisible} />
          <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.passwordToggle}
            >
              <FontAwesome
                name={isPasswordVisible ?  "eye" : "eye-slash"}
                size={16}
                color="#000"
              />
            </TouchableOpacity>
        </View>

        {/* Add the ImageUpload component to select a profile Image */}
        <ImageUpload changeImage={(imageUri) => setProfileImage(imageUri)} />

        <TouchableOpacity
        onPress={handleSignUp}
          style={{
            padding: Spacing * 2,
            backgroundColor: "#1F41BB",
            marginVertical: Spacing * 3,
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
              textAlign: "center",
              fontSize: FontSize.large,
            }}
          >
            Sign up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={goToLogin}
          style={{
            padding: Spacing,
          }}
        >
          <Text
            style={{
              fontFamily: Font["sans-serif"],
              color: "#000",
              textAlign: "center",
              fontSize: FontSize.small,
              textDecorationLine:"underline"
            }}
          >
            Already have an account
          </Text>
        </TouchableOpacity>

        <View
          style={{
            marginVertical: Spacing * 3,
          }}
        >
          <Text
            style={{
              fontFamily: Font["sans-serif"],
              color: "#1F41BB",
              textAlign: "center",
              fontSize: FontSize.small,
            }}
          >
            Or continue with
          </Text>

          <View
            style={{
              marginTop: Spacing,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                padding: Spacing,
                backgroundColor: "#ECECEC",
                borderRadius: Spacing / 2,
                marginHorizontal: Spacing,
              }}
            >
              <Ionicons
                name="logo-google"
                color={"#000"}
                size={Spacing * 2}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: Spacing,
                backgroundColor: "#ECECEC",
                borderRadius: Spacing / 2,
                marginHorizontal: Spacing,
              }}
            >
              <Ionicons
                name="logo-apple"
                color={"#000"}
                size={Spacing * 2}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: Spacing,
                backgroundColor: "#ECECEC",
                borderRadius: Spacing / 2,
                marginHorizontal: Spacing,
              }}
            >
              <Ionicons
                name="logo-facebook"
                color={"#000"}
                size={Spacing * 2}
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