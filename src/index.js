import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import firebase from 'firebase';

// var config = {
//     apiKey: "AIzaSyDnRDcIUDxC_sQDbkQZ1dp5PfSv9T9BSEY",
//     authDomain: "itinerary-38527.firebaseapp.com",
//     databaseURL: "https://itinerary-38527.firebaseio.com",
//     projectId: "itinerary-38527",
//     storageBucket: "itinerary-38527.appspot.com",
//     messagingSenderId: "753355051318"
//   };

// firebase.initializeApp(config);

ReactDOM.render(
    <App />, 
    document.getElementById('root')
);
registerServiceWorker();
// export default firebase;