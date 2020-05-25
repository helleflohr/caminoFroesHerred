export default class HomePage {
  constructor() {
    this.template();
    this.fetchDescription();
  }

  template() {
    document.getElementById('content').innerHTML += /*html*/ `
      <section id="home" class="page">
        <!-- <header class="topbar">
          <h2>Home</h2>
        </header> -->
          <!-- frontpage image and info bar -->
  <section id="frontpageImage">
  <h1>Camino Frøs Herred</h1>
  </section>

  <section id="frontpageSection">
    <div>
      <h2>Generelt</h2>
      <p>Ruten er 108 km, som bølger sig rundt i det gamle Frøs Herred. Den byder på flere spændende oplevelser på
        højderyggen mellem Kongeåen og Gram Å, og grænser op til den gamle grænse fra 1864 og til 1920, som var en
        brydningstid for området </p>
    </div>
    <div>
      <h2>Kort</h2>
      <p>Du kan nemt få et overblik over hele Caminoen på kortet. Her kan du se alle 11 etaper, og vælge hvilken etape
        du ønsker information om. Du har også mulighed for at få et overblik og rutens faciliteter. Du kan også printe
        kortet hjemmefra og medbringe til turen </p>
    </div>
    <div>
      <h2>Rutebeskrivelser</h2>
      <p>Caminoen er inddelt i 11 etaper, som giver muligheden for at gå noget af ruten og derved træne op til at kunne
        gå hele Caminoen en dag. For hver etape er der rutebeskrivelser som udførligt vejleder dig gennem turen. Der er
        også billeder og udtalelser fra andre vandrere</p>
    </div>
  </section>

  <div class="maparea">
        
          <div id="mapid"></div>
          <div id="infoBox"></div>
          
        
        
      </section>
    `;
  }

  fetchDescription() {
    fetch("http://dittejohannejustesen.dk/wordpress/wordpress-cfh/wp-json/wp/v2/posts?_embed&categories=2")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.appendPosts(json)
      });
  }

  appendPosts(posts) {
    for (let post of posts) {
      console.log(post);
      document.querySelector("#grid-posts").innerHTML += `
    
        <article class="grid-item">

    <section class="backgroundimg">
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

    <section>
    <p>${post.content.rendered}</p>
    <img src="${post.acf.images}">
    <p>${post.acf.crud}</p>
    </section>

    </article> `
    }

  };

}