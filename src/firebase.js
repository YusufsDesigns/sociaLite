import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDQRtIydXSBxu3BAQj5Q9iwHKkUIZyeHQc",
    authDomain: "socialite-media.firebaseapp.com",
    projectId: "socialite-media",
    storageBucket: "socialite-media.appspot.com",
    messagingSenderId: "1076270194959",
    appId: "1:1076270194959:web:d401d3a5bae90b2050de7a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase exports
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const facebookProvider = new FacebookAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)