import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'

let firebaseConfig = {
    apiKey: "AIzaSyARcDXdliF5JwP0AJY2n7_3vMw0-g70JGM",
    authDomain: "futevolei-11738.firebaseapp.com",
    projectId: "futevolei-11738",
    storageBucket: "futevolei-11738.appspot.com",
    messagingSenderId: "278876214113",
    appId: "1:278876214113:web:604e01f31e096876776b20",
    measurementId: "G-PYCPEV4NPC"
  };

  if(! firebase.apps.length) {
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
    }

export default firebase;