import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

const app = initializeApp({
    apiKey: "AIzaSyB496KZngJvVAps3rAxBMeTgY1qCISrVrI",
    authDomain: "redwoods-road-trip-73938.firebaseapp.com",
    projectId: "redwoods-road-trip-73938",
    storageBucket: "redwoods-road-trip-73938.firebasestorage.app",
    messagingSenderId: "722841393597",
    appId: "1:722841393597:web:9c6d5ea1794a93de9f1ad4"
});

export const db = getFirestore(app);
