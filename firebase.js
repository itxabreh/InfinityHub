import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyA7JXuM6McZkC6T5uXcfSIvnZ0iP6z2FWM",
    authDomain: "fir-login-34c00.firebaseapp.com",
    projectId: "fir-login-34c00",
    storageBucket: "fir-login-34c00.appspot.com",
    messagingSenderId: "1065439905770",
    appId: "1:1065439905770:web:2a8568561045f55a6038bb"
  };
if(!firebase.apps.length)
  {
    firebase.initializeApp(firebaseConfig);
  }


export {firebase};
