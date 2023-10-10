import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";

const AppTextInput = ({ ...otherProps }) => {
  const [focused, setFocused] = useState(false);

  return (
    <TextInput
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholderTextColor={"#626262"}
      style={[
        {
          fontFamily: Font["sans-serif"],
          fontSize: FontSize.small,
          padding: Spacing * 2,
          backgroundColor: "#f1f4ff",
          borderRadius: Spacing,
          marginVertical: Spacing,
        },
        focused && {
          borderWidth: 3,
          borderColor: "#1F41BB",
          shadowOffset: { width: 4, height: Spacing },
          shadowColor: "#1F41BB",
          shadowOpacity: 0.2,
          shadowRadius: Spacing,
        },
      ]}
      {...otherProps}
    />
  );
};

export default AppTextInput;

const styles = StyleSheet.create({});
