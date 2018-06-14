import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyDnRDcIUDxC_sQDbkQZ1dp5PfSv9T9BSEY",
    authDomain: "itinerary-38527.firebaseapp.com",
    databaseURL: "https://itinerary-38527.firebaseio.com",
    projectId: "itinerary-38527",
    storageBucket: "itinerary-38527.appspot.com",
    messagingSenderId: "753355051318"
  };
firebase.initializeApp(config);
export default firebase;