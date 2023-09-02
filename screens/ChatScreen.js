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
const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
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
              uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
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
  }, []);

  const sendMessage = () => {
    Keyboard.dismiss();
  };
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
              <ScrollView></ScrollView>
              <View style={styles.footer}>
                <TextInput
                  placeholder="Signal Message"
                  style={styles.textInput}
                  value={input}
                  onChangeText={(text) => setInput(value)}
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
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
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
});
