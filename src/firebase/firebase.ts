import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6awGcOAz1l2PRbnSuoqHa95e1AKnBvv0",
  authDomain: "christmas-game-1.firebaseapp.com",
  databaseURL: "https://christmas-game-1.firebaseio.com",
  projectId: "christmas-game-1",
  storageBucket: "christmas-game-1.appspot.com",
  messagingSenderId: "450486323276",
  appId: "1:450486323276:web:27feff8e9e4faae4b30ce9",
  measurementId: "G-BB3KRY7D64"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.auth().signInAnonymously()

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  })
};

export { firebase, getCurrentUser }