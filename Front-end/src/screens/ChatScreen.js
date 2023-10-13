import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export default function ChatScreen() {
  const user = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMessages = () => {
      axios
        .get('http://192.168.10.3:3000/messages')
        .then((response) => {
          const transformedMessages = response.data.map((message) => ({
            _id: message._id,
            createdAt: new Date(message.createdAt),
            text: message.text,
            user: {
              _id: message.user._id,
              avatar: message.user.avatar,
              name: message.user.name, // Add the user's name
            },
          }));

          transformedMessages.sort((a, b) => b.createdAt - a.createdAt);
          setMessages(transformedMessages);
        })
        .catch((error) => {
          console.error('Error fetching messages:', error);
        });
    };

    fetchMessages();

    const intervalId = setInterval(fetchMessages, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const onSend = useCallback((newMessages = []) => {
    axios
      .post('http://192.168.10.3:3000/messages', newMessages[0])
      .then((response) => {
        console.log('Message sent successfully:', response.data);

        // Extract data from the response
        const { _id, createdAt, text, user } = response.data;

        // Create a new message object using the extracted data
        const newMessage = {
          _id: _id,
          createdAt: new Date(createdAt),
          text: text,
          user: {
            _id: user._id,
            avatar: user.avatar,
            name: user.name, // Add the user's name
          },
        };

        // Add the new message to the chat component's state
        setMessages((previousMessages) => GiftedChat.append(previousMessages, [newMessage]));
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{
        _id: user.username,
        name: user.name,
        avatar: user.avatar,
      }}
    />
  );
}
