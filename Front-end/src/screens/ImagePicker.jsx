import ImagePicker from 'react-native-image-picker';

const pickImage = () => {
  ImagePicker.showImagePicker({}, (response) => {
    if (!response.didCancel && !response.error) {
      // Handle the selected image (e.g., save the image URL)
      const imageUrl = response.uri;
      // You can store the imageUrl in state or use it to display the image
    }
  });
};
