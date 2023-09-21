/* fonts */
import * as Font from 'expo-font';
// Load and register the font
async function loadFonts() {
  await Font.loadAsync({
    'inter-bold': require('../../assets/fonts/interBold.ttf'),
    // Add more fonts if needed
  });
}

// Call the function to load fonts before rendering your app
loadFonts();



export const FontFamily = {
    interBold: "Inter-Bold",
  };
  /* font sizes */
  export const FontSize = {
    size_mini: 150,
  };
  /* Colors */
  export const Color = {
    colorWhite: "#fff",
    colorBlack: "#000",
    colorGray: "rgba(0, 0, 0, 0.5)",
    colorGainsboro: "#d9d9d9",
  };
  /* border radiuses */
  export const Border = {
    br_31xl: 50,
  };
  