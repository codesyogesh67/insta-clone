import react from "react";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAOJSL_eZSXS48Th3HM_82z7Hy9XJRKlXc",
  authDomain: "insta-b1d47.firebaseapp.com",
  databaseURL: "https://insta-b1d47.firebaseio.com",
  projectId: "insta-b1d47",
  storageBucket: "insta-b1d47.appspot.com",
  messagingSenderId: "435688383156",
  appId: "1:435688383156:web:a792a1bd38ba0620596de1",
  measurementId: "G-B77WDR8K2W",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
