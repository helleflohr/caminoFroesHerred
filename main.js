// import your hideAllPages
import HomePage from "./pages/home.js";


// import your services
import spaService from "./services/spa.js";
import mapService from "./services/map.js";

// Declare and init pages
let homePage = new HomePage();



// init services
spaService.init();

mapService.fetchGeoJson();
// mapService.createMap();

window.pageChange = () => spaService.pageChange();

export let map = new L.Map("mapid", {
    center: new L.LatLng(55.366750, 9.057975),
    zoom: 11
    // layers: [cities]
});

// window.createMap = () => mapService.createMap();

fetch("http://dittejohannejustesen.dk/wordpress/wordpress-cfh/wp-json/wp/v2/posts?_embed&categories=2")
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        appendPosts(json)
    });

function appendPosts(posts) {
    for (let post of posts) {
        // console.log(post);
        document.querySelector("#grid-posts").innerHTML += `
    <article class="grid-item">
    <h3>${post.title.rendered}</h3>
    <h4>${post.acf.distance}</h4>
    </div>
    <div class="start-slut">
    <h5>${post.acf.startpoint}</h5> -
    <h5>${post.acf.endpoint}</h5>
    </div>
    </section>

    <section>
    <p>${post.content.rendered}</p>
    <img src="${post.acf.images.url}">
    <p>${post.acf.crud}</p>
    </section>

    </article> `
    }

};