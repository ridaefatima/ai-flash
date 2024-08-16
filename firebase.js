import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOJWjjXunvDEWSvcAIi-G_itvPWH59ICQ",
  authDomain: "aiflash-b5836.firebaseapp.com",
  projectId: "aiflash-b5836",
  storageBucket: "aiflash-b5836.appspot.com",
  messagingSenderId: "777172147580",
  appId: "1:777172147580:web:7078aa3298534f4f9198f9",
  measurementId: "G-9VZX53LW9T"
};

// Initialize Firebase
let app, db, analytics;

if (typeof window !== 'undefined') {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);

  // Initialize analytics only if supported in the environment
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { db, analytics };
