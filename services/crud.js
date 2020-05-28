// import { map } from "./../main.js";
class CrudService {
  constructor() {
    this._dataRef = _db.collection("posts")
    this.read()
    this._posts = [];
    //this.appendPosts(this._posts);
   

    // this.myFunctionModal(x) // Call listener function at run time
 
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
          <div class="sayText">
          <p>"${post.text}"</p>
          <p>-${post.name}</p>
           
        </div>
        <div class="sayImage">
          <img src="${post.image}">
         
        </div>
        <a class="prev" onclick="plusSlides(-1, ${etapeNr})">&#10094;</a>
        <a class="next" onclick="plusSlides(1, ${etapeNr})">&#10095;</a>
      <div>
    `;
      }
    }

    // document.querySelector(`#content${etape}`).innerHTML = htmlTemplate;
  }

  // ========== CREATE ==========
// add a new user to firestore (database)
createUser() {
  // references to the input fields
  let nameInput = document.querySelector('.name');
  let textInput = document.querySelector('.text');
  let imageInput = document.querySelector('.image');
  console.log(nameInput.value);
  console.log(textInput.value);
  console.log(imageInput.value);

  let newPost = {
    name: nameInput.value,
    text: textInput.value,
    image: textInput.value
  };

  this._dataRef.add(newPost);
} 

// When the user clicks on the button, open the modal
myFunctionModal(number) {
   // Get the modal
   let modalSay = document.getElementById(`commentsModal${number}`);
  modalSay.style.display = "block";
    };

closeFunction(element) {
// When the user clicks on <span> (x), close the modal
element.parentElement.parentElement.style.display = "none";
}

/* // When the user clicks anywhere outside of the modal, close it
closeOutsideModal(event, number) {
 // Get the modal
 let modalSay = document.getElementById(`commentsModal${number}`);

  if (event.target == modalSay) {
    modalSay.style.display = "none";
  } 
} */









}

const crudService = new CrudService();
export default crudService;