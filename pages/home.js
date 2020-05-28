import fetchService from "./../services/fetch.js"
import crudService from "./../services/crud.js"
import slideService from "./../services/slide.js"
export default class HomePage {
  constructor() {
    this.template();
    this.fetchDescription();
    /* this.showLoader(); */
  }

  template() {
    document.getElementById('content').innerHTML += /*html*/ `
      <section id="home" class="page ">
       <!-- <header class="topbar">
          <h2>Home</h2>
        </header> -->
          <!-- frontpage image and info bar -->
  <section id="frontpageImage" >
  <div id="frontpageLogoDiv">
  <img id="frontpageLogo" src="../images/cfhlogo.png">
  </div>
<div id="frontpageTextDiv">
  <h1> Camino Frøs Herred</h1>
  <h2>Åbner sig for natur, kultur og det åndelige</h2>
  </div>
  
  </section>

  <section id="frontpageSection" >
  <img class="arrow generalArrow" src="../images/ikoner/pil-generelt.svg">
    <div>
      <img src="../images/ikoner/generelt.svg">
    
      <h2>Generelt</h2>
      <p>Ruten er 108 km, som bølger sig rundt i det gamle Frøs Herred. Den byder på flere spændende oplevelser på
        højderyggen mellem Kongeåen og Gram Å, og grænser op til den gamle grænse fra 1864 og til 1920, som var en
        brydningstid for området </p>
    </div>
    <img class="arrow mapArrow" src="../images/ikoner/pil-kort.svg">
    <div>
    <img src="../images/ikoner/kort.svg">
   
      <h2 onclick="scrollToElement('mapid')">Kort</h2>
      <p>Du kan nemt få et overblik over hele Caminoen på kortet. Her kan du se alle 11 etaper, og vælge hvilken etape
        du ønsker information om. Du har også mulighed for at få et overblik og rutens faciliteter. Du kan også printe
        kortet hjemmefra og medbringe til turen </p>
    </div>
    <img class="arrow descriptionArrow" src="../images/ikoner/pil-rutebeskrivelser.svg">
    <div>
    <img src="../images/ikoner/rutebeskrivelser.svg">
 
      <h2 onclick="scrollToElement('stage1')">Rutebeskrivelser</h2>
      <p>Caminoen er inddelt i 11 etaper, som giver muligheden for at gå noget af ruten og derved træne op til at kunne
        gå hele Caminoen en dag. For hver etape er der rutebeskrivelser som udførligt vejleder dig gennem turen. Der er
        også billeder og udtalelser fra andre vandrere</p>
    </div>
  </section>

  <div class="maparea">
        
          <div id="mapid"></div>
          <div id="infoBox"></div>
          <div id="grid-posts" class="grid-container"></div>
        
        
      </section>
    `;
  }

  /*   ---------------------  Johanne ---------------------- */

  /* showLoader(show) {
    let loader = document.querySelector('#loader');
    if (show) {
      loader.classList.remove("hide");
    } else {
      loader.classList.add("hide");
    }
  } */

  fetchDescription() {
    fetch("http://dittejohannejustesen.dk/wordpress/wordpress-cfh/wp-json/wp/v2/posts?_embed&categories=2&per_page=15")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.descriptions = json;
        // console.log(this.descriptions)
        this.appendPosts(json)

        /* setTimeout(function() {
          //fjerner spinner efter load.
        showLoader(false);
        }, 200); */
      });
  }

  appendPosts(posts) {
    /* sort the posts by acf stagenumber in ascending order. */
    posts.sort(function (x, y) {
      return x.acf.stageNumber - y.acf.stageNumber;
    });

    for (let post of posts) {

      // console.log(post);
      document.querySelector("#grid-posts").innerHTML += `
    
    <article id="stage${post.acf.stageNumber}" class="grid-item" onmouseover="goTo(${post.acf.stageNumber})" onmouseout="goFrom(${post.acf.stageNumber})">

    <!--------- Etapeimages on the map ------->
      <section class="backgroundimg" style="background-image: url('${getFeaturedImageUrl(post)}')" onclick="chosen(${post.acf.stageNumber})" >
        <div id="text-backgroundimg">
          <div class="title-distance">
            <h3>${post.title.rendered}</h3>
            <h4> (${post.acf.distance} km)</h4>
          </div>
          <div class="start-end">
            <h5>${post.acf.startpoint}</h5> 
            -
            <h5>${post.acf.endpoint}</h5>
          </div>
        </div>
      </section>

      <!--------- dropdown with description, images and comments ------->
      <section class="dropdown">
        <ul id="tabs-swipe-demo" class="tabs">
          <li class="tabNav descriptionTab" onclick="tabs('description', ${post.acf.stageNumber})">Beskrivelse</li>
          <li class="tabNav imagesTab" onclick="tabs('images', ${post.acf.stageNumber}); bigImg(${post.acf.stageNumber})">Billeder</li>
          <li class="tabNav commentsTab" onclick="tabs('comments', ${post.acf.stageNumber}); appendPosts(${post.acf.stageNumber}); showSlides(${slideService.slideIndex}, ${post.acf.stageNumber})">Hvad siger andre?</li>
        </ul>
        <hr id="hr${post.acf.stageNumber}" />

        <!--------- description content ------->
        <div id="description${post.acf.stageNumber}">
          <div class="flexcontainer">
            <p class="zoom" onclick="zoomToStage(${post.acf.stageNumber})">Zoom til etape</p>
            <p class="zoom" onclick="zoomOut()">Zoom ud til hele ruten</p>
          </div>
          <div class="descriptionDiv">
         </div>
          <a class="gpx" href="geojson/Camino-Frøs-Herred-${post.acf.stageNumber}.gpx" download>Download GPX-fil (${post.acf.stageNumber})</a>
        </div>

        <!--------- images content ------->
        <div class="none" id="images${post.acf.stageNumber}"><div class="tabImages"></div></div>
  
        <!--------- comments content ------->
        <div class="none" id="comments${post.acf.stageNumber}">
          <article class="slideshow-container">
            <section>
              <section id="content${post.acf.stageNumber}"></section>
            </section>
            <a class="prev" onclick="plusSlides(-1, ${post.acf.stageNumber})">&#10094;</a>
            <a class="next" onclick="plusSlides(1, ${post.acf.stageNumber})">&#10095;</a>
          </article>

          <div>
          <p id="btnSay" class="zoom" onclick="myFunctionModal(${post.acf.stageNumber})">Hvad siger du?</p>
          </div>

          <section id="commentsModal${post.acf.stageNumber}" onclick="closeOutsideModal(this,${post.acf.stageNumber})" class="modal">
    <div class="modal-content">
    <span class="close" onclick="closeFunction(this)">&times;</span>
      <form class="postForm">
    <h2>Hvad siger du?</h2>
    <input type="text" class="formName" placeholder="Skrv dit navn" required>
    <input type="text" class="formText" placeholder="Skriv en kommentar" required>
    <input type="file" ref="fileInput" accept="image/*" onchange="previewImage()"> <!-- skjult via styling -->
    <button type="button" class="formImage" onclick="triggerChooseImg()" > Vælg billede </button>
    <div>
    <img src="" class="image-preview">
  </div>
    <p class="zoom" onclick="createUser()">Opret indlæg</p>
  </form>
  </div>
      </section>
        </div>
        
      </section>
    
    </article> `
      // console.log(post.acf, post.acf.images)
    }


  };

  // get the featured image url
  getFeaturedImageUrl(post) {
    let imageUrl = "";
    if (post._embedded['wp:featuredmedia']) {
      imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
    }
    return imageUrl;
  }

}