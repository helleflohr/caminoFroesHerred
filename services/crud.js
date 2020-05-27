// import { map } from "./../main.js";
"use strict";

class CrudService {
    constructor() {
        this.appendPosts();
    };

// ========== GLOBAL VARIABLES ========== //
_dataRef = _db.collection("posts")
_posts;

// ========== READ ==========
// 1: data from firebase
// watch the database ref for changes
_dataRef.onSnapshot(snapshotData => {
    _posts = []; // reset _posts
    snapshotData.forEach(doc => { // loop through snapshotData - like for of loop
      let post = doc.data(); // save the data in a variable
      console.log(post); 
      post.id = doc.id; // add the id to the data variable
      _posts.push(post);  // push the data object to the global array  _posts
    });
  });

// append users to the DOM
appendPosts(posts) {
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
}

const crudService = new CrudService();
export default crudService;