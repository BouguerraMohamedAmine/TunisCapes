// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';

// const BlogPost = ({ user, onPost }) => {
//   const [blogText, setBlogText] = useState('');

//   const handlePost = () => {
//     // Create a new blog post object
//     const newBlogPost = {
//       body: blogText,
//       image: user.profileImage,
//       date: new Date(),
//       creator: user._id,
//     };

//     // Pass the new blog post to the parent component
//     onPost(newBlogPost);

//     // Clear the input field
//     setBlogText('');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.username}>{user.username}</Text>
//       <Image style={styles.profileImage} source={{ uri: user.profileImage }} />
//       <TextInput
//         style={styles.input}
//         placeholder="Write your blog..."
//         multiline
//         value={blogText}
//         onChangeText={(text) => setBlogText(text)}
//       />
//       <TouchableOpacity style={styles.postButton} onPress={handlePost}>
//         <Text style={styles.postButtonText}>Post</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     margin: 16,
//   },
//   username: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   profileImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginBottom: 8,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 8,
//     marginBottom: 16,
//     fontSize: 16,
//     minHeight: 100,
//   },
//   postButton: {
//     backgroundColor: 'blue',
//     borderRadius: 8,
//     paddingVertical: 12,
//   },
//   postButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });

// export default BlogPost;
