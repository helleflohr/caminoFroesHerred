import {
  map
} from "./../main.js";
import mapInfoService from "./mapInfo.js"
class MapService {
  constructor() {

  }

  fetchGeoJson() {
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
    let layer = new L.StamenTileLayer("terrain");
    // let map = new L.Map("mapid", {
    //   center: new L.LatLng(55.366750, 9.057975),
    //   zoom: 12
    // });
    map.addLayer(OpenStreetMap_HOT);

    // map.addLayer(layer);



    // let iconClass = L.Icon.extend({
    //   options: {
    //     // shadowUrl: 'images/and.jpg',
    //     iconSize: [38, 95],
    //     shadowSize: [50, 64],
    //     iconAnchor: [22, 94],
    //     shadowAnchor: [4, 62],
    //     popupAnchor: [-3, -76]
    //   }
    // })

    // let greenIcon = new iconClass({ iconUrl: 'images/and.jpg' }),
    //   redIcon = new iconClass({ iconUrl: 'images/lyd.png' }),
    //   orangeIcon = new iconClass({ iconUrl: 'leaf-orange.png' });

    mapInfoService.createMarkers();
    // L.marker([55.367515, 9.069192], { icon: greenIcon }).addTo(map).bindPopup("<b>Hello world!</b>I am a popup!<img src='images/and.jpg' style='max-width: 100%'>")
    // L.marker([55.379615, 9.089192], { icon: redIcon }).addTo(map).bindPopup("<b>Hello world!</b>I am a popup!<img src='images/lyd.png' style='max-width: 100%'>")
    // L.marker([55.379615, 9.049192], { icon: redIcon }).addTo(map).bindPopup("<b>Hello world!</b>I am a popup!<img src='images/lyd.png' style='max-width: 100%'>")

    // let marker = L.marker([55.366750, 9.057975]).addTo(map);
    // L.marker([55.3658, 9.0532]).addTo(map);
    // marker.bindPopup("<b>Hello world!</b><br>I am a popup.");


  }



  drawTrack(track, number) {
    if (track) {

      // console.log(track)
      let coordinates = track.points.map(p => [p.lat.toFixed(5), p.lon.toFixed(5)]);

      L.polyline(coordinates, {
        weight: 5,
        color: 'var(--camino-blue)',
        className: `line${number}`,
        lineCap: 'round'
      }).addTo(map);

      // zoom the map to the polyline
      // map.fitBounds(polyline.getBounds());
    }
  }


};




const mapService = new MapService();
export default mapService;