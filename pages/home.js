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
      <section id="home" class="page no-print">
       <!-- <header class="topbar">
          <h2>Home</h2>
        </header> -->
          <!-- frontpage image and info bar -->
  <section id="frontpageImage" class="no-print">
  <div id="frontpageLogoDiv">
  <img id="frontpageLogo" src="../images/cfhlogo.png">
  </div>
<div id="frontpageTextDiv">
  <h1> Camino Frøs Herred</h1>
  <h2>Åbner sig for natur, kultur og det åndelige</h2>
  </div>
  
  </section>

  <section id="frontpageSection" class="no-print">
    <div>
      <img src="../images/ikoner/generelt.svg">
      <h2>Generelt</h2>
      <p>Ruten er 108 km, som bølger sig rundt i det gamle Frøs Herred. Den byder på flere spændende oplevelser på
        højderyggen mellem Kongeåen og Gram Å, og grænser op til den gamle grænse fra 1864 og til 1920, som var en
        brydningstid for området </p>
    </div>
    <div>
    <img src="../images/ikoner/kort.svg">
      <h2 onclick="scrollToElement('mapid')">Kort</h2>
      <p>Du kan nemt få et overblik over hele Caminoen på kortet. Her kan du se alle 11 etaper, og vælge hvilken etape
        du ønsker information om. Du har også mulighed for at få et overblik og rutens faciliteter. Du kan også printe
        kortet hjemmefra og medbringe til turen </p>
    </div>
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
          <div id="grid-posts" class="grid-container no-print"></div>
        
        
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
    
    <article id="stage${post.acf.stageNumber}" class="grid-item" onclick="chosen(${post.acf.stageNumber})" onmouseover="goTo(${post.acf.stageNumber})" onmouseout="goFrom(${post.acf.stageNumber})">

    <section class="backgroundimg" style="background-image: url('${getFeaturedImageUrl(post)}')" >
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

    
    <section class="dropdown">
    <ul id="tabs-swipe-demo" class="tabs">
    <li class="tabNav descriptionTab" onclick="tabs('description', ${post.acf.stageNumber})">Beskrivelse</li>
    <li class="tabNav imagesTab" onclick="tabs('images', ${post.acf.stageNumber})">Billeder</li>
    <li class="tabNav commentsTab" onclick="tabs('comments', ${post.acf.stageNumber}); appendPosts(${this._posts}); showSlides(${slideService.slideIndex})">Hvad siger andre?</li>
  </ul>
  <hr id="hr${post.acf.stageNumber}" />
  <div id="description${post.acf.stageNumber}">
  <div class="flexcontainer">
  <p class="zoom" onclick="zoomToEtape(${post.acf.stageNumber})">Zoom til etape</p>
  <p class="zoom" onclick="zoomOut()">Zoom ud til hele ruten</p>
  </div>
  ${post.content.rendered}
  <a class="gpx" href="geojson/Camino-Frøs-Herred-${post.acf.stageNumber}.gpx" download>Download GPX-fil (${post.acf.stageNumber})</a>
  </div>

  <div class="none tabImages" id="images${post.acf.stageNumber}">${post.acf.images}</div>
  
  <div class="none" id="comments${post.acf.stageNumber}">
    <article class="sayArticle slideshow-container">
      <section>
        <div class="numbertext">1 / 3</div>
        <section id="content${post.acf.stageNumber}">
        
        </section>
      </section>
      <button>Hvad siger du?</button>

      <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
      <a class="next" onclick="plusSlides(1)">&#10095;</a>
    </article>
  </div>
    </section>
    
    </article> `
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