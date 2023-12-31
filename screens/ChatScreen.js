import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Avatar } from "@rneui/base";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
// import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import firebase from "firebase/compat/app";
import { db, auth } from "../firebase";
const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerTitleAlign: "Left",
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            rounded
            source={{
              uri:
                messages[0]?.data.photoURL ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
            }}
          />
          <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity>
          {/* <AntDesign name="arrowleft" size={24} color="white" /> */}
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, messages]);

  const sendMessage = () => {
    Keyboard.dismiss();
    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });

    setInput("");
  };

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;
  }, [route]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.IOS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            activeOpacity={0.5}
          >
            <>
              <ScrollView contentContainerStyle={{ padding: 15 }}>
                {messages.map(({ id, data }) =>
                  data.email === auth.currentUser.email ? (
                    <View key={id} style={styles.receiver}>
                      <Avatar
                        position="absolute"
                        bottom={-15}
                        containerStyle={{
                          position: "absolute",
                          bottom: -15,
                          right: -5,
                        }}
                        right={-5}
                        size={30}
                        rounded
                        source={{
                          uri: data.photoURL,
                        }}
                      />
                      <Text style={styles.receiverText}>{data.message}</Text>
                    </View>
                  ) : (
                    <View key={id} style={styles.sender}>
                      <Avatar
                        position="absolute"
                        bottom={-15}
                        containerStyle={{
                          position: "absolute",
                          bottom: -15,
                          left: -5,
                        }}
                        right={-5}
                        size={30}
                        rounded
                        source={{
                          uri: data.photoURL,
                        }}
                      />
                      <Text style={styles.senderText}>{data.message}</Text>
                      <Text style={styles.senderName}>{data.displayName}</Text>
                    </View>
                  )
                )}
              </ScrollView>
              <View style={styles.footer}>
                <TextInput
                  onSubmitEditing={sendMessage}
                  placeholder="Signal Message"
                  style={styles.textInput}
                  value={input}
                  onChangeText={(text) => setInput(text)}
                />
                <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                  <Ionicons name="send" size={24} color="#2B6BE6" />
                </TouchableOpacity>
              </View>
            </>
          </TouchableWithoutFeedback>
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  senderText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 15,
  },
  receiverText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white",
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    borderWidth: 1,
    padding: 10,
    color: "gray",
    borderRadius: 30,
  },
  receiverText: {},
  receiver: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#2B6BE6",
    alignSelf: "flex-start",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
});
