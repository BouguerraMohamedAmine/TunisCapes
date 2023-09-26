// ReviewForm.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const ReviewForm = ({ onSubmit }) => {
  const [review, setReview] = useState('');

  const handleSubmit = () => {
    onSubmit(review);
    setReview('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Write your review..."
        value={review}
        onChangeText={(text) => setReview(text)}
      />
      <Button title="Submit Review" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginBottom: 8,
  },
});

export default ReviewForm;
