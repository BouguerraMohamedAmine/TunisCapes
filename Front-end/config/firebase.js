import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";
// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDDL9Hp1gBUdHtNRpohAohWzPPXnlP2hmE",
  authDomain: "tuniscapes.firebaseapp.com",
  projectId: "tuniscapes",
  storageBucket: "tuniscapes.appspot.com",
  messagingSenderId: "485737599364",
  appId: "1:485737599364:web:f8b837f9fed8db70dccdd1",
  measurementId: "G-J0QGTNFWYR"
};// initialize firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();
