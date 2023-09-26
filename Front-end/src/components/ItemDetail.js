import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ScrollView, Modal, TouchableOpacity } from 'react-native';
import Review from './Review'; // Import the Review component
import { Ionicons } from '@expo/vector-icons';

const ItemDetail = ({ route }) => {
  const { item } = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [reviews, setReviews] = useState([]);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalVisible(false);
  };

  const handleSubmitReview = (reviewData) => {
    // Add the submitted review to the reviews state
    setReviews([...reviews, reviewData]);
  };

  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const halfStar = rating - filledStars >= 0.5;
    const starElements = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= filledStars) {
        starElements.push(
          <Ionicons key={i} name="star" size={20} color="#FFD700" style={styles.starIcon} />
        );
      } else if (i === filledStars + 1 && halfStar) {
        starElements.push(
          <Ionicons key={i} name="star-half" size={20} color="#FFD700" style={styles.starIcon} />
        );
      } else {
        starElements.push(
          <Ionicons key={i} name="star-outline" size={20} color="#FFD700" style={styles.starIcon} />
        );
      }
    }

    return starElements;
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
                source={{ uri: picture }} // Assuming your data has an image URL
                style={styles.itemImage}
              />
            </TouchableOpacity>
          )}
          horizontal // Display images horizontally
          showsHorizontalScrollIndicator={false} // Hide horizontal scroll bar
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
      {/* Review section */}
      <View style={styles.reviewSection}>
        <Text style={styles.reviewTitle}>Reviews</Text>
        <Review onSubmit={handleSubmitReview} />
        {reviews.length > 0 && (
          <View style={styles.reviewsContainer}>
            {reviews.map((review, index) => (
              <View key={index} style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewUsername}>{review.username}</Text>
                  <View style={styles.starContainer}>
                    {renderStars(review.rating)}
                  </View>
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
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
    marginRight: 8, // Add margin between images
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
  // Modal styles
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
  // Review section styles
  reviewSection: {
    marginTop: 20,
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  reviewsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    marginTop: 16,
  },
  reviewItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reviewUsername: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginRight: 4,
  },
  reviewComment: {
    fontSize: 16,
    lineHeight: 24,
  },
  fancyContainer: {
    backgroundColor: '#f0f0f0',
  },
  fancyTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  fancyButton: {
    backgroundColor: 'gold',
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
  },
  fancyButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});


export default ItemDetail;
