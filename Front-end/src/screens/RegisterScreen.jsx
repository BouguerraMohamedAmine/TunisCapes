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
  Switch,
  ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import AppTextInput from "../components/AppTextInput";
import { FontAwesome } from "@expo/vector-icons";
import { signUp } from '../../redux/action';
import { useDispatch } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import ImageUploadTwo from "../constants/ImageUploadTwo";

const RegisterScreen = () => {
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [isGuide, setIsGuide] = useState(false);
  const [guideData, setGuideData] = useState({
    name: '',
    location: '',
    phoneNumber: '',
    languagesSpoken: '',
    email: '', // Add email field for guide
    password: '', // Add password field for guide
    username: '', // Add username field for guide
    // Add other necessary requirements fields here
  });

  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  const handleUserTypeChange = () => {
    setIsGuide(!isGuide);
  };

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignUp = async () => {
    try {
      let userData = {
        username: userName,
        email,
        password,
        profileImage,
      };

      if (isGuide) {
        userData.userType = "Guide";
        userData.guideData = {
          name: guideData.name,
          location: guideData.location,
          phoneNumber: guideData.phoneNumber,
          languagesSpoken: guideData.languagesSpoken,
          email: guideData.email,
          password: guideData.password,
          username: guideData.username,
          profileImage : guideData.profileImage
          // Add other necessary requirements fields for guide here
        };

        // Send a POST request to the guide registration route
        const guideResponse = await axios.post('http://192.168.10.4:3000/guide/register', userData.guideData);

        if (guideResponse.status !== 201) {
          console.error('Guide registration failed:', guideResponse.statusText);
          Alert.alert('Guide Registration Failed', 'Please try again.');
          return;
        }
      } else {
        userData.userType = "User";
      }

      // Send a POST request to the user registration route
      const response = await axios.post('http://192.168.10.4:3000/users', userData);

      if (response.status === 201) {
        Alert.alert('Registration Success', 'You can now sign in.');

        const userData = {
          _id: response.data._id,
          username: userName,
          email: email,
          password: password,
          profileImage: profileImage,
          userType: isGuide ? "Guide" : "User",
          guideData: isGuide ? guideData : null,
        };

        dispatch(signUp(userData));

        navigation.navigate('Home');
      } else {
        console.error('User registration failed:', response.statusText);
        Alert.alert('User Registration Failed', 'Please try again.');
      }
    } catch (error) {
      console.error('Network error:', error);
      Alert.alert('Network Error', 'There was an error connecting to the server.');
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
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

          <View style={{ alignItems: 'center', paddingVertical: 12 }}>
            <Text style={{
              textAlign: "center",
              fontSize: FontSize.small,
              color: '#626262'
            }}>
              Upload Profile Picture
            </Text>
          </View>

          <ImageUploadTwo changeImage={(imageUri) => setProfileImage(imageUri)} />

          <View
            style={{
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

            <View style={styles.userTypeContainer}>
              <Text style={styles.userTypeLabel}>
                {isGuide ? "Guide" : "User"}
              </Text>
              <Switch
                value={isGuide}
                onValueChange={handleUserTypeChange}
              />
            </View>

            {isGuide && (
              <View style={styles.guideFieldsContainer}>
                <AppTextInput
                  placeholder="Guide Specialization"
                  onChangeText={(text) => setGuideData({ ...guideData, name: text })}
                  value={guideData.name}
                />
                <AppTextInput
                  placeholder="Location"
                  onChangeText={(text) => setGuideData({ ...guideData, location: text })}
                  value={guideData.location}
                />
                <AppTextInput
                  placeholder="Phone Number"
                  onChangeText={(text) => setGuideData({ ...guideData, phoneNumber: text })}
                  value={guideData.phoneNumber}
                />
                <AppTextInput
                  placeholder="Languages Spoken"
                  onChangeText={(text) => setGuideData({ ...guideData, languagesSpoken: text })}
                  value={guideData.languagesSpoken}
                />
                {/* Add other necessary requirements fields for guide here */}
              </View>
            )}
          </View>

          <TouchableOpacity
            onPress={handleSignUp}
            style={styles.signUpButton}
          >
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={goToLogin}
            style={styles.loginLink}
          >
            <Text style={styles.loginLinkText}>
              Already have an account? Login here.
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    padding: wp(4),
    paddingVertical: hp(8),
    alignItems: "center",
  },
  title: {
    fontSize: wp(8),
    color: "#1F41BB",
    fontFamily: Font["sans-serif"],
    marginVertical: hp(2),
    fontWeight: "700",
    textTransform: "capitalize",
  },
  subtitle: {
    fontFamily: Font["sans-serif"],
    fontSize: wp(4),
    maxWidth: "70%",
    textAlign: "center",
    fontWeight: "600",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: hp(2),
  },
  toggleLabel: {
    fontSize: FontSize.small,
    color: '#626262',
  },
  fieldsContainer: {
    width: "100%",
    paddingHorizontal: wp(2),
  },
  passwordToggle: {
    position: "absolute",
    top: Spacing * 21.5,
    right: Spacing * 2,
  },
  userTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: hp(2),
  },
  userTypeLabel: {
    fontSize: FontSize.small,
    color: '#626262',
  },
  userTypeButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: wp(2),
  },
  userTypeButton: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    borderRadius: wp(2),
    borderWidth: 1,
    borderColor: "#1F41BB",
    marginHorizontal: wp(1),
  },
  userTypeButtonText: {
    fontSize: wp(4),
    color: "#1F41BB",
  },
  activeUserType: {
    backgroundColor: "#1F41BB",
    borderColor: "#1F41BB",
  },
  guideFieldsContainer: {
    // Add styles for guide-specific fields container
  },
  signUpButton: {
    padding: wp(2),
    backgroundColor: "#1F41BB",
    paddingVertical: hp(2),
    paddingHorizontal: wp(2),
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
  },
  signUpButtonText: {
    fontFamily: Font["sans-serif"],
    color: "#fff",
    textAlign: "center",
    fontSize: wp(5),
  },
  loginLink: {
    padding: wp(4),
  },
  loginLinkText: {
    fontFamily: Font["sans-serif"],
    color: "#000",
    textAlign: "center",
    fontSize: wp(4),
    textDecorationLine: "underline",
  },
});
