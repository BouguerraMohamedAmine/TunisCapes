import * as React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Colors from "../constants/Colors";
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreenTwo from "../screens/WelcomeScreenTwo";
import DestinationScreen from "../screens/DestinationScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import OnBoarding1 from "../screens/onboarding/Onboarding1";
import OnBoarding2 from "../screens/onboarding/Onboarding2";
import OnBoarding3 from "../screens/onboarding/Onboarding3";
import Profile from "../screens/Profile/Profile";
import ChatScreen from "../screens/ChatScreen";
import CategoriesList from "../components/CategoriesList";
import CategoryDetail from "../components/CategoryDetail";
import Categories from "../components/categories";
import ItemDetail from "../components/ItemDetail";
import Blog from "../screens/blog/blog";
import UserContext from '../screens/blog/UserContext'; // Import your UserContext
import Map from "../screens/Map";
import WeatherScreen from '../screens/WeatherScreen'
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
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreenTwo} />
        <Stack.Screen name="Destination" component={DestinationScreen} />
        <Stack.Screen name="OnBoarding1" component={OnBoarding1} />
        <Stack.Screen name="OnBoarding2" component={OnBoarding2} />
        <Stack.Screen name="OnBoarding3" component={OnBoarding3} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="CategoriesList" component={CategoriesList} />
        <Stack.Screen name="CategoryDetail" component={CategoryDetail} />
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="ItemDetail" component={ItemDetail} />
        <Stack.Screen name="Blog" component={Blog} />
        <Stack.Screen name="UserContext " component={UserContext } />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="WeatherScreen" component={WeatherScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
