import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Text } from "@rneui/base";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login",
    });
  }, [navigation]);
  // const register = () => {
  //   auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((authUser) => {
  //       authUser.currentUser.updateProfile({
  //         displayName: name,
  //         photoURL:
  //           imageUrl ||
  //           "https://cdn.pixabay.com/photo/2014/04/03/11/56/avatar-312603_640.png",
  //       });
  //     })
  //     .catch((error) => alert(error.message));
  // };
  const register = async () => {
    if (name.length == 0) {
      alert("name cannot be empty");
    } else {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(`User ${user.uid} created`);
      await updateProfile(user, {
        displayName: name,
        photoURL:
          imageUrl ||
          "https://cdn.pixabay.com/photo/2014/04/03/11/56/avatar-312603_640.png",
      });
      console.log("User profile updated");
    }
  };

  // const register = () => {
  //   e.preventDefault();
  //   // for registration
  //   createUserWithEmailAndPassword(auth, email, password).then(
  //     (userCredential) => {
  //       // Signed in
  //       const user = userCredential.user;
  //       // ...
  //     }
  //   );
  // };
  // updateProfile(auth.currentUser, {
  //   displayName: name,
  //   photoURL:
  //     imageUrl ||
  //     "https://cdn.pixabay.com/photo/2014/04/03/11/56/avatar-312603_640.png",
  // })
  //   .then(() => console.log("User Updated"))
  //   .catch((error) => alert(error.message));
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Text h3 style={{ marginBottom: 50 }}>
        Create a Signal account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          autofocus
          type="text"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          secureTextEntry
          placeholder="Password"
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Profile Picture URL (optional)"
          type="text"
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          onSubmitEditing={register}
        />
      </View>
      <Button
        raised
        containerStyle={styles.button}
        onPress={register}
        title="Register"
      />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  button: {
    width: 200,
    marginTop: 10,
  },
  inputContainer: {
    width: 300,
  },
});
