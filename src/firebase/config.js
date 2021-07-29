import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBE87WWYYMY2ka0zDIVsTzC7mgCAayeRO0",
  authDomain: "chatroom-57.firebaseapp.com",
  projectId: "chatroom-57",
  storageBucket: "chatroom-57.appspot.com",
  messagingSenderId: "7982707046",
  appId: "1:7982707046:web:90e80017cbb5600b8ad8a7",
};

// init fireabase
firebase.initializeApp(firebaseConfig);

const projectAuth = firebase.auth();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectAuth, timestamp };
