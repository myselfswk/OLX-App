import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBm0J3Ajs0RnTSsDqOqTDSEk9sPCy2Y34g",
    authDomain: "olxapp-reactapp-saylani.firebaseapp.com",
    databaseURL: "https://olxapp-reactapp-saylani.firebaseio.com",
    projectId: "olxapp-reactapp-saylani",
    storageBucket: "olxapp-reactapp-saylani.appspot.com",
    messagingSenderId: "215949963501",
    appId: "1:215949963501:web:d399adfb354db7073d5ce4",
    measurementId: "G-4D6TGSDWX7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

//create variable for database, storage and auth
const db = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();

export {
    db,
    auth,
    storage
}