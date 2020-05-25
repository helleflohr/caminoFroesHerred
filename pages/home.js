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
        <h1>Camino Frøs Herred</h1>
        
        <div id="mapid"></div>
      </section>
    `;
  }

fetchDescription () {
  fetch("http://dittejohannejustesen.dk/wordpress/wordpress-cfh/wp-json/wp/v2/posts?_embed&categories=2")
    .then( (response) => {
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