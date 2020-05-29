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
import loaderService from "./services/loader.js";



// Declare and init pages
let homePage = new HomePage();



// init services
// async function Load() {
//     await fetchService.fetchDescription();
//     await fetchService.fetchMarkers();
// }
// Load();
loaderService.show(true);
spaService.init();

// if (window.innerWidth > 1024) {
mapService.fetchGeoJson();
// }

// mapInfoService.iconSize();



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
window.stageSize = () => stageService.stageSize();
window.plusSlides = (n, number) => slideService.plusSlides(n, number);
window.createUser = () => crudService.createUser();
/* window.closeOutsideModal = (event, number) => crudService.closeOutsideModal(event, number); */
window.closeFunction = (element) => crudService.closeFunction(element);
window.createUser = () => crudService.createUser();
window.myFunctionModal = (number) => crudService.myFunctionModal(number);
window.previewImage = (file, number) => crudService.previewImage(file, number);
window.triggerChooseImg = () => crudService.triggerChooseImg();
window.appendPosts = (etapeNr) => crudService.appendPosts(etapeNr);
window.plusSlides = (n, number) => slideService.plusSlides(n, number);
window.showSlides = (n, number) => slideService.showSlides(n, number);

let latitude = 55.356480;
let longitude = 9.157975;
let zoom = 12;

if (window.innerWidth < 1024) {
    latitude = 55.356480;
    longitude = 9.097975;
    zoom = 10;
}

export let map = new L.Map("mapid", {
    center: new L.LatLng(latitude, longitude),
    zoom: zoom
    // layers: [cities]
});




// var layer = 'KirkeArr';//define the layer that contains the markers
// map.on('zoomend', function () {
//     console.log('Im zooming again')
//     var currentZoom = map.getZoom();
//     if (currentZoom == 13) {
//         //Update X and Y based on zoom level
//         var x = 50; //Update x 
//         var y = 50; //Update Y         
//         var LeafIcon = L.Icon.extend({
//             options: {
//                 iconSize: [x, y] // Change icon size according to zoom level
//             }
//         });
//         layer.setIcon(LeafIcon);
//     }
// });

// var ar_icon_1 = [20, 20];
// var ar_icon_2 = [10, 10];
// var ar_icon_1_double_size = [30, 30];
// var ar_icon_2_double_size = [50, 50];


// map.on('zoomend', function () {
//     console.log('Im zooming')
//     var currentZoom = map.getZoom();
//     if (currentZoom > 12) {
//         all_testptLayer.eachLayer(function (layer) {
//             if (layer.feature.properties.num < 0.5)
//                 return layer.setIcon(ar_icon_1);
//             else if (feature.properties.num < 1.0)
//                 return layer.setIcon(ar_icon_2);
//         });
//     } else {
//         all_testptLayer.eachLayer(function (layer) {
//             if (layer.feature.properties.num < 0.5)
//                 return layer.setIcon(ar_icon_1_double_size);
//             else if (feature.properties.num < 1.0)
//                 return layer.setIcon(ar_icon_2_double_size);
//         });
//     }
// });

