import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCFJpwHV1q2bT0UuQ5yuTDV5dKkX6lCnik",
    authDomain: "cvmaker-picksoso.firebaseapp.com",
    projectId: "cvmaker-picksoso",
    storageBucket: "cvmaker-picksoso.firebasestorage.app",
    messagingSenderId: "335512632108",
    appId: "1:335512632108:web:1792e749aeca39e7ce0a89",
    measurementId: "G-CC1LVV853P"
};

if (!firebase.apps.length) {
    const app = firebase.initializeApp(firebaseConfig);
    
    initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage)
    });
}

const firestore = firebase.firestore();

export { firebase, firestore }; 