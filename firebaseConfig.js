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
let isConnected = true;

if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
    
    initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage)
    });
    
    // Firestore için offline depolama ayarları
    firebase.firestore().settings({
        cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
        merge: true,
        // Çoklu sekme desteği ile kalıcılık özelliğini etkinleştir
        persistence: true,
        synchronizeTabs: true
    });
}

const firestore = firebase.firestore();

// Ağ bağlantısını etkinleştir ve durumunu izle
firebase.firestore().enableNetwork()
    .then(() => {
        console.log('Network bağlantısı başarılı');
        isConnected = true;
    })
    .catch((err) => {
        console.error('Network bağlantı hatası:', err);
        isConnected = false;
    });

// Bağlantı durumunu gerçek zamanlı izleme
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

export { firebase, firestore };
