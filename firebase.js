import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDfEUhUQUMK4NvQ6j8VDUV6mUFkVmIw6dQ",
  authDomain: "signal-clone-yt-40bef.firebaseapp.com",
  projectId: "signal-clone-yt-40bef",
  storageBucket: "signal-clone-yt-40bef.appspot.com",
  messagingSenderId: "695306806552",
  appId: "1:695306806552:web:2a006961140e36cc1f2a6d",
};

let app;

if (firebase.app.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();

const auth = firebase.auth();

export { db, auth };
