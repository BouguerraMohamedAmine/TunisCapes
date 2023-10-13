import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation(); // Get the navigation object

  useEffect(() => {
    // Define your API endpoint for fetching events
    const apiUrl = 'http://192.168.10.3:3000/events';

    // Fetch events from the API
    axios.get(apiUrl)
      .then((response) => {
        setEvents(response.data); // Assuming the response data is an array of events
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
        setLoading(false);
      });
  }, []);

  const handleQRCodeScan = () => {
    // Navigate to the QR code scan page
    navigation.navigate('EventBooking');
  };

  const handleEventPress = (eventId, eventName, book, token) => {
    // Navigate to the EventBooking component with the event ID, eventName, book, and token as parameters
    navigation.navigate('EventBooking', { eventId, eventName, book, token });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleEventPress(item._id, item.name, item.book, item.token)}>
      <View style={styles.eventItem}>
        <Image
          source={{ uri: item.picture }} // Access the 'picture' property as a URL
          style={styles.eventImage}
        />
        <Text style={styles.eventTitle}>{item.name}</Text>
        <Text style={styles.eventTime}>{item.time}</Text>
        <Text style={styles.eventContact}>{item.contact.toString()}</Text>
        {/* Add more event details here */}
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1F41BB" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventItem: {
    backgroundColor: '#ffffff',
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  eventImage: {
    width: '100%',
    height: 200, // Adjust the height as needed
    marginBottom: 8,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  eventDate: {
    fontSize: 16,
    color: '#888',
  },
  // Add more styles as needed
});

export default EventList;
