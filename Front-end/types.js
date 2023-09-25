const { NativeStackScreenProps } = require("@react-navigation/native-stack");

const RootStackParamList = {
  Welcome: undefined,
  Login: undefined,
  Register: undefined,
};

function RootStackScreenProps(Screen) {
  return NativeStackScreenProps(RootStackParamList, Screen);
}

module.exports = {
  RootStackParamList,
  RootStackScreenProps,
};
