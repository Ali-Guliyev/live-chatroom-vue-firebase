import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGFcW-VHptnDZZ71n5oebCsOewxOaPshY",
  authDomain: "vue-firebase-sites-48878.firebaseapp.com",
  projectId: "vue-firebase-sites-48878",
  storageBucket: "vue-firebase-sites-48878.appspot.com",
  messagingSenderId: "1059987544565",
  appId: "1:1059987544565:web:69371967158bdcec41a8bc",
};

// init fireabase
firebase.initializeApp(firebaseConfig);

const projectAuth = firebase.auth();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectAuth, timestamp };
