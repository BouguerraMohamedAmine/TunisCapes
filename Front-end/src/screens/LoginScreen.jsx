import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert, ActivityIndicator
} from "react-native";
import React,  {useState} from "react";
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import axios from "axios";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { Ionicons } from "@expo/vector-icons";
import AppTextInput from "../components/AppTextInput";
import { FontAwesome } from "@expo/vector-icons";
import { login } from '../../redux/action';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const LoginScreen = () => {
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const goToRegister = () => {
    navigation.navigate('Register');
  };
  
const [isPasswordVisible, setPasswordVisibility] = useState(false);

const togglePasswordVisibility = () => {
  setPasswordVisibility(!isPasswordVisible);
};


const handleSignIn = async () => {
  try {
    setIsLoading(true);

    const authResponse = await axios.post('http://192.168.100.42:3000/users/login', {
      email,
      password,
    });

    setIsLoading(false);

    if (authResponse.status === 200) {
      const authToken = authResponse.data.token;
      const userEmail = email;

      const userResponse = await axios.get(`http://192.168.100.42:3000/users/email/${userEmail}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (userResponse.status === 200) {
        const userData = userResponse.data;
        
        // Set the user's name in the state
        setUserName(userData.username); // Use 'username' instead of 'name'
      
        dispatch(login(userData));
      
        Alert.alert('Login Success', `Welcome back, ${userData.username}! You are now logged in.`, [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Home');
            },
          },
        ]);
      } else {
        Alert.alert('Error', 'Failed to retrieve user data.');
      }
    } else {
      Alert.alert('Login Failed', 'Invalid email or password.');
    }
  } catch (error) {
    setIsLoading(false);
    console.error('Network error:', error);
    Alert.alert('Network Error', 'Unable to connect to the server. Please try again later.');
  }
};

  return (
    <SafeAreaView>
    <View
      style={{
        padding: wp(2), // Use widthPercentageToDP for responsiveness
        paddingVertical: hp(15), // Use heightPercentageToDP for responsiveness
      }}
    >
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: wp(8), // Use widthPercentageToDP for responsiveness
            color: "#1F41BB",
            fontFamily: Font["sans-serif"],
            marginVertical: hp(5), // Use heightPercentageToDP for responsiveness
            fontWeight: "700",
            textTransform: "capitalize",
          }}
        >
          Login here
        </Text>
        <Text
          style={{
            fontFamily: Font["sans-serif"],
            fontSize: wp(4), // Use widthPercentageToDP for responsiveness
            maxWidth: "70%",
            textAlign: "center",
            textTransform: "capitalize",
          }}
        >
          Welcome back you've been missed!
        </Text>
      </View>
      <View
        style={{
          marginVertical: hp(3),
          marginHorizontal: wp(3) 
        }}
      >
        <AppTextInput
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <AppTextInput
          placeholder="Password"
          secureTextEntry={!isPasswordVisible}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.passwordToggle}
        >
          <FontAwesome
            name={isPasswordVisible ? "eye" : "eye-slash"}
            size={wp(4)} // Use widthPercentageToDP for responsiveness
            color="#000"
          />
        </TouchableOpacity>
      </View>

      <View>
        <Text
          style={{
            fontFamily: Font["sans-serif"],
            fontSize: wp(3.5), // Use widthPercentageToDP for responsiveness
            color: "#1F41BB",
            alignSelf: "center",
          }}
        >
          Forgot your password ?
        </Text>
      </View>

   
      <View style={{ alignItems: 'center' }}>
  <TouchableOpacity
    onPress={handleSignIn}
    style={{
      padding: wp(2), // Use widthPercentageToDP for responsiveness
      backgroundColor: "#1F41BB",
      paddingVertical: hp(2), // Use heightPercentageToDP for responsiveness
      paddingHorizontal: wp(2), // Use widthPercentageToDP for responsiveness
      width: wp(48),
      marginVertical: hp(3), // Use heightPercentageToDP for responsiveness
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
    {isLoading ? (
      <ActivityIndicator color="white" size="small" />
    ) : (
      <Text
        style={{
          fontFamily: Font["sans-serif"],
          color: "#fff",
          textAlign: "center",
          fontSize: wp(5), // Use widthPercentageToDP for responsiveness
        }}
      >
        Sign In
      </Text>
    )}
  </TouchableOpacity>
</View>


      <TouchableOpacity
        onPress={goToRegister}
        style={{
          padding: wp(2), // Use widthPercentageToDP for responsiveness
        }}
      >
        <Text
          style={{
            fontFamily: Font["sans-serif"],
            color: "#000",
            textAlign: "center",
            fontSize: wp(4), // Use widthPercentageToDP for responsiveness
            textDecorationLine: "underline",
          }}
        >
          Create new account
        </Text>
      </TouchableOpacity>

      <View
        style={{
          marginVertical: hp(3), // Use heightPercentageToDP for responsiveness
        }}
      >
        <Text
          style={{
            fontFamily: Font["sans-serif"],
            color: "#1F41BB",
            textAlign: "center",
            fontSize: wp(3.5), // Use widthPercentageToDP for responsiveness
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

export default LoginScreen;


const styles = StyleSheet.create({

  passwordToggle: {
    position: "absolute",
    top: hp(15), // Use heightPercentageToDP for responsiveness
    right: wp(3), // Use widthPercentageToDP for responsiveness
  },
});