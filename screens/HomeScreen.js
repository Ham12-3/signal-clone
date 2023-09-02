import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomListItem from "../components/CustomListItem";
import { Avatar } from "@rneui/base";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
const HomeScreen = ({ navigation }) => {
  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => {
        <View style={{}}></View>;
      },
    });
  }, []);
  return (
    // <SafeAreaView>
    <ScrollView>
      <CustomListItem />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
