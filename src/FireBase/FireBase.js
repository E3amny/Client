import firebase from "firebase/compat/app";
import "firebase/compat/storage";


const firebaseConfig = {
    apiKey: "AIzaSyDEOd6kTMYTwdv7Ego7ao1Fl8LzO-xM2y0",
    authDomain: "ed3amny-94fb8.firebaseapp.com",
    projectId: "ed3amny-94fb8",
    storageBucket: "ed3amny-94fb8.appspot.com",
    messagingSenderId: "983338731591",
    appId: "1:983338731591:web:058342e02b87477fcf4962",
    measurementId: "G-01MLL0B924",
};
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
