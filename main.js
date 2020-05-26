import fetchService from "./services/fetch.js"
// import your hideAllPages
import HomePage from "./pages/home.js";

// import your services
import spaService from "./services/spa.js";
import mapService from "./services/map.js";

import scrollService from "./services/nav.js"
import mapInfoService from "./services/mapInfo.js";



// Declare and init pages
let homePage = new HomePage();



// init services
spaService.init();

mapService.fetchGeoJson();


window.pageChange = () => spaService.pageChange();
window.dropdownDescription = () => homePage.dropdownDescription();
window.goTo = (number) => scrollService.goTo(number);
window.goFrom = (number, color) => scrollService.goFrom(number, color);
window.chosen = (number) => scrollService.chosen(number);
window.showOrHide = () => mapInfoService.showOrHide();

export let map = new L.Map("mapid", {
    center: new L.LatLng(55.366750, 9.057975),
    zoom: 12
    // layers: [cities]
});

// window.createMap = () => mapService.createMap();