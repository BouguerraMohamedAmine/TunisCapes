import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Assuming you're using React Navigation
import axios from 'axios';

function Success({ route }) {
  const navigation = useNavigation();
  const { payment_id } = route.params; // Get payment_id from navigation params
  const [check, setCheck] = useState('');

  useEffect(() => {
    axios
      .post(`http://localhost:5000/api/payment/${payment_id}`)
      .then((res) => {
        setCheck(res.data.result.status);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Handle navigation back to the previous screen or a different screen as needed
  const handleNavigation = () => {
    if (check === 'SUCCESS') {
      navigation.goBack(); // Go back to the previous screen
      // Alternatively, you can navigate to a different screen using navigation.navigate('ScreenName');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {check === 'SUCCESS' ? (
        <View style={{ padding: 20, backgroundColor: 'green' }}>
          <Text style={{ fontSize: 24, color: 'white' }}>Payment Successful</Text>
        </View>
      ) : (
        <View>
          {/* Handle unsuccessful payment */}
          <Text style={{ fontSize: 24 }}>Payment Unsuccessful</Text>
        </View>
      )}
      {check === 'SUCCESS' && (
        <Button title="Go Back" onPress={handleNavigation} />
        // Alternatively, you can navigate to a different screen here
      )}
    </View>
  );
}

export default Success;
