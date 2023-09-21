// Messaging.js

import React, { useState, useEffect } from "react";
import { View, TextInput, Text, FlatList, Pressable, Modal, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MessageComponent from "../screens/Components/MessageComponent";
import { useNavigation } from "@react-navigation/native";
import ModalSelector from 'react-native-modal-selector';
import Emoji from 'react-native-emoji'; // Added import

import { styles } from "../styles";

const Messaging = ({ route }) => {
    const navigation = useNavigation();
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [user, setUser] = useState("");
    const [selectedEmoji, setSelectedEmoji] = useState(null);
    const [isEmojiModalVisible, setIsEmojiModalVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            getUsername();
            setChatMessages(route.params.initialMessages);
        });

        return unsubscribe;
    }, [navigation]);

    const getUsername = async () => {
        try {
            const value = await AsyncStorage.getItem("username");
            if (value !== null) {
                setUser(value);
            }
        } catch (e) {
            console.error("Error while loading username!");
        }
    };

    const handleNewMessage = () => {
        const hour =
            new Date().getHours() < 10
                ? `0${new Date().getHours()}`
                : `${new Date().getHours()}`;

        const mins =
            new Date().getMinutes() < 10
                ? `0${new Date().getMinutes()}`
                : `${new Date().getMinutes()}`;

        const newMessage = {
            id: chatMessages.length + 1,
            text: message,
            time: `${hour}:${mins}`,
            user: user,
            emoji: selectedEmoji
        };

        setChatMessages([...chatMessages, newMessage]);
        setMessage("");
        setSelectedEmoji(null);
    };

    const handleEmojiSelect = (item) => {
        setSelectedEmoji(item.label);
        setIsEmojiModalVisible(false);
    };

    return (
        <View style={styles.messagingscreen}>
            <View
                style={[
                    styles.messagingscreen,
                    { paddingVertical: 15, paddingHorizontal: 10 },
                ]}
            >
                {chatMessages[0] ? (
                    <FlatList
                        data={chatMessages}
                        renderItem={({ item }) => (
                            <MessageComponent item={item} user={user} />
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
                ) : (
                    <View>
                        <Text>No messages yet.</Text>
                    </View>
                )}
            </View>

            <View style={styles.messaginginputContainer}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isEmojiModalVisible}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <ModalSelector
                                data={[
                                    { key: 1, section: true, label: 'Emojis' },
                                    { key: 2, label: '❤️' },{ key: 3, label: '👍' },{ key: 4, label: '😊' },{ key: 5, label: '🎉' },
                                    { key: 6, label: '😂' },{ key: 7, label: '😎' },{ key: 8, label: '😍' },{ key: 9, label: '🤩' },
                                    { key: 10, label: '🥰' },{ key: 11, label: '😘' },{ key: 12, label: '🤗' },{ key: 13, label: '😜' },
                                    { key: 14, label: '🤪' },{ key: 15, label: '😋' },{ key: 16, label: '🥳' },{ key: 17, label: '🤠' },
                                    { key: 18, label: '🥸' },{ key: 19, label: '😇' },{ key: 20, label: '🙃' },{ key: 21, label: '😉' },
                                    { key: 22, label: '😊' },{ key: 23, label: '🔥' },{ key: 24, label: '💡' },
                                    { key: 26, label: '🌟' },{ key: 27, label: '💫' },{ key: 28, label: '✨' },{ key: 29, label: '🌸' },
                                    { key: 30, label: '🌺' },{ key: 31, label: '🌼' },{ key: 32, label: '🍀' },{ key: 33, label: '🌷' },
                                    { key: 34, label: '🌻' },{ key: 35, label: '🍁' },{ key: 36, label: '🍂' },{ key: 37, label: '🌿' },
                                    { key: 38, label: '🍃' },{ key: 39, label: '🌲' },{ key: 40, label: '🌳' },{ key: 41, label: '🌴' },
                                    { key: 42, label: '🌱' },{ key: 43, label: '🌍' },{ key: 44, label: '🌎' },{ key: 45, label: '🌏' },
                                    { key: 46, label: '🌐' },{ key: 47, label: '🌘' },{ key: 48, label: '🌑' },{ key: 49, label: '🌒' },
                                    { key: 50, label: '🌓' },{ key: 51, label: '😲' },{ key: 52, label: '🥱' },{ key: 53, label: '😴' },
                                    { key: 54, label: '🤤' },{ key: 55, label: '😪' },{ key: 56, label: '😵' },
                                    { key: 57, label: '😵‍💫' },{ key: 58, label: '🫥' },{ key: 59, label: '🤐' },
                                    { key: 60, label: '🥴' },{ key: 61, label: '🤢' },{ key: 62, label: '🤮' },
                                    { key: 63, label: '🤧' },{ key: 64, label: '😷' },{ key: 65, label: '🤒' },
                                    { key: 66, label: '🤕' },{ key: 67, label: '🤑' },{ key: 68, label: '🤠' },
                                    { key: 69, label: '😈' },{ key: 70, label: '👿' },{ key: 71, label: '👹' },
                                    { key: 72, label: '👺' },{ key: 73, label: '🤡' },{ key: 74, label: '💩' },
                                    { key: 75, label: '👻' },{ key: 76, label: '💀' },{ key: 77, label: '☠️' },
                                    { key: 78, label: '👽' },{ key: 79, label: '👾' },{ key: 80, label: '🤖' },
                                    { key: 81, label: '🎃' },{ key: 82, label: '😺' },{ key: 83, label: '😸' },
                                    { key: 84, label: '😹' },{ key: 85, label: '😻' },{ key: 86, label: '😼' },
                                    { key: 87, label: '😽' },{ key: 88, label: '🙀' },{ key: 89, label: '😿' },
                                    { key: 90, label: '😾' }
                                    // ... (previous emoji data)
                                ]}
                                initValue="Select Emoji"
                                style={styles.emojiButton}
                                onChange={handleEmojiSelect}
                            />
                            <TouchableOpacity onPress={() => setIsEmojiModalVisible(false)}>
                                <Text style={styles.modalCloseButton}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Pressable
                    style={styles.emojiButton}
                    onPress={() => setIsEmojiModalVisible(true)}
                >
                    <Emoji name="grinning" style={styles.emojiIcon} />
                </Pressable>
                <TextInput
                    style={styles.messaginginput}
                    onChangeText={(value) => setMessage(value)}
                    value={message}
                />
                <Pressable
                    style={styles.messagingbuttonContainer}
                    onPress={handleNewMessage}
                >
                    <View>
                        <Text style={styles.sendButtonText}>SEND</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    );
};

export default Messaging;
