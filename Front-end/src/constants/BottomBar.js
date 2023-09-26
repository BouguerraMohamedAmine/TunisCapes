import React , {useState} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const BottomBar = () => {
  const [activeUser, setActiveUser] = useState(null);


  const navigation = useNavigation();
  const openProfile = () => {
    navigation.navigate('Profile', { activeUser });
  };

  const openChat = () => {
    navigation.navigate('ChatScreen', { activeUser });
  };

  const openHome = () => {
    navigation.navigate('Home', { activeUser });
  };
  
  const openBlog = () => {
    navigation.navigate('Blog', { activeUser });
  };

  const openMap = () => {
    navigation.navigate('Map', { activeUser });
  };



  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Home")}>
        <Image
          style={styles.icon}
          source={require('../../assets/home.png')} // Replace with your image path

        />
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={openChat}>
        <Image
          style={styles.icon}
          source={require('../../assets/inbox.png')} // Replace with your image path
          onPress={()=> navigation.navigate("ChatScreen")}
        />
        <Text style={styles.text}>Inbox</Text>
      </TouchableOpacity>
     
      <TouchableOpacity style={styles.button} onPress={openProfile}>
        <Image
          style={styles.icon}
          source={require('../../assets/profile.png')} // Replace with your image path
          onPress={()=> navigation.navigate("Profile")}
        />
        <Text style={styles.text}>Profile</Text>

      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={openBlog}>
      <Image
        style={styles.icon}
        source={require('../../assets/review.png')} // Replace with your image path
        onPress={()=> navigation.navigate("Blog")}
      />
      <Text style={styles.text}>Blog</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={Map}>
    <Image
      style={styles.icon}
      source={require('../../assets/map.png')} // Replace with your image path
      onPress={()=> navigation.navigate("Map")}
    />
    <Text style={styles.text}>Map</Text>
  </TouchableOpacity>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70, // Adjust as needed
    backgroundColor: '#2596be',
    borderTopWidth: 1,
    borderTopColor: 'gray',
    borderTopLeftRadius: 20, // Adjust the radius as needed
    borderTopRightRadius: 20, // Adjust the radius as needed
    overflow: 'hidden', // Ensure
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    backgroundColor: 'transparent', // Set your background color here
  },
  icon: {
    width: 30, // Adjust as needed
    height: 30, // Adjust as needed
    marginBottom: 5,
    color: 'gray', // Set your icon color here
  },
  text: {
    fontSize: 12, // Adjust as needed
    color: 'white', // Set your text color here
  },
});

export default BottomBar;
