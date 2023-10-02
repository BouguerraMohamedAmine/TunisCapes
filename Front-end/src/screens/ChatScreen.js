import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../../colors';
import { useSelector } from 'react-redux';

export default function ChatScreen() {
  const user = useSelector((state) => state.user);

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

  const fetchMessages = () => {
    axios
      .get('http://192.168.10.5:3000/messages')
      .then((response) => {
        const transformedMessages = response.data.map((message) => ({
          _id: message._id,
          createdAt: new Date(message.createdAt),
          text: message.text,
          user: {
            _id: message.user._id,
            avatar: message.user.avatar,
          },
        }));
  
        // Sort the messages by createdAt in descending order (latest messages at the bottom)
        transformedMessages.sort((a, b) => b.createdAt - a.createdAt);
  
        // Set the sorted messages in the state
        setMessages(transformedMessages);
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
      });
  };
  

  useEffect(() => {
    // Fetch and sort messages from your server when the component mounts
    fetchMessages();

    // Use setInterval to fetch and sort messages every 1 second
    const intervalId = setInterval(fetchMessages, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const onSend = useCallback((newMessages = []) => {
    axios
      .post('192.168.10.5:3000/messages', newMessages[0])
      .then((response) => {
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
        _id: user.username,
        avatar: user.profileImage,
      }}
    />
  );
}