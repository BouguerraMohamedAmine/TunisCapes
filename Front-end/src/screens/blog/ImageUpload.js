import React, { useState, useEffect } from "react";
import { ActivityIndicator, TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const cloudName = "dqcriwyev"; // Replace with your Cloud name
const uploadPreset = "dq9oirwh"; // Replace with your upload preset

const ImageUpload = ({ changeImage }) => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (selectedImg) {
      setUploading(false); // Once the image is selected and displayed, stop showing the activity indicator
    }
  }, [selectedImg]);

  const openImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
console.log("hedi result ",result);
    if (!result.canceled) {
      setUploading(true); // Start showing the activity indicator
      // Upload the image to Cloudinary
      uploadToCloudinary(result.assets[0].uri);
    }
  };

  const handleCameraLaunch = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUploading(true); // Start showing the activity indicator
      // Upload the image to Cloudinary
      uploadToCloudinary(result.assets[0].uri);
    }
  };

  const uploadToCloudinary = async (uri) => {
    try {
      const data = new FormData();
      data.append("file", { uri, type: "image/jpeg", name: "image.jpg" });
      data.append("upload_preset", uploadPreset);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        // Image uploaded successfully
        const cloudinaryUrl = response.data.secure_url;
        changeImage(cloudinaryUrl);
        setSelectedImg(cloudinaryUrl)
        console.log("selected image (upload)",cloudinaryUrl);
        // Notify the parent component of the selected image
      }
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {uploading && <ActivityIndicator size="large" color="#4CAF50" />}
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.customButton} onPress={openImagePicker}>
        <Image source={require('../../../assets/folder.png')} style={styles.buttonImage} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.customButton} onPress={handleCameraLaunch}>
        <Image source={require('../../../assets/camera.png')} style={styles.buttonImage} />
      </TouchableOpacity>
    </View>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  imagePreview: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
    marginLeft :60
    
  },
  customButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0000', // Button background color
    borderRadius: 10,
    width: 40, // Adjust button width as needed
    height: 40,
     // Adjust button height as needed
  },
  buttonImage: {
    width: 25, // Adjust image width as needed
    height: 25, // Adjust image height as needed
    resizeMode: 'contain',
  },
  buttonText: {
    color: '#fff', // Text color
    fontSize: 16, // Text font size
  },
});
  

export default ImageUpload;
