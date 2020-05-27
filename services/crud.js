// import { map } from "./../main.js";
import HomePage from "../pages/home.js"
class crudService {
  constructor() {
    this._dataRef = _db.collection("posts")
    this._posts;
    this.read()
    this.appendPosts(this._posts);
  };


  // ========== READ ==========
  // 1: data from firebase
  // watch the database ref for changes
  read() {
    _dataRef.onSnapshot(snapshotData => {
      this._posts = []; // reset _posts
      snapshotData.forEach(doc => { // loop through snapshotData - like for of loop
        let post = doc.data(); // save the data in a variable
        console.log(post);
        post.id = doc.id; // add the id to the data variable
        this._posts.push(post); // push the data object to the global array  _posts
      });
    });
  }

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
    document.querySelector(`#comments${post.acf.stageNumber}`).innerHTML = htmlTemplate;
  }

}

const crudService = new CrudService();
export default crudService;