// import loaderService from "./loader.js";
class MapService {
  constructor() {
    // this.loaderService = loaderService;


  }

  fetchGeoJson() {

    fetch('geojson/tracks7.geojson')
      .then(function (response) {
        return response.json();
      })
      .then((json) => {
        this.createMap(json);

      });
  }

  createMap(json) {
    console.log(json)
    let layer = new L.StamenTileLayer("terrain");
    let map = new L.Map("mapid", {
      center: new L.LatLng(55.366750, 9.057975),
      zoom: 12
    });
    map.addLayer(layer);

    let marker = L.marker([55.366750, 9.057975]).addTo(map);
    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

    L.geoJSON(json.features.geometry.coordinates).addTo(map);

  }
};




const mapService = new MapService();
export default mapService;