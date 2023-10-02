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
      aspect: [1, 1],
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
      {selectedImg && (
        <Image
          source={{ uri: selectedImg }}
          style={{ width: 200, height: 200, resizeMode: "contain" }}
        />
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.customButton} onPress={openImagePicker}>
          <Text style={styles.buttonText}>Choose from Device</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.customButton} onPress={handleCameraLaunch}>
          <Text style={styles.buttonText}>Open Camera</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
  },
  customButton: {
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 6,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ImageUpload;
