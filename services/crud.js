// import { map } from "./../main.js";
"use strict";

class CrudService {
    constructor() {
    };

  // Your web app's Firebase configuration
  firebaseConfig = {
    apiKey: "AIzaSyDekBcVlEX7Txg1nT1YFMQx1QI6z1-m0lk",
    authDomain: "caminofh.firebaseapp.com",
    databaseURL: "https://caminofh.firebaseio.com",
    projectId: "caminofh",
    storageBucket: "caminofh.appspot.com",
    messagingSenderId: "741677566222",
    appId: "1:741677566222:web:1d3cc8c3a0421ee2a0ef5f"
  };
  // Initialize Firebase
  firebase;initializeApp(firebaseConfig);
  db = firebase.firestore();
  postRef = db.collection("posts");

};

// ========== READ ==========
// watch the database ref for changes
postRef.onSnapshot(function(snapshotData) {
    let posts = [];
    snapshotData.forEach(function(doc) {
      let post = doc.data();
      console.log(post);
      post.id = doc.id;
      posts.push(post);
    });
    appendPosts(posts);
  });

// append users to the DOM
function appendPosts(posts) {
    let htmlTemplate = "";
    for (let post of posts) {
      console.log(post.id);
      console.log(post.name);
      htmlTemplate += `
      <article>
        <h2>${post.image}</h2>
        <p>${post.text}</p>
        <p>${post.name}</p>
        <button></button>
      </article>
      `;
    }
    document.querySelector('#comments').innerHTML = htmlTemplate;
  }