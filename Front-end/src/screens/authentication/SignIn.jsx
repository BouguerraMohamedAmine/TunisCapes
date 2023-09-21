import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  const handleSignIn = async () => {
    try {
      setIsLoading(true); // Show loading indicator

      const response = await axios.post('http://192.168.100.49:3000/users/login', {
        email,
        password,
      });

      setIsLoading(false); // Hide loading indicator

      if (response.status === 200) {
        // Successful login
        const userData = {
          email,
          password // Add other user data as needed
        };

        // Store user data in AsyncStorage
        await AsyncStorage.setItem('userData', JSON.stringify(userData));

        Alert.alert('Login Success', 'You are now logged in.', [
          {
            text: 'OK',
            onPress: () => {
              // Navigate to the Home screen
              navigation.navigate('Home');
            },
          },
        ]);
      } else {
        // Login failed
        Alert.alert('Login Failed', 'Invalid email or password.');
      }
    } catch (error) {
      setIsLoading(false); // Hide loading indicator

      // Network error or other issues
      console.error('Network error:', error);
      Alert.alert('Network Error', 'Unable to connect to the server. Please try again later.');
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={() => { /* Handle logo click */ }}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          style={styles.input}
        />
        <View style={styles.passwordInput}>
          <TextInput
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={!isPasswordVisible}
            style={styles.passwordField}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.passwordToggle}>
            <FontAwesome
              name={isPasswordVisible ? 'eye-slash' : 'eye'}
              size={16} // Adjust the size as needed
              color="#000"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleSignIn}>
          <View style={styles.button}>
            {isLoading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </View>
        </TouchableOpacity>

        <Text style={styles.connectWith}>Connect With</Text>

        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity onPress={() => { /* Handle Twitter click */ }}>
            <View style={styles.socialButton}>
              <Image
                source={require('../../../assets/images/X.png')}
                style={styles.socialButtonIcon}
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { /* Handle Facebook click */ }}>
            <View style={styles.socialButton}>
              <Image
                source={require('../../../assets/images/facebook.png')}
                style={styles.socialButtonIcon}
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { /* Handle Google click */ }}>
            <View style={styles.socialButton}>
              <Image
                source={require('../../../assets/images/google.png')}
                style={styles.socialButtonIcon}
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signInLink}>Not a member yet? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7757e0',
    paddingVertical: 80,
    flex: 1,
  },
  logoContainer: {
    marginHorizontal: -4,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems : "center",
    justifyContent : "center"
  },
  logo: {
    width: 160,
    height: 160,
    alignSelf: 'center',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 10,
    position: 'relative',
    marginHorizontal: 'auto',
    maxWidth: 525,
    overflow: 'hidden',
    borderRadius: 8,
    paddingVertical: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E9EDF4',
    width: '100%',
    borderRadius: 25,
    backgroundColor: '#FCFDFE',
    paddingVertical: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    color: 'black',
    marginBottom: 15,
  },
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E9EDF4',
    borderRadius: 25,
    backgroundColor: '#FCFDFE',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  passwordField: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  passwordToggle: {
    paddingHorizontal: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: 'primary',
    width: '50%',
    borderRadius: 25,
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '700',
  },
  connectWith: {
    marginBottom: 20,
    marginTop: 40,
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  socialButtonsContainer: {
    marginBottom: 90,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical : 30,
    marginHorizontal : 50
  },
  socialButton: {
    flex: 1,
    paddingHorizontal: 2,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    position: 'relative',
  },
  socialButtonIcon: {
    width: 50,
    height: 50,
  },
  signInLink: {
    paddingTop : 0 ,
    fontSize: 16,
    color: '#adadad',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default SignIn;
