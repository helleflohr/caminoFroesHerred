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
        // console.log(post);
        post.id = doc.id; // add the id to the data variable
        this._posts.push(post); // push the data object to the global array  _posts
      });
    });
  }

  // append users to the DOM
  appendPosts(etapeNr) {

    document.querySelector(`#content${etapeNr}`).innerHTML = "";


    for (let post of this._posts) {
      if (etapeNr === post.etape) {
        document.querySelector(`#content${post.etape}`).innerHTML += `
      <div class="mySlides fade">
        <div class="numbertext">x / y</div>
        <div class="say">
          <div class="sayText"></div>
          <p>"${post.text}"</p>
          <p>-${post.name}</p>
           
        </div>
        <div class="sayImage">
          <img src="${post.image}">
          <a class="prev" onclick="plusSlides(-1, ${etapeNr})">&#10094;</a>
        <a class="next" onclick="plusSlides(1, ${etapeNr})">&#10095;</a>
        </div>
       
      <div>
      
      </div>
    `;
      }
    }

    // document.querySelector(`#content${etape}`).innerHTML = htmlTemplate;
  }









}

const crudService = new CrudService();
export default crudService;