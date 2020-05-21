// import your hideAllPages
import HomePage from "./pages/home.js";


// import your services
import spaService from "./services/spa.js";
import mapService from "./services/map.js";

// Declare and init pages
let homePage = new HomePage();


// init services
spaService.init();
// mapService.createMap();
mapService.fetchGeoJson();

window.pageChange = () => spaService.pageChange();
// window.createMap = () => mapService.createMap();