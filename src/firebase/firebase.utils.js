import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyBIXJsXPU7fpIY6YXMZCCO4U8Sjoa2Gvz4",
    authDomain: "crwn-db-802dc.firebaseapp.com",
    projectId: "crwn-db-802dc",
    storageBucket: "crwn-db-802dc.appspot.com",
    messagingSenderId: "890520487489",
    appId: "1:890520487489:web:8562f7e5bacb2e8a1328c0",
    measurementId: "G-2VG51DPL2D"
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
  