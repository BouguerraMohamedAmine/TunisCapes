import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import DestinationScreen from '../screens/DestinationScreen';
import SignIn from '../screens/authentication/SignIn'
import SignUp from '../screens/authentication/SignUp';
import OnBoarding1 from '../screens/onboarding/Onboarding1'
import OnBoarding2 from '../screens/onboarding/Onboarding2'
import OnBoarding3 from '../screens/onboarding/Onboarding3'
import Profile from '../screens/Profile/Profile'
import ChatScreen from '../screens/ChatScreen';
import CategoriesList from '../components/CategoriesList';
import CategoryDetail from '../components/CategoryDetail'
import Categories from '../components/Categories';
const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome' screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Destination" component={DestinationScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn}  />
        <Stack.Screen name="OnBoarding1" component={OnBoarding1}  />
        <Stack.Screen name="OnBoarding2" component={OnBoarding2}  />
        <Stack.Screen name="OnBoarding3" component={OnBoarding3}  />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="CategoriesList" component={CategoriesList} />
        <Stack.Screen name="CategoryDetail" component={CategoryDetail} />
        <Stack.Screen name="Categories" component={Categories} />




      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;