import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import { addBlogPost, deleteBlogPost } from '../../../redux/action'; // Import your Redux actions

    const Blog = () => {
        const dispatch = useDispatch();
        const posts = useSelector((state) => state.posts); // Get posts from Redux store
        const userName = useSelector((state) => state.user.username); // Get username from Redux store
        const userProfilePicture = useSelector((state) => state.user.profilePicture); // Get profile picture from Redux store
      
        const [newPost, setNewPost] = useState('');
        const [editingIndex, setEditingIndex] = useState(null);
        const [editedPost, setEditedPost] = useState('');
      
        const addPost = () => {
          if (newPost) {
            const postWithUserInfo = {
              text: newPost,
              author: userName,
              profilePicture: userProfilePicture,
            };
            // Dispatch the action to add a new post
            dispatch(addBlogPost(postWithUserInfo));
            setNewPost('');
          }
        };
      
        const editPost = (index) => {
          setEditedPost(posts[index].text);
          setEditingIndex(index);
        };
      
        const updatePost = () => {
          if (editedPost) {
            const updatedPost = {
              ...posts[editingIndex],
              text: editedPost,
            };
            // Dispatch the action to update a post
            dispatch(updateBlogPost(updatedPost));
            setEditingIndex(null);
            setEditedPost('');
          }
        };
      
        const deletePost = (index) => {
          // Dispatch the action to delete a post
          dispatch(deleteBlogPost(index));
        };
      
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Blog</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new post"
          value={newPost}
          onChangeText={(text) => setNewPost(text)}
        />
        <Button title="Add" onPress={addPost} />
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.postContainer}>
            {editingIndex === index ? (
              <>
                <TextInput
                  style={styles.editInput}
                  value={editedPost}
                  onChangeText={(text) => setEditedPost(text)}
                />
                <Button title="Update" onPress={updatePost} />
              </>
            ) : (
              <>
                <View style={styles.userInfo}>
                  <Image source={{ uri: item.profilePicture }} style={styles.profilePicture} />
                  <Text style={styles.author}>{item.author}</Text>
                </View>
                <Text style={styles.postText}>{item.text}</Text>
              </>
            )}
            <TouchableOpacity onPress={() => editPost(index)} style={styles.button}>
              <Text>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deletePost(index)} style={styles.button}>
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    marginTop : 50,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 16,
    padding: 8,
  },
  postContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  postText: {
    flex: 1,
    fontSize: 16,
  },
  editInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 16,
    padding: 8,
  },
  button: {
    backgroundColor: 'lightgray',
    padding: 8,
    borderRadius: 5,
    marginLeft: 8,
  },
});

export default Blog;
