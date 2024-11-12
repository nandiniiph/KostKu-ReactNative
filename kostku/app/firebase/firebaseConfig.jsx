//app/firebase/firebaseConfig.jsx
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase config object (replace with your Firebase config)
const firebaseConfig = {
  apiKey: "AIzaSyBEZhjoka0uXrPYUihCzmwY5Kq8CaeLQCg",
  authDomain: "mybookapp-80384.firebaseapp.com",
  projectId: "mybookapp-80384",
  storageBucket: "mybookapp-80384.firebasestorage.app",
  messagingSenderId: "494469583548",
  appId: "1:494469583548:web:ea1cb5f31663a22362f6b9",
  measurementId: "G-EREH2DXVTZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
