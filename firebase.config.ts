import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyCFJpwHV1q2bT0UuQ5yuTDV5dKkX6lCnik",
    authDomain: "cvmaker-picksoso.firebaseapp.com",
    projectId: "cvmaker-picksoso",
    storageBucket: "cvmaker-picksoso.appspot.com",
    messagingSenderId: "335512632108",
    appId: "1:335512632108:web:1792e749aeca39e7ce0a89",
    measurementId: "G-CC1LVV853P"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);


    firebase.firestore().settings({
        cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
    });

    firebase.firestore().enablePersistence({
        synchronizeTabs: true
    }).catch((err) => {
        if (err.code === 'failed-precondition') {
            console.warn('Persistence failed: Multiple tabs open');
        } else if (err.code === 'unimplemented') {
            console.warn('Persistence is not available');
        }
    });

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .catch((error) => {
            console.error('Auth persistence error:', error);
        });
}

const firestore = firebase.firestore();
const auth = firebase.auth();

let isConnected = true;

firebase.firestore().enableNetwork()
    .then(() => {
        console.log('Network bağlantısı başarılı');
        isConnected = true;
    })
    .catch((err) => {
        console.error('Network bağlantı hatası:', err);
        isConnected = false;
    });

firestore.collection('_').onSnapshot(() => {
    if (!isConnected) {
        console.log('Network bağlantısı geri geldi');
        isConnected = true;
    }
}, (error) => {
    if (error.code === 'unavailable') {
        console.log('Network bağlantısı koptu');
        isConnected = false;
    }
});

export { firebase, firestore, auth }; 