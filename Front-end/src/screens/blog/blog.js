import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Platform,
} from "react-native";
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';

const Blog = () => {
  const [blogText, setBlogText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [userBlogPosts, setUserBlogPosts] = useState([]);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const user = useSelector((state) => state.user);

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
  };

  const deletePost = async () => {
    if (!selectedPost) return;
  
    console.log("Deleting post:", selectedPost); // Add this line
  
    try {
      const response = await axios.delete(
        `http://192.168.100.45:3000/blogs/blogs/${selectedPost._id}`
      );
  
      console.log("Delete response:", response); // Add this line
  
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
            {post.image && (
              <Image
                source={{ uri: post.image }}
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
                  onPress={() => deletePost(post)}
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
        <TouchableOpacity style={styles.postButton} onPress={selectImage}>
          <Text style={styles.postButtonText}>Select Image</Text>
        </TouchableOpacity>
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
    borderRadius: 8,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
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
  },
  blogText: {
    fontSize: 16,
    marginBottom: 12,
  },
  blogImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  userActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  actionButton: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginLeft: 8,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  postButton: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 8,
  },
  postButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 5,
    width: "80%",
    padding: 16,
  },
  modalInput: {
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: "top",
    marginBottom: 16,
  },
  updateButton: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    alignSelf: "flex-end",
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "flex-end",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Blog;
