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
      const response = await axios.get("http://192.168.100.45:3000/blogs");

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
      const response = await axios.post("http://192.168.100.45:3000/blogs",
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
    setSelectedImage(null);
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
        `http://192.168.100.45:3000/blogs/${updatedPost._id}`,
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
        `http://192.168.100.45:3000/blogs/blogs/${selectedPost._id}`
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
                <Text style={styles.timestamp}>Posted 2 hours ago</Text>
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
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => openUpdateModal(post)}
                >
                  <Text style={styles.actionButtonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => {
                    setSelectedPost(post)
                    deletePost()
                  }}
                >
                  <Text style={styles.actionButtonText}>Delete</Text>
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
      <Text style={styles.postButtonText}>Post</Text>
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
              multiline
              value={blogText}
              onChangeText={(text) => setBlogText(text)}
            />
            <TouchableOpacity
              style={styles.updateButton}
              onPress={updatePost}
            >
              <Text style={styles.updateButtonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={closeUpdateModal}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 16,
    paddingTop: 30,
  },
  blogPostContainer: {
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
    color: "#333",
  },
  timestamp: {
    fontSize: 14,
    color: "#777",
    marginLeft: 8,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#007bff",
  },
  blogText: {
    fontSize: 16,
    marginBottom: 12,
    lineHeight: 24,
    color: "#444",
  },
  blogImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 12,
    resizeMode: "cover",
    transitionDuration: "0.3s",
    transform: "scale(1)",
    ":hover": {
      transform: "scale(1.1)",
    },
  },
  userActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  actionButton: {
    backgroundColor: "#007bff",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 8,
    cursor: "pointer",
    transitionDuration: "0.3s",
    ":hover": {
      backgroundColor: "#0056b3",
    },
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  postButton: {
    backgroundColor: "#007bff",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginLeft: 8,
    cursor: "pointer",
    transitionDuration: "0.3s",
    ":hover": {
      backgroundColor: "#0056b3",
    },
  },
  postButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: "cover",
  },
  modalContainer: {
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    width: "80%",
    padding: 16,
  },
  modalInput: {
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: "top",
    marginBottom: 16,
    color: "#333",
  },
  updateButton: {
    backgroundColor: "#007bff",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginRight: 8,
    alignSelf: "flex-end",
    cursor: "pointer",
    transitionDuration: "0.3s",
    ":hover": {
      backgroundColor: "#0056b3",
    },
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: "flex-end",
    cursor: "pointer",
    transitionDuration: "0.3s",
    ":hover": {
      backgroundColor: "#c82333",
    },
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  // Additional custom styles for posts and images
  postTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
  },
  postImageCaption: {
    fontSize: 14,
    color: "#777",
    marginBottom: 8,
  },
}
});
        

export default Blog;
