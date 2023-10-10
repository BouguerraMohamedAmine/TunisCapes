import React from 'react';
import { View, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function QRCodeGenerator({ data }) {
  return (
    <View>
      <QRCode
        value={data} // Data to encode into QR code
        size={200} // Size of the QR code
      />
    </View>
  );
}
