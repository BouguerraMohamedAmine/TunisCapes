import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';



const Comment = ({ onSubmit }) => { // Change the component name to Comment
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');

  const handleCommentSubmit = () => {
    // Ensure all required fields are filled
    if (!username || !comment) {
      return;
    }

    // Create a comment object
    const commentData = {
      username,
      comment,
    };

    // Call the onSubmit callback to submit the comment
    onSubmit(commentData);

    // Clear form fields
    setUsername('');
    setComment('');
  };

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        placeholder="Comment"
        value={comment}
        onChangeText={(text) => setComment(text)}
      />
      <Button title="Submit Comment" onPress={handleCommentSubmit} />
    </View>
  );
};

export default Comment; // Export the Comment component
