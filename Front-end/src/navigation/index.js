import * as React from 'react';
import { DefaultTheme , NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Colors from '../constants/Colors';
import HomeScreen from '../screens/HomeScreen';
/* import WelcomeScreen from '../screens/WelcomeScreen'; */
/* import Welcome from '../screens/WelcomeScreen.jsx' */
import DestinationScreen from '../screens/DestinationScreen';
/* import SignIn from '../screens/authentication/SignIn'
import SignUp from '../screens/authentication/SignUp'; */
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import OnBoarding1 from '../screens/onboarding/Onboarding1'
import OnBoarding2 from '../screens/onboarding/Onboarding2'
import OnBoarding3 from '../screens/onboarding/Onboarding3'
import Profile from '../screens/Profile/Profile'
import ChatScreen from '../screens/ChatScreen';
import WelcomeScreenTwo from '../screens/WelcomeScreenTwo';
const Stack = createNativeStackNavigator();

function AppNavigation() {

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Colors.background,
    },
  };
  
  return (
    <NavigationContainer theme={theme}>
      
      <Stack.Navigator initialRouteName='Welcome' screenOptions={{headerShown: false}}>

      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreenTwo} />
        <Stack.Screen name="Destination" component={DestinationScreen} />
        <Stack.Screen name="OnBoarding1" component={OnBoarding1}  />
        <Stack.Screen name="OnBoarding2" component={OnBoarding2}  />
        <Stack.Screen name="OnBoarding3" component={OnBoarding3}  />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="BottomBar" component={ChatScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;