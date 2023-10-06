import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';

const EventSlider = ({ events }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to increment the current index to display the next event
  const showNextEvent = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  useEffect(() => {
    const interval = setInterval(showNextEvent, 5000); // Change event every 5 seconds

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, [currentIndex]);

  // Function to split the event name into lines after 4 words
  const formatEventName = (eventName) => {
    const words = eventName.split(' ');
    const firstLine = words.slice(0, 4).join(' ');
    const secondLine = words.slice(4).join(' ');
    return `${firstLine}\n${secondLine}`;
  };

  const renderItem = ({ item }) => (
    <View style={styles.eventContainer}>
      <Image source={{ uri: item.image }} style={styles.eventImage} />
      <View style={styles.eventInfo}>
        <Text style={styles.eventName}>{formatEventName(item.name)}</Text>
        <Text style={styles.eventDate}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={[events[currentIndex]]} // Only display the current event
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  eventContainer: {
    backgroundColor: '#fff',
    borderWidth: 0, // Remove the border
    borderColor: 'transparent', // Remove the border color
    borderRadius:15,
marginVertical:15,
    padding: 10,
    width: 390,
    elevation: 2,
  },
  eventImage: {
    width: '100%',
    height: 100,
    borderRadius: 6,
    marginBottom: 8,
  },
  eventInfo: {
    alignItems: 'flex-start',
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'left', // Center-align the text
  },
  eventDate: {
    fontSize: 14,
    color: '#C5C5C7',
  },
});

export default EventSlider;
