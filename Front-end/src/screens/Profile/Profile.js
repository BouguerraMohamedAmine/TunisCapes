import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/action";
import { useNavigation } from "@react-navigation/native";
import Spacing from "../../constants/Spacing.jsx";
import Colors from "../../constants/Colors";
import Font from "../../constants/Font";

export default function Profile({ navigation, route }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    // Dispatch the logout action to clear the user data
    dispatch(logout());
    navigation.navigate("Home"); // Navigate to the 'Welcome' screen
  };

  console.log("user", user);

  // Sample data for traveler reviews
  const dummyReviews = [
    {
      username: "test",
      date: "October 10, 2023",
      rating: 4.5,
      text: "Great experience at this destination. Loved it!",
    },
    {
      username: "test",
      date: "October 12, 2023",
      rating: 5.0,
      text: "Absolutely amazing! Would highly recommend.",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../../assets/images/left-arrow.png")}
            style={styles.backButton}
          />
        </TouchableOpacity>
      </View>

      {/* Profile Info */}
      {user ? (
        <View style={styles.profileInfo}>
          <Image
            source={{ uri: user.profileImage }}
            style={styles.profileImage}
          />
          <View style={styles.profileDetails}>
            <Text style={styles.profileName}>{user.username}</Text>
            <Text style={styles.profileLocation}>{user.email}</Text>
          </View>
          {/* Logout Button */}
          {user ? (
            <TouchableOpacity
              onPress={handleLogout}
              style={styles.logoutButton}
            >
              <Image
                source={require("../../../assets/logout.png")}
                style={styles.logoutIcon}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      ) : null}

      {/* Reviews and Pictures */}
      {user ? (
        <FlatList
          data={dummyReviews} // Use the dummyReviews array as the data source
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.reviewItem}>
              <Text style={styles.reviewUsername}>{item.username}</Text>
              <Text style={styles.reviewDate}>{item.date}</Text>
              <View style={styles.reviewRatingContainer}>
                <Text style={styles.reviewRating}>{item.rating}</Text>
                <Image
                  source={require("../../../assets/images/camp.png")}
                  style={styles.starIcon}
                />
              </View>
              <Text style={styles.reviewText}>{item.text}</Text>
            </View>
          )}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: wp(5),
    paddingTop: wp(2),
  },
  backButton: {
    height: wp(6),
    width: wp(6),
    marginTop: wp(10),
  },
  profileInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(6),
    marginTop: wp(9),
  },
  profileImage: {
    height: wp(20),
    width: wp(20),
    borderRadius: wp(10),
    justifyContent: "flex-start",
  },
  profileDetails: {
    marginLeft: wp(5),
  },
  profileName: {
    fontSize: wp(5),
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  profileLocation: {
    fontSize: wp(4),
    color: "gray",
  },
  logoutButton: {
    paddingVertical: Spacing * 1,
    paddingHorizontal: Spacing * 2,
    width: wp(25),
    borderRadius: Spacing,
    shadowColor: "#1F41BB",
    shadowOffset: {
      width: 0,
      height: Spacing,
    },
    shadowOpacity: 0.3,
    shadowRadius: Spacing,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutIcon: {
    width: 40,
    height: 40,
  },
  reviewItem: {
    marginBottom: wp(4),
    padding: wp(3),
    borderRadius: wp(2),
    backgroundColor: "white",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  reviewUsername: {
    fontSize: wp(4.5),
    fontWeight: "bold",
    marginBottom: wp(1),
  },
  reviewDate: {
    fontSize: wp(3.5),
    color: "gray",
    marginBottom: wp(1),
  },
  reviewRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: wp(1),
  },
  reviewRating: {
    fontSize: wp(4),
    fontWeight: "bold",
    marginRight: wp(1),
  },
  starIcon: {
    width: wp(4),
    height: wp(4),
    tintColor: "gold",
    marginRight: wp(1),
  },
  reviewText: {
    fontSize: wp(4),
    color: "black",
  },
});
