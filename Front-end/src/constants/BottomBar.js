import React , {useState} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const BottomBar = () => {
  const [activeUser, setActiveUser] = useState(null);


  const navigation = useNavigation();

  const openChat = () => {
    navigation.navigate('ChatScreen', { activeUser });
  };

  const openHome = () => {
    navigation.navigate('Home', { activeUser });
  };
  
  const openBlog = () => {
    navigation.navigate('Blog', { activeUser });
  };

  const openMapView = () => {
    navigation.navigate('Map', { activeUser });
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Home")}>
        <Image
          style={styles.icon}
          source={require('../../assets/home.png')} // Replace with your image path

        />
      
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={openChat}>
        <Image
          style={styles.icon}
          source={require('../../assets/inbox.png')} // Replace with your image path
        
        />
        
      </TouchableOpacity>
     
     
      <TouchableOpacity style={styles.button}  onPress={()=> navigation.navigate("Blog")}>
      <Image
        style={styles.iconBlog}
        source={require('../../assets/review.png')} // Replace with your image path
      />
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={openMapView}>
    <Image
      style={styles.icon}
      source={require('../../assets/map.png')} // Replace with your image path
    />
 
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
    backgroundColor:"#1F41BB",
    borderTopWidth: 1,
    borderTopColor: '#C5C5C7',
   /*  borderTopLeftRadius: 20, 
    borderTopRightRadius: 20,  */
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
    color: '#C5C5C7', // Set your icon color here
  },
  iconBlog : {
    width: 34, // Adjust as needed
    height: 34, // Adjust as needed
    marginBottom: 5,
    color: '#C5C5C7', // Set your icon color here
  },
  text: {
    fontSize: 12, // Adjust as needed
    color: 'white', // Set your text color here
  },
});

export default BottomBar;
