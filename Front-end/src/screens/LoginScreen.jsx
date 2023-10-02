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

    const authResponse = await axios.post('http://192.168.100.45:3000/users/login', {
      email,
      password,
    });

    setIsLoading(false);

    if (authResponse.status === 200) {
      const authToken = authResponse.data.token;
      const userEmail = email;

      const userResponse = await axios.get(`http://192.168.100.45:3000/users/email/${userEmail}`, {
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
              color: Colors.primary,
              fontFamily: Font["sans-serif"],
              marginVertical: Spacing * 5,
              fontWeight:"700",
              textTransform:"capitalize"
            }}
          >
            Login here
          </Text>
          <Text
            style={{
              fontFamily: Font["sans-serif"],
              fontSize: FontSize.large,
              maxWidth: "70%",
              textAlign: "center",
              textTransform:"capitalize"
            }}
          >
            Welcome back you've been missed!
          </Text>
        </View>
        <View
          style={{
            marginVertical: Spacing * 3,
          }}
        >
          <AppTextInput placeholder="Email" 
           onChangeText={(text) => setEmail(text)}
           value={email}
           />
          <AppTextInput placeholder="Password" 
          secureTextEntry={!isPasswordVisible}
          onChangeText={(text) => setPassword(text)}
          value={password}
           />
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

        <View>
          <Text
            style={{
              fontFamily: Font["sans-serif"],
              fontSize: FontSize.small,
              color: Colors.primary,
              alignSelf: "center",
            }}
          >
            Forgot your password ?
          </Text>
        </View>

        <TouchableOpacity
        onPress={handleSignIn}
          style={{
            padding: Spacing * 2,
            backgroundColor: Colors.primary,
            marginVertical: Spacing * 3,
            borderRadius: Spacing,
            shadowColor: Colors.primary,
            shadowOffset: {
              width: 0,
              height: Spacing,
            },
            shadowOpacity: 0.3,
            shadowRadius: Spacing,
          }}
        >
          {isLoading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text  style={{
                fontFamily: Font["sans-serif"],
                color: Colors.onPrimary,
                textAlign: "center",
                fontSize: FontSize.large,
              }}>Sign In</Text>
            )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={goToRegister}
          style={{
            padding: Spacing,
          }}
        >
          <Text
            style={{
              fontFamily: Font["sans-serif"],
              color: Colors.text,
              textAlign: "center",
              fontSize: FontSize.small,
              textDecorationLine:"underline"
            }}
          >
            Create new account
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
              color: Colors.primary,
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
                backgroundColor: Colors.gray,
                borderRadius: Spacing / 2,
                marginHorizontal: Spacing,
              }}
            >
              <Ionicons
                name="logo-google"
                color={Colors.text}
                size={Spacing * 2}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: Spacing,
                backgroundColor: Colors.gray,
                borderRadius: Spacing / 2,
                marginHorizontal: Spacing,
              }}
            >
              <Ionicons
                name="logo-apple"
                color={Colors.text}
                size={Spacing * 2}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: Spacing,
                backgroundColor: Colors.gray,
                borderRadius: Spacing / 2,
                marginHorizontal: Spacing,
              }}
            >
              <Ionicons
                name="logo-facebook"
                color={Colors.text}
                size={Spacing * 2}
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
    top: Spacing * 12.5,
    right: Spacing * 2,
  },
});