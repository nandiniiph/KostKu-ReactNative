import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC_BdinEmPOgQUfSb9LSVuW3lUXGBGWXY4",
  authDomain: "kostku-1a877.firebaseapp.com",
  projectId: "kostku-1a877",
  storageBucket: "kostku-1a877.firebasestorage.app",
  messagingSenderId: "307937264209",
  appId: "1:307937264209:web:01aefe260f6cc061c5ae70",
  measurementId: "G-4QC0VNPSE3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db };
