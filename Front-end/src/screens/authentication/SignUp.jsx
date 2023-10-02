import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';

const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://192.168.100.45:3000/users', {
        username: userName,
        email,
        password,
      });

      if (response.status === 201) {
        Alert.alert('Registration Success', 'You can now sign in.');
        navigation.navigate('SignIn');
      } else {
        console.error('Registration failed:', response.statusText);
        Alert.alert('Registration Failed', 'Please try again.');
      }
    } catch (error) {
      console.error('Network error:', error);
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
          placeholder="Username"
          onChangeText={(text) => setUserName(text)}
          value={userName}
          style={styles.input}
        />
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

        <TouchableOpacity onPress={handleSignUp}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
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

        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.signInLink}>Sign In</Text>
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
    width: 200,
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
    color: '#000',
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
    color: '#000',
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
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
  },
  connectWith: {
    marginBottom: 15,
    marginTop: 20,
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
    height: 44,
    width: '100%',
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
    color: 'white',
    textDecorationLine: 'underline',
    marginTop: 10,
    fontSize: 16,
    alignContent : "center",
    textAlign : "center"
  },
});

export default SignUp;
