import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCodeGenerator from "../constants/QRCodeGenerator";

export default function EventBooking({ route }) {
  const { eventId, eventName, book, name } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>QR Code</Text>
      <Text style={styles.body}>Thank you for booking {eventName} by Tuniscapes</Text>
      <QRCodeGenerator data={`Event: ${eventName}, Book: ${book}, Name: ${name}`} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  body: {
    textTransform: "capitalize",
    fontWeight: 'bold', // Use 'bold' instead of 700
    paddingVertical: 20,
    color: "#1F41BB"
  }
});
