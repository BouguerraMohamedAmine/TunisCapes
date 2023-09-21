import { View, Text, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../styles";

const ChatComponent = ({ item }) => {
    const navigation = useNavigation();

    const handleNavigation = () => {
        navigation.navigate("Messaging", {
            id: item.id,
            name: item.name,
            initialMessages: item.messages,
        });
    };

    return (
        <Pressable style={styles.cchat} onPress={handleNavigation}>
            <Ionicons
                name='person-circle-outline'
                size={45}
                color='black'
                style={styles.cavatar}
            />
            <View style={styles.crightContainer}>
                <View>
                    <Text style={styles.cusername}>{item.name}</Text>
                    <Text style={styles.cmessage}>
                        {item.messages[0]?.text || "Tap to start chatting"}
                    </Text>
                </View>
                <View>
                    <Text style={styles.ctime}>
                        {item.messages[0]?.time || "now"}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
};

export default ChatComponent;
