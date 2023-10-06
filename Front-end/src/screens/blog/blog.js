import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  Modal,
  Platform,
  TextInput,
} from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import ImageUpload from "./ImageUpload"; // Import the ImageUpload component
import { useSelector } from "react-redux";

const Blog = () => {
  const [blogText, setBlogText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [userBlogPosts, setUserBlogPosts] = useState([]);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const user = useSelector((state) => state.user);


  const handleImageChange = (imageURL) => {
    setSelectedImage(imageURL);
    console.log("selected image blog",selectedImage);
  };


  const fetchBlogPosts = async () => {
    try {
      const response = await axios.get("http://192.168.10.3:3000/blogs"); // Replace with your server URL
// console.log("first log",response.images[0]);
      if (response.status === 200) {
        const { data } = response;
        setUserBlogPosts(data);
      } else {
        console.error("Received unexpected status code:", response.status);
      }
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const selectImage = async () => {
    try {
      const { uri } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!uri) {
        return;
      }

      setSelectedImage(uri);
    } catch (error) {
      console.log('ImagePicker Error:', error);
    }
  };

  const handlePost = async () => {
    const newBlogPost = {
      body: blogText,
      userId: user._id,
      username: user.username,
      profileImage: user.profileImage,
      images: [selectedImage], // Include the selected image URL
    };
  
    if (selectedImage) {
      try {
        const response = await fetch(selectedImage);
        const blob = await response.blob();

        newBlogPost.image = blob;
      } catch (error) {
        console.error("Error converting image to blob:", error);
        return;
      }
    }

    try {
      const response = await axios.post(
        "http://192.168.10.3:3000/blogs", // Replace with your server URL
        newBlogPost
      );

      if (response.status === 201) {
        const { data } = response;
        setUserBlogPosts([...userBlogPosts, data]);
      } else {
        console.error("Received unexpected status code:", response.status);
      }
    } catch (error) {
      console.error("Error posting blog:", error);
    }

    setBlogText("");
    setSelectedImage(null)
  };

  const openUpdateModal = (post) => {
    setSelectedPost(post);
    setUpdateModalVisible(true);
  };

  const closeUpdateModal = () => {
    setUpdateModalVisible(false);
    setSelectedPost(null);
  };

  const updatePost = async () => {
    if (!selectedPost) return;

    const updatedPost = {
      ...selectedPost,
      body: blogText,
    };

    try {
      const response = await axios.put(
        `http://192.168.10.3:3000/blogs/${updatedPost._id}`, // Replace with your server URL
        updatedPost
      );

      if (response.status === 200) {
        const updatedPosts = userBlogPosts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        );
        setUserBlogPosts(updatedPosts);
        closeUpdateModal();
      } else {
        console.error("Received unexpected status code:", response.status);
      }
    } catch (error) {
      console.error("Error updating blog post:", error);
    }
    setBlogText("");
  };

  const deletePost = async () => {
    if (!selectedPost) return;

    try {
      const response = await axios.delete(
        `http://192.168.10.3:3000/blogs/${selectedPost._id}` // Replace with your server URL
      );

      if (response.status === 204) {
        const updatedPosts = userBlogPosts.filter(
          (post) => post._id !== selectedPost._id
        );
        setUserBlogPosts(updatedPosts);
        closeUpdateModal();
      } else {
        console.error("Received unexpected status code:", response.status);
      }
    } catch (error) {
      console.error("Error deleting blog post:", error);
    }
  };

  
  return (
        <View style={styles.container}>
      <ScrollView>
        {userBlogPosts.map((post, index) => (
          <View key={index} style={styles.blogPostContainer}>
            <View style={styles.header}>
              <Image
                style={styles.profileImage}
                source={{ uri: post.profileImage }}
              />
              <View>
                <Text style={styles.username}>{post.username}</Text>
              </View>
            </View>
            <Text style={styles.blogText}>{post.body}</Text>
            {post.images && (
              <Image
                source={{ uri: post.images[0] }}
                style={styles.blogImage}
              />
            )}
            {user._id === post.userId && (
              <View style={styles.userActions}>
              <Text style={styles.timestamp}>{post.Date}</Text>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => openUpdateModal(post)}
                >
                <Image source={require('../../../assets/edit.png')} style={styles.buttonImage} />   
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.deleteButton} // Use the deleteButton style for the delete button
                onPress={() => {
                  setSelectedPost(post);
                  deletePost();
                }}
                
              >
              <Image source={require('../../../assets/delete.png')} style={styles.buttonImage} />  

          </TouchableOpacity>

                            </View>
            )}
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
      <TextInput
      style={styles.input}
      placeholder="Write your blog..."
      multiline
      value={blogText}
      onChangeText={(text) => setBlogText(text)}
    />
    {/* Use the ImageUpload component to select and display images */}
    <ImageUpload changeImage={setSelectedImage} />
    {selectedImage && (
      <Image
        source={{ uri: selectedImage }}
        style={styles.selectedImage}
      />
    )}

    <TouchableOpacity style={styles.postButton} onPress={handlePost}>
    <Image source={require('../../../assets/send.png')} style={styles.buttonImage} />
    </TouchableOpacity>
        </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isUpdateModalVisible}
        onRequestClose={closeUpdateModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.modalInput}
              placeholder="Update your blog..."
              defaultValue={blogText}
              multiline
              value={blogText}
              onChangeText={(text) => setBlogText(text)}
            />
            <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.updateButton}
              onPress={updatePost}
            >
            <Image source={require('../../../assets/checkmark.png')} style={styles.buttonImage} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={closeUpdateModal}
            >
            <Image source={require('../../../assets/delete-button.png')} style={styles.buttonImage} />
            </TouchableOpacity>
          </View>
         </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
   paddingHorizontal:5,
   paddingVertical:20,
   marginTop : 50 ,
  },
  buttonContainer: {
    flexDirection: 'row', // To create space between the buttons
    marginTop: 12,
// Adjust the margin as needed
  },
  
  blogPostContainer: {
    marginBottom: 24,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor:"#eee"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 12,
    color: "#333",
  },
  timestamp: {
    fontSize: 16,
    color: "#777",
    marginTop : 20,
    marginRight :100,
  },
        profileImage: {
    width: 48,
    height: 48,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#007bff",
  },
  blogText: {
    fontSize: 18,
    lineHeight: 28,
    color: "#444",
    marginBottom: 16,
  },
  blogImage: {
    width: "100%",
    height: 240,
    borderRadius: 16,
    marginBottom: 16,
    resizeMode: "cover",
  },
  userActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
marginRight:-15
  },
  actionButton: {
    
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: -5,
    marginLeft: 12,
    cursor: "pointer",
    transition: "background-color 0.3s ease-in-out",
    ":hover": {
      backgroundColor: "#0056b3",
    },
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  deleteButton: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 18, // Adjust the padding as needed
    marginLeft: 12,
    cursor: "pointer",
    transition: "background-color 0.3s ease-in-out",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 16,
    marginBottom: 1,
   borderWidth:1,
   borderColor:"#eee"
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  postButton: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop:8,
    cursor: "pointer",
    transition: "background-color 0.3s ease-in-out",
    ":hover": {
      backgroundColor: "#0056b3",
    },
  },
  postButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  selectedImage: {
    width: 40,
    height: 40,
    borderRadius: 5,
    resizeMode: "cover",
    marginLeft : 20 
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    width: "100%",
    height:"50%",
    padding: 20,
justifyContent : 'space-between',alignContent : "center"
  },
  modalInput: {
    fontSize: 22,
    minHeight: 250,
    textAlignVertical: "top",
    marginBottom: 20,
    color: "#333",
    justifyContent : 'space-between',
  },
  updateButton: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignSelf: "baseline",
    cursor: "pointer",
    transition: "background-color 0.3s ease-in-out",
    ":hover": {
      backgroundColor: "#0056b3",
    },
    marginLeft : 260
  },
    updateButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  cancelButton: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: "baseline",
    cursor: "pointer",
    transition: "background-color 0.3s ease-in-out",
    ":hover": {
      backgroundColor: "#c82333",
    },
  },
    cancelButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  // Additional custom styles for posts and images
  postTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 12,
  },
  postImageCaption: {
    fontSize: 16,
    color: "#777",
    marginBottom: 12,
  },
  
  buttonImage: {
    width: 25, // Adjust image width as needed
    height: 25, // Adjust image height as needed
    resizeMode: 'contain',
  }
  
  }
);
        

export default Blog;
