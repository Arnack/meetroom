import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB5P0AIbxKzHsjFrThNOwCsWnF0i4niF6s",
    authDomain: "speaking-club-f98fd.firebaseapp.com",
    databaseURL: "https://speaking-club-f98fd.firebaseio.com",
    projectId: "speaking-club-f98fd",
    storageBucket: "speaking-club-f98fd.appspot.com",
    messagingSenderId: "169469776484",
    appId: "1:169469776484:web:76fb149f8f6148b8170571",
    measurementId: "G-DVQDJ8SCJR"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };
