import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import axios from 'axios'; // Import Axios
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../../colors';
import { useSelector } from 'react-redux';

export default function ChatScreen() {
  const user = useSelector(state => state.user);

  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  const onSignOut = () => {
    // Handle sign-out as before
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          onPress={onSignOut}
        >
          <AntDesign
            name="logout"
            size={24}
            color={colors.gray}
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    // Fetch messages from your server when the component mounts
    axios.get('http://192.168.100.49:3000/messages')
      .then((response) => {
        // Transform the response data into the format expected by GiftedChat
        const transformedMessages = response.data.map((message) => ({
          _id: message._id,
          createdAt: new Date(message.createdAt), // Convert date string to Date object
          text: message.text,
          user: {
            _id: message.user._id,
            avatar: message.user.avatar,
          },
        }));
        setMessages(transformedMessages);
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
      });
  }, []);

  const onSend = useCallback((newMessages = []) => {
    // Send the new message to your server when the user sends a message
    axios.post('http://192.168.100.49:3000/messages', newMessages[0])
      .then((response) => {
        // If the message was successfully sent, you can update the state if needed.
        // You can also handle the response as required.
        console.log('Message sent successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={false}
      showUserAvatar={false}
      onSend={(newMessages) => onSend(newMessages)}
      messagesContainerStyle={{
        backgroundColor: '#fff',
      }}
      textInputStyle={{
        backgroundColor: '#fff',
        borderRadius: 20,
      }}
      user={{
        _id: user.username, // Use user.username as the user ID
        avatar: user.pictures, // Use user.pictures as the avatar
      }}
    />
  );
}
