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

  // Code to create new user in our Firestore database/documents repository
  export const createUserProfileDocument = async (userAuth, additionalData) => {
      if(!userAuth) return;

      //First pull the uid of the authenticated user - whoever authenticated using a 3rd party platform account
      const userRef = firestore.doc(`users/${userAuth.uid}`);
      
      const snapShot = await userRef.get();

      // checks to make sure user is not already part of our database/firestore documents repository. If not, adds them to it
      if (!snapShot.exists) {
          const { displayName, email } = userAuth;
          const createdAt = new Date();

          // error checking in case something happens when creating the new user in our DB
          try {
           await userRef.set({
               displayName,
               email,
               createdAt,
               ...additionalData
           })
          } catch (error) {
            console.log('error creating user', error.message);
          }
      }
    
      // return the user object for it to be included the below firebase export so it is available to other areas of your app
     return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
