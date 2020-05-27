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
        this._posts.push(post); // push the data object to the global array  _posts
      });
    });
  }

  // append users to the DOM
  appendPosts() {
    console.log(this._posts);
    let htmlTemplate = "";
    let etape;
    for (let post of this._posts) {
      etape = post.etape
      htmlTemplate += `
      <div class="mySlides fade">
      <p>"${post.text}"</p>
      <p>-${post.name}</p>
      </div>
  
      <div>
      <img src="${post.image}">
      </div>
    `;
    }

    document.querySelector(`#content${etape}`).innerHTML = htmlTemplate;
  }









}

const crudService = new CrudService();
export default crudService;