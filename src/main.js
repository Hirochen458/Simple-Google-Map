// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//import firebase from 'firebase'
import firebase from 'firebase/app';
import "semantic-ui-css/semantic.min.css";
require('firebase/database');

var app = firebase.initializeApp({
  apiKey: "AIzaSyBuB1l8grZngQTz6nj7MKjYHkKuPdzcoDY",
    authDomain: "elegant-moment-412815.firebaseapp.com",
    projectId: "elegant-moment-412815",
    storageBucket: "elegant-moment-412815.appspot.com",
    messagingSenderId: "560739199363",
    appId: "1:560739199363:web:7366d3b817c58d1b232eb6",
    measurementId: "G-M4XMB4XJ2P"
});

console.log(app);

// //Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// //TODO: Add SDKs for Firebase products that you want to use
// //https://firebase.google.com/docs/web/setup#available-libraries

// //Your web app's Firebase configuration
// //For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBuB1l8grZngQTz6nj7MKjYHkKuPdzcoDY",
//   authDomain: "elegant-moment-412815.firebaseapp.com",
//   projectId: "elegant-moment-412815",
//   storageBucket: "elegant-moment-412815.appspot.com",
//   messagingSenderId: "560739199363",
//   appId: "1:560739199363:web:7366d3b817c58d1b232eb6",
//   measurementId: "G-M4XMB4XJ2P"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
