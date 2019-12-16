import * as firebase from "firebase";

const fb = firebase.initializeApp({
  apiKey: 'AIzaSyC87aqhjAAr2XkfSTayVdsn9FSc6HjZvQM',
  authDomain: 'todo-list-93697.firebaseapp.com',
  databaseURL: 'https://todo-list-93697.firebaseio.com',
  storageBucket: 'todo-list-93697.appspot.com',
  projectId: 'todo-list-93697',
});

export default fb;
