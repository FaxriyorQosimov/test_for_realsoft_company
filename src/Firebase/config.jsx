import { initializeApp } from 'firebase/app'
import { getFirestore } from '@firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyCqjetUKkmCIkxmBqHe3t-gf6jR6D5UT9k",
    authDomain: "maxway-732c7.firebaseapp.com",
    projectId: "maxway-732c7",
    storageBucket: "maxway-732c7.appspot.com",
    messagingSenderId: "1035017702445",
    appId: "1:1035017702445:web:6d9f480c86470c80ca3ca4",
    measurementId: "G-RY4RNGEKPD"
  };

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app)