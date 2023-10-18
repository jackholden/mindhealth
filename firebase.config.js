/**
 * @file Handles all the firebase initialising and config data
 * @author Jack Holden
 */

import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Firebase config provided by Google
 */
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "ubicomp-mindhealth",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

/**
 * Responsible for Firebase app initialisation
 */
const app = initializeApp(firebaseConfig);

/**
 * Responsible for Firebase auth initialisation.
 */
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

/**
 * Responsible for Firestore interaction.
 */
const db = getFirestore();

export { auth, db };
