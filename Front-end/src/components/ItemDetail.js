import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ScrollView, Modal, TouchableOpacity, TextInput, Button } from 'react-native';
const ItemDetail = ({ route }) => {
  const { item } = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [comments, setComments] = useState([]); // Updated variable name
  const [username, setUsername] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalVisible(false);
  };

  const handleSubmitComment = () => { // Updated function name
    if (!username || !comment) { // Removed rating as it's no longer relevant for comments
      // Ensure all required fields are filled
      return;
    }

    const commentData = { // Updated variable name
      username,
      comment, // Updated variable name
    };

    // Add the submitted comment to the comments state
    setComments([...comments, commentData]);

    // Clear form fields
    setUsername('');
    setComment('');
  };

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
      {/* Modal to display the enlarged image */}
      <Modal visible={isModalVisible} transparent={true} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <Image source={{ uri: selectedImage }} style={styles.enlargedImage} resizeMode="contain" />
        </View>
      </Modal>
      {/* Comments section (formerly Reviews) */}
      <View style={styles.commentsSection}> {/* Updated section name */}
        <Text style={styles.commentsTitle}>Comments</Text> {/* Updated title */}
        <View style={styles.commentForm}> {/* Updated form name */}
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
          <Button title="Submit Comment" onPress={handleSubmitComment} /> {/* Updated button text */}
        </View>
        {comments.length > 0 && (
          <View style={styles.commentsContainer}> {/* Updated container name */}
            {comments.map((comment, index) => (
              <View key={index} style={styles.commentItem}> {/* Updated item name */}
                <View style={styles.commentHeader}> {/* Updated header name */}
                  <Text style={styles.commentUsername}>{comment.username}</Text> {/* Updated variable name */}
                </View>
                <Text style={styles.commentText}>{comment.comment}</Text> {/* Updated variable name */}
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
    color: 'gray',
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
  commentsSection: { /* Updated section name */
    marginTop: 20,
  },
  commentsTitle: { /* Updated title */
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  commentForm: { /* Updated form name */
    marginBottom: 16,
  },
  commentsContainer: { /* Updated container name */
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    marginTop: 16,
  },
  commentItem: { /* Updated item name */
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  commentHeader: { /* Updated header name */
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  commentUsername: { /* Updated variable name */
    fontSize: 18,
    fontWeight: 'bold',
  },
  commentText: { /* Updated variable name */
    fontSize: 16,
    lineHeight: 24,
  },
});

export default ItemDetail;
