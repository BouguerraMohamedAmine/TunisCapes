import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './src/screens/authentication/SignIn'; // Import your SignIn component
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './src/screens/HomeScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import OnBoarding2 from './src/screens/onboarding/Onboarding2';
import OnBoarding1 from './src/screens/onboarding/Onboarding1';
import OnBoarding3 from './src/screens/onboarding/Onboarding3';
import DestinationScreen from './src/screens/DestinationScreen';
import SignUp from './src/screens/authentication/SignUp';
import Profile from './src/screens/Profile/Profile';
import ChatScreen from './src/screens/ChatScreen';

const Stack = createStackNavigator();

const App = () => {
  const [initialUser, setInitialUser] = useState(null);

  // Retrieve user data from AsyncStorage on app launch
  useEffect(() => {
    async function fetchUserData() {
      try {
        const userDataJSON = await AsyncStorage.getItem('userData');
        if (userDataJSON) {
          const userData = JSON.parse(userDataJSON);
          setInitialUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchUserData();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {initialUser ? (
          // If initialUser exists, navigate to the Home screen
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        ) : (
          // Otherwise, navigate to the SignIn screen
          <Stack.Screen name="SignIn" component={SignIn} />
        )}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Destination" component={DestinationScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="OnBoarding1" component={OnBoarding1}  />
        <Stack.Screen name="OnBoarding2" component={OnBoarding2}  />
        <Stack.Screen name="OnBoarding3" component={OnBoarding3}  />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
              </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
