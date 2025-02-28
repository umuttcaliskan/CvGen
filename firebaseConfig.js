import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'; // Firestore'u içe aktar

const firebaseConfig = {
    apiKey: "AIzaSyCykOQkK07hUbrhiFfl6J8ma7cCb1H4ipQ",
    authDomain: "resumebuilder-picksoso.firebaseapp.com",
    projectId: "resumebuilder-picksoso",
    storageBucket: "resumebuilder-picksoso.firebasestorage.app",
    messagingSenderId: "934278391962",
    appId: "1:934278391962:web:6068955921992528ac5723",
    measurementId: "G-X6Z55TCGQK"
};

let app;

if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
    
    initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage)
    });
}

const firestore = firebase.firestore();

export { firebase, firestore };
