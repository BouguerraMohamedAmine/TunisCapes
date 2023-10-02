import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert
} from "react-native";
import React , {useState } from "react";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { Ionicons } from "@expo/vector-icons";
import AppTextInput from "../components/AppTextInput";
import { FontAwesome } from "@expo/vector-icons";
import { signUp } from '../../redux/action';
import { useDispatch } from 'react-redux';

const RegisterScreen = () => {
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const goToLogin = () => {
  
    navigation.navigate('Login');
  };
  
    
const [isPasswordVisible, setPasswordVisibility] = useState(false);

const togglePasswordVisibility = () => {
  setPasswordVisibility(!isPasswordVisible);
};


const handleSignUp = async () => {
  try {
    const response = await axios.post('http://192.168.10.5:3000/users', {
      username: userName,
      email,
      password,
    });

    if (response.status === 201) {
      Alert.alert('Registration Success', 'You can now sign in.');
      
      // Create userData object with relevant user information
      const userData = {
        username: userName,
        email: email,
        // Add other user data if needed
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

        <TouchableOpacity
        onPress={handleSignUp}
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
          <Text
            style={{
              fontFamily: Font["sans-serif"],
              color: Colors.onPrimary,
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
              color: Colors.text,
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
