import fetchService from "./fetch.js"
import {
  map
} from "./../main.js";
import mapInfoService from "./mapInfo.js"
class MapService {
  constructor() {
    this.fitBounds = [];
    this.description = fetchService.descriptions
  }

  async fetchGeoJson() {
    console.log(fetchService.descriptions, this.description)
    let numberOfStages = 11

    for (let i = 1; i < (numberOfStages + 1); i++) {
      fetch(`geojson/Camino-Frøs-Herred-${i}.gpx`)
        .then(function (response) {
          return response.text();
        })
        .then((gpxData) => {
          let gpx = new gpxParser();
          gpx.parse(gpxData);
          this.createMap();
          this.drawTrack(gpx.tracks[0], i);

        });
    }

  }

  createMap() {

    let OpenStreetMap_HOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
    });
    // let layer = new L.StamenTileLayer("terrain");
    // let map = new L.Map("mapid", {
    //   center: new L.LatLng(55.366750, 9.057975),
    //   zoom: 12
    // });
    map.addLayer(OpenStreetMap_HOT);





  }



  drawTrack(track, number) {
    if (track) {

      // console.log(track)
      let coordinates = track.points.map(p => [p.lat.toFixed(5), p.lon.toFixed(5)]);
      let poly = L.polyline(coordinates, {
        weight: 5,
        color: 'var(--camino-blue)',
        className: `line${number}`,
        lineCap: 'round'
      })
      this.fitBounds.push({ number: number, southWest: poly._bounds._southWest, northEast: poly._bounds._northEast })
      poly.addTo(map);

      let coordinateStart = coordinates[0];

      var dot = L.icon({
        iconUrl: '../images/circle.svg',

        iconSize: [15, 15], // size of the icon
        shadowSize: [50, 64], // size of the shadow
        iconAnchor: [7.5, 7.5], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62], // the same for the shadow
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
      });

      L.marker(coordinateStart, {
        icon: dot
      }).addTo(map);
      // L.marker([coordinatesEnd]).addTo(map);
    }
  }
};




const mapService = new MapService();
export default mapService;