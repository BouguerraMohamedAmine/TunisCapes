import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';

const GuideList = ({ navigation }) => {
  const [guides, setGuides] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.10.3:3000/guide');
      setGuides(response.data);
    } catch (error) {
      console.error('Error fetching guide data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleGuideSelect = (guide) => {
    navigation.navigate('ChatScreen', { guide });
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <FlatList
        data={guides}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleGuideSelect(item)}
            style={[styles.card, { width: screenWidth - 32 }]}
          >
            <View style={styles.cardHeader}>
              <Image source={{ uri: item.ProfileImage }} style={styles.avatar} />
              <View style={styles.info}>
                <Text style={styles.name}>Name: {item.name}</Text>
                <Text style={styles.location}>Location: {item.location}</Text>
                <Text style={styles.phone}>Phone: {item.phoneNumber}</Text>

              </View>
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.languages}>Languages: {item.languagesSpoken}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
    paddingTop : 50 
  },
  card: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    marginBottom: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  phone: {
    fontSize: 16,
    color: 'black',
  },
  languages: {
    fontSize: 14,
    color: 'blue',
  },
});

export default GuideList;
