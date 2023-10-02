import React, { useState } from 'react';
import { View, Text, TextInput, Button, ImageBackground, Dimensions, SafeAreaView , Linking} from 'react-native';
import axios from 'axios';
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import Font from "../../constants/Font";
const { height } = Dimensions.get("window");


function Payment() {
  const [form, setForm] = useState({amount:50000});



  const onSubmit = () => {
    console.log(form);
    axios
      .post('http://192.168.100.50:3000/payment/payment', form)
      .then((res) => {
        const { result } = res.data;
        const paymentLink = result.link;
  
        // Use Linking to open the payment link
        Linking.openURL(paymentLink)
          .then(() => {
            console.log(`Opened URL: ${paymentLink}`);
          })
          .catch((err) => {
            console.error(`Error opening URL: ${paymentLink}`, err);
          });
      })
      .catch((err) => console.log(err));
  };


  

  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       <ImageBackground
          style={{
            height: height / 2.5,
          }}
          resizeMode="contain"
          source={require("../../../assets/images/dollar.png")}
        />
        <View
          style={{
            paddingHorizontal: Spacing * 4,
            paddingTop: Spacing * 4,
          }}
        >
          <Text
            style={{
              fontSize: FontSize.xxLarge,
              color: Colors.primary,
              fontFamily: Font["sans-serif"],
              textAlign: "center",
            }}
          >
            Discover Your Dream Job here
          </Text>

          <Text
            style={{
              fontSize: FontSize.small,
              color: Colors.text,
              fontFamily: Font["sans-serif"],
              textAlign: "center",
              marginTop: Spacing * 2,
            }}
          >
            Explore all the existing job roles based or your interest and study
            major
          </Text>
        </View>
      <Text style={{ fontSize: 24 }}>Payment Page</Text>
      <View style={{ margin: 20 }}>
      {/*   <TextInput
          style={{
            width: 200,
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 10,
            paddingHorizontal: 10,
          }}
         
          onChangeText={(text) => onChange('amount', text)}
        /> */}
        <Button title="Pay" onPress={onSubmit} />
      </View>
    </View>
    </SafeAreaView>
  );
}

export default Payment;
