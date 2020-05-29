// import { map } from "./../main.js";
class CrudService {
  constructor() {
    this._dataRef = _db.collection("posts")
    this.read()
    this._posts = [];
   

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


  // --------------- Append posts from Wordpress - Helle ---------------
  // Starts with setting the content of the element #contentX to empty
  // Sets the totel amount of posts to 0, and the current post number to 0
  // Iterates through the posts. For every post where the etapeNr is equal to the post.etape number
  // the total number of posts goes up with 1
  // If the total amount of posts is 0, forst statment will be printet, else second statement will be printet.


  appendPosts(etapeNr) {

    document.querySelector(`#content${etapeNr}`).innerHTML = "";
    let total = 0;
    let currentNumber = 0;

    for (let post of this._posts) {
      if (etapeNr === post.etape) {
        total += 1
      }
    }
    if (total < 1) {
      document.querySelector(`#content${etapeNr}`).innerHTML += `
    <div class="mySlides fade">
      <div class="numbertext">${currentNumber} / ${total}</div>
        <div class="say">
          <div class="sayImage">
          </div>
          <div class="sayText">
          <p>Der er endnu ingen beretninger fra denne etape. Skal du være den første?</p>
          </div>
        </div>
    </div>`
    };

    for (let post of this._posts) {
      if (etapeNr === post.etape) {
        number += 1
        document.querySelector(`#content${post.etape}`).innerHTML += `
      <div class="mySlides fade">
        <div class="numbertext">${currentNumber} / ${total}</div>
        <div class="say">
        <div class="sayImage">
          <img src="${post.image}">
        </div>
          <div class="sayText">
          <p>"${post.text}"</p>
          <p>-${post.name}</p>
        </div>

        
        <a class="prev" onclick="plusSlides(-1, ${etapeNr})">&#10094;</a>
        <a class="next" onclick="plusSlides(1, ${etapeNr})">&#10095;</a>
      <div>
    `;
      }
    }
  }

  // --------------- Append posts from Wordpress - End ---------------


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
    image: imageInput.value
  };

  this._dataRef.add(newPost);
} 

previewImage(file, previewId) {
  if (file) {
    _selectedImgFile = file;
    let reader = new FileReader();
    reader.onload = (event) => {
      document.querySelector('#' + previewId).setAttribute('src', event.target.result);
    };
    reader.readAsDataURL(file);
  }
}

triggerChooseImg() {
  document.querySelector("#img").click();
}

  // ========== MODAL ==========

// When the user clicks on the button, open the modal
myFunctionModal(number) {
   // Get the modal
   let modalSay = document.getElementById(`commentsModal${number}`);
  modalSay.style.display = "block";
    };

  // When the user clicks on the button, open the modal
  myFunctionModal(number) {
    // Get the modal
    let modalSay = document.getElementById(`commentsModal${number}`);
    modalSay.style.display = "block";
  };

/* // When the user clicks anywhere outside of the modal, close it
closeOutsideModal(event, number) {
 // Get the modal
 let modalSay = document.getElementById(`commentsModal${number}`);
  closeFunction(element) {
    // When the user clicks on <span> (x), close the modal
    element.parentElement.parentElement.style.display = "none";
  }

  triggerChooseImg() { // Trigger den knap der hedder vælg fil
    this.$refs.fileInput.click() // knap der selv er lavet
  }

  previewImage() {
    const imageFile = this.$refs.fileInput.files[0]
    const fileReader = new FileReader() // læser filen, så vi kan få en src ud af den så vi kan vise det er et img tag
    fileReader.onload = (event) => {
      this.newPost.image = event.target.result // smider billedet ind i selve variablen
      console.log(this.newPost.image);

    }
    fileReader.readAsDataURL(imageFile)
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