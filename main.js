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
window.dropdownDescription = () => spaService.dropdownDescription();

export let map = new L.Map("mapid", {
    center: new L.LatLng(55.366750, 9.057975),
    zoom: 11
    // layers: [cities]
});

// window.createMap = () => mapService.createMap();
