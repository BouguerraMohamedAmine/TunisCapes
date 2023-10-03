import React from 'react';
import { View, Text } from 'react-native';

function Fail() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ padding: 20, backgroundColor: 'red' }}>
        <Text style={{ fontSize: 24, color: 'white' }}>Payment Failed</Text>
      </View>
    </View>
  );
}

export default Fail;
