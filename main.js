import fetchService from "./services/fetch.js"
// import your hideAllPages
import HomePage from "./pages/home.js";

// import your services
import spaService from "./services/spa.js";
import mapService from "./services/map.js";

import scrollService from "./services/nav.js"
import mapInfoService from "./services/mapInfo.js";

import crudService from "./services/crud.js";



// Declare and init pages
let homePage = new HomePage();



// init services
spaService.init();

mapService.fetchGeoJson();


window.pageChange = () => spaService.pageChange();
window.dropdownDescription = () => homePage.dropdownDescription();
window.goTo = (number) => scrollService.goTo(number);
window.goFrom = (number) => scrollService.goFrom(number);
window.chosen = (number) => scrollService.chosen(number);
window.tabs = (tab, number) => scrollService.tabs(tab, number);
window.scrollToElement = (element) => scrollService.scrollToElement(element);
window.showOrHide = (arr) => mapInfoService.showOrHide(arr);
window.getFeaturedImageUrl = (post) => homePage.getFeaturedImageUrl(post);
window.appendPosts = () => crudService.appendPosts();

export let map = new L.Map("mapid", {
    center: new L.LatLng(55.356480, 9.157975),
    zoom: 12
    // layers: [cities]
});

// window.createMap = () => mapService.createMap();
