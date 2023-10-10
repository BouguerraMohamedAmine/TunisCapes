// QRCodeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCodeGenerator from "../constants/QRCodeGenerator";

export default function EventBooking({ route }) {
  const { eventId, eventName, book, name } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>QR Code</Text>
      <Text>Thank you you have booked {eventName} by Tuniscapes</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
  },
});
