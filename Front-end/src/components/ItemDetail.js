import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import axios from 'axios';

const ItemDetail = ({ route }) => {
  const { item } = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalVisible(false);
  };

  const postReview = async () => {
    try {
      const response = await axios.post(
        // Replace 'YOUR_API_ENDPOINT' with the actual endpoint for posting reviews
        `http://192.168.100.42:3000/hotels/${item._id}/reviews`,
        {
          username,
          rating,
          comment
        }
      );

      if (response.status === 201) {
        // If the review is successfully posted, update the local comments state
        const newReview = response.data;
        setComments([...comments, newReview]);

        // Clear form fields
        setUsername('');
        setRating(0);
        setComment('');
      }
    } catch (error) {
      console.error('Error posting review:', error);
      Alert.alert('Error', 'Failed to post the review. Please try again.');
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        // Replace 'YOUR_API_ENDPOINT' with the actual endpoint for getting reviews
        `http://192.168.100.42:3000/hotels/${item._id}/reviews`
      );

      if (response.status === 200) {
        setComments(response.data);
      } else {
        console.error('Unexpected status code:', response.status);
        Alert.alert('Error', 'Failed to fetch reviews. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      Alert.alert('Error', 'Failed to fetch reviews. Please check your network connection.');
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <FlatList
          data={item.pictures}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item: picture }) => (
            <TouchableOpacity onPress={() => openModal(picture)}>
              <Image
                source={{ uri: picture }}
                style={styles.itemImage}
              />
            </TouchableOpacity>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemPrice}>{item.price}dt</Text>
      </View>
    
      <Modal visible={isModalVisible} transparent={true} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <Image source={{ uri: selectedImage }} style={styles.enlargedImage} resizeMode="contain" />
        </View>
      </Modal>
      
      <View style={styles.commentsSection}>
        <Text style={styles.commentsTitle}>review</Text>
        <View style={styles.commentForm}>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            placeholder="Rating"
            value={rating}
            onChangeText={(text) => setRating(text)}
          />
          <TextInput
            placeholder="Comment"
            value={comment}
            onChangeText={(text) => setComment(text)}
          />
          <Button title="Submit Comment" onPress={postReview} />
        </View>
        {comments.length > 0 && (
          <View style={styles.commentsContainer}>
            {comments.map((comment, index) => (
              <View key={index} style={styles.commentItem}>
                <View style={styles.commentHeader}>
                  <Text style={styles.commentUsername}>{comment&&comment.username}</Text>
                  <Text style={styles.commentRating}>Rating: {comment.rating}</Text>
                </View>
                <Text style={styles.commentText}>{comment.comment}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 50
  },
  imageContainer: {
    height: 250,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 16,
  },
  itemImage: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginRight: 8,
  },
  detailsContainer: {
    paddingVertical: 16,
  },
  itemTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  itemDescription: {
    fontSize: 18,
    color: '#C5C5C7',
    marginBottom: 16,
  },
  itemPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    zIndex: 1,
  },
  closeButtonText: {
    color: 'black',
  },
  enlargedImage: {
    width: '100%',
    height: '100%',
  },
  commentsSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  commentsTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  commentForm: {
    marginBottom: 24,
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 4,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  inputField: {
    backgroundColor: '#fff',
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  commentsContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 16,
    marginTop: 20,
  },
  commentItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 10,
    elevation: 6,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  commentUsername: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  commentRating: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28A745',
  },
  commentText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});

export default ItemDetail;