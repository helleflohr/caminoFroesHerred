import { map } from "./../main.js";
class MapService {
  constructor() {
    this.fetchGeoJson();
  }

  fetchGeoJson() {

    fetch('geojson/Camino-Frøs-Herred-5.gpx')
      .then(function (response) {
        return response.text();
      })
      .then((gpxData) => {
        let gpx = new gpxParser();
        gpx.parse(gpxData);
        this.createMap();
        this.drawTrack(gpx.tracks[0]);
        // this.drawTrack(gpx.tracks[0]);

      });
  }

  createMap() {
    // console.log(json)
    let layer = new L.StamenTileLayer("terrain");
    // let map = new L.Map("mapid", {
    //   center: new L.LatLng(55.366750, 9.057975),
    //   zoom: 12
    // });
    map.addLayer(layer);

    let marker = L.marker([55.366750, 9.057975]).addTo(map);
    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

    // L.geoJSON(json.features.geometry.coordinates).addTo(map);

    // let coordinates = track.points.map(p => [p.lat.toFixed(5), p.lon.toFixed(5)]);

    // var polyline = L.polyline(coordinates, { weight: 6, color: 'darkred' }).addTo(map);

    // // zoom the map to the polyline
    // map.fitBounds(polyline.getBounds());

  }

  drawTrack(track) {

    let coordinates = track.points.map(p => [p.lat.toFixed(5), p.lon.toFixed(5)]);

    var polyline = L.polyline(coordinates, { weight: 6, color: 'darkred' }).addTo(map);

    // zoom the map to the polyline
    map.fitBounds(polyline.getBounds());
  }
};




const mapService = new MapService();
export default mapService;