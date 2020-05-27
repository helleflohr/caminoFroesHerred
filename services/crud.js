// import { map } from "./../main.js";

class CrudService {
    constructor() {
        this._dataRef = _db.collection("posts")
        this.read()
        this._posts = [];
        //this.appendPosts(this._posts);
    };


// ========== READ ==========
// 1: data from firebase
// watch the database ref for changes
read() {
 this._dataRef.onSnapshot(snapshotData => {
    snapshotData.forEach(doc => { // loop through snapshotData - like for of loop
      let post = doc.data(); // save the data in a variable
      console.log(post); 
      post.id = doc.id; // add the id to the data variable
      this._posts.push(post);  // push the data object to the global array  _posts
    });
  });
}

// append users to the DOM
appendPosts(posts) {
  console.log(posts);
    let htmlTemplate = "";
    for (let post of posts) {
    console.log(post.id);
    console.log(post.name);
      htmlTemplate += `
      <article>
        <img src="${post.image}">
        <p>${post.text}</p>
        <p>${post.name}</p>
        <button></button>
      </article>
      `;
    }
    document.querySelector(`#comments${post.etape}`).innerHTML = htmlTemplate;
    console.log(post.etape);
    
  }

}

const crudService = new CrudService();
export default crudService;