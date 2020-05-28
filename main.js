// import your hideAllPages
import HomePage from "./pages/home.js";

// import your services
import fetchService from "./services/fetch.js"
import spaService from "./services/spa.js";
import mapService from "./services/map.js";

import scrollService from "./services/nav.js"
import mapInfoService from "./services/mapInfo.js";
import stageService from "./services/stages.js"
import slideService from "./services/slide.js";

import crudService from "./services/crud.js";



// Declare and init pages
let homePage = new HomePage();



// init services
fetchService.fetchDescription();
fetchService.fetchMarkers();
spaService.init();

mapService.fetchGeoJson();


window.pageChange = () => spaService.pageChange();
window.dropdownDescription = () => homePage.dropdownDescription();
window.goTo = (number) => scrollService.goTo(number);
window.goFrom = (number) => scrollService.goFrom(number);
window.chosen = (number) => scrollService.chosen(number);
window.scrollToStage = (number) => scrollService.scrollToStage(number);
window.zoomToStage = (number) => scrollService.zoomToStage(number);
window.zoomOut = () => scrollService.zoomOut();
window.tabs = (tab, number) => scrollService.tabs(tab, number);
window.scrollToElement = (element) => scrollService.scrollToElement(element);
window.bigImg = (image) => scrollService.bigImg(image);
window.showOrHide = (arr) => mapInfoService.showOrHide(arr);
window.getFeaturedImageUrl = (post) => homePage.getFeaturedImageUrl(post);
window.underlineTab = () => stageService.underlineTab();
window.plusSlides = (n, number) => slideService.plusSlides(n, number);
window.createUser = () => crudService.createUser();
window.closeOutsideModal = (event, number) => crudService.closeOutsideModal(event, number);
window.closeFunction = (element) => crudService.closeFunction(element);
window.createUser = () => crudService.createUser();
window.myFunctionModal = (number) => crudService.myFunctionModal(number);

window.appendPosts = (etapeNr) => crudService.appendPosts(etapeNr);
window.plusSlides = (n, number) => slideService.plusSlides(n, number);
window.showSlides = (n, number) => slideService.showSlides(n, number);

export let map = new L.Map("mapid", {
    center: new L.LatLng(55.356480, 9.157975),
    zoom: 12
    // layers: [cities]
});


// window.createMap = () => mapService.createMap();