import * as React from "react";
import { Text, StyleSheet, View , TouchableOpacity} from "react-native";
import { Image } from "expo-image";
import { FontFamily } from "./GlobalStyles";
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const OnBoarding2 = ({ navigation }) => {

  const handleNextButtonPress = () => {
    // Navigate to the next screen (OnBoarding23)
    navigation.navigate('OnBoarding3');
  };

  const handlePreviousButtonPress = () => {
    // Navigate to the previous screen (OnBoarding2)
    navigation.navigate('Onboarding1');
  };

  const onGestureEvent = (event) => {
    if (event.nativeEvent.state === State.END) {
      // Detect the gesture end and navigate to the next screen
      navigation.navigate('OnBoarding3');
    }
  };

  return (
    <View style={styles.OnBoarding2}>
      <Text style={styles.makeYourOwn}>{`Make your own private 
travel plan`}</Text>
      <Text
        style={[styles.formulateYourStrategy, styles.formulateYourStrategyTypo]}
      >{`Formulate your strategy to receive 
wonderful gift packs`}</Text>
      <View style={styles.nordicVacationSponsorWrapper}>
        <Text
          style={[
            styles.nordicVacationSponsor,
            styles.formulateYourStrategyTypo,
          ]}
        >
          Nordic Vacation Sponsor
        </Text>
      </View>
      <Image
        style={styles.icon}
        contentFit="cover"
        source={require("../../../assets/images/OnBoarding2.png")}
      />
       <TouchableOpacity onPress={handleNextButtonPress}>
      <Image
        style={styles.image1557Icon}
        contentFit="cover"
        source={require("../../../assets/images/next.png")}
        
      />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formulateYourStrategyTypo: {
    fontFamily: FontFamily.poppinsRegular,
    position: "absolute",
  },
  makeYourOwn: {
    top: 510,
    left: 65,
    fontSize: 28,
    letterSpacing: -0.4,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemiBold,
    color: "#000",
    textAlign: "center",
    position: "absolute",
  },
  formulateYourStrategy: {
    top: 590,
    left: 65,
    fontSize: 18,
    letterSpacing: -0.3,
    color: "#b4b4b4",
    textAlign: "center",
  },
  nordicVacationSponsor: {
    top: 0,
    left: 0,
    fontSize: 14,
    color: "#595959",
    textAlign: "left",
  },
  nordicVacationSponsorWrapper: {
    top: 767,
    left: 126,
    width: 174,
    height: 21,
    position: "absolute",
  },
  icon: {
    top: 0,
    flex:1,
    left: 0,
    width: 450,
    height: 500,
    position: "absolute",
  },
  image1557Icon: {
    top: 669,
    left: 180,
    width: 50,
    height: 50,
    position: "absolute",
  },
  OnBoarding2: {
    backgroundColor: "#fff",
    flex: 1,
    width: "100%",
    height: 870,
    overflow: "hidden",
  },
});

export default OnBoarding2;
