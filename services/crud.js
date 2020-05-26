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
userRef.onSnapshot(function(snapshotData) {
    let posts = [];
    snapshotData.forEach(function(doc) {
      let post = doc.data();
      console.log(post);
      post.id = doc.id;
      posts.push(post);
    });
    appendUsers(posts);
  });

// append users to the DOM
function appendUsers(users) {
    let htmlTemplate = "";
    for (let user of users) {
      console.log(user.id);
      console.log(user.name);
      htmlTemplate += `
      <article>
        <h2>${user.name}</h2>
        <p><a href="mailto:${user.mail}">${user.mail}</a></p>
        <button onclick="selectUser('${user.id}','${user.name}', '${user.mail}')">Update</button>
        <button onclick="deleteUser('${user.id}')">Delete</button>
      </article>
      `;
    }
    document.querySelector('#content').innerHTML = htmlTemplate;
  }