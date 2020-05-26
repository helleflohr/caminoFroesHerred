import fetchService from "./../services/fetch.js"
export default class HomePage {
  constructor() {
    this.template();
    this.fetchDescription();
  }

  template() {
    document.getElementById('content').innerHTML += /*html*/ `
      <section id="home" class="page no-print">
       <!-- <header class="topbar">
          <h2>Home</h2>
        </header> -->
          <!-- frontpage image and info bar -->
  <section id="frontpageImage" class="no-print">
  <img id="frontpageLogo" src="../images/cfhLogo.svg">
<div>
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
  fetchDescription() {
    fetch("http://dittejohannejustesen.dk/wordpress/wordpress-cfh/wp-json/wp/v2/posts?_embed&categories=2&per_page=15")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.descriptions = json;
        // console.log(this.descriptions)
        this.appendPosts(json)
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
    
    <article id="stage${post.acf.stageNumber}" class="grid-item" onclick="chosen(${post.acf.stageNumber})">

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
    <li class="tabNav commentsTab" onclick="tabs('comments', ${post.acf.stageNumber})">Hvad siger andre?</li>
    
  </ul>
  <hr id="hr${post.acf.stageNumber}" />
  <div id="description${post.acf.stageNumber}"> <!-- <p id="etape-description">-->${post.content.rendered}<!--</p>-->
</div>
  <div class="none" id="images${post.acf.stageNumber}">${post.acf.images}</div>
  <div class="none" id="comments${post.acf.stageNumber}"><p>${post.acf.crud}</p></div>
  
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
