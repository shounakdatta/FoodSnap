import firebase from 'firebase/app'
import 'firebase/storage'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCUOgF5F1rNg2AKbKvEpKox5SRzdpI73cA",
    authDomain: "fir-onboarding-4cd34.firebaseapp.com",
    databaseURL: "https://fir-onboarding-4cd34.firebaseio.com",
    projectId: "fir-onboarding-4cd34",
    storageBucket: "fir-onboarding-4cd34.appspot.com/",
    messagingSenderId: "266893372238",
    appId: "1:266893372238:web:1c26f7d61f9470a8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage()

export {
    storage, firebase as default
}