import {
    map
} from "./../main.js";
class MapInfoService {
    constructor() {
        this.createMarkers();

        this.moveInfoBox();
    }

    createMarkers() {
        fetch("http://dittejohannejustesen.dk/wordpress/wordpress-cfh/wp-json/wp/v2/posts?_embed&categories=3")
            .then(function (response) {
                return response.json();
            })
            .then((json) => {
                this.getDataForCheckbox(json);
            });
    }

    appendMarkers(posts) {
        console.log('hi')
        for (let post of posts) {
            console.log(post);
            document.querySelector("#grid-posts").innerHTML += `
                        < article class= "grid-item" >
                        <h3>${post.title.rendered}</h3>
                        <h4>${post.acf.kilometer}</h4>
                        <h5>${post.acf.start}</h5>
                        <h5>${post.acf.slut}</h5>
                        <p>${post.acf.rutebeskrivelse}</p>
                        <img src="${post.acf.billeder.url}">
                            <p>${post.acf.hvad_siger_andre}</p>
        </br> `
        }
    };

    getDataForCheckbox(json) {
        let iconClass = L.Icon.extend({
            options: {
                // shadowUrl: 'images/and.jpg',
                iconSize: [38, 38], // size of the icon
                shadowSize: [50, 64], // size of the shadow
                iconAnchor: [19, 19], // point of the icon which will correspond to marker's location
                shadowAnchor: [4, 62], // the same for the shadow
                popupAnchor: [0, -15] // point from which the popup should open relative to the iconAnchor
            }
        })


        let Overnatning = new iconClass({
                iconUrl: 'images/stay.png'
            }),
            Kirke = new iconClass({
                iconUrl: 'images/lyd.png'
            }),
            Toiletter = new iconClass({
                iconUrl: 'images/toilets.png'
            })

        let ToiletterArr = [];
        let overnatningsArr = [];
        for (let post of json) {
            if (post.acf.infotype === "Toiletter") {
                ToiletterArr.push(L.marker([post.acf.latitude, post.acf.longitude], {
                    icon: Toiletter
                }).bindPopup(`${post.content.rendered}`));
            }
            if (post.acf.infotype === "Overnatning") {
                overnatningsArr.push(L.marker([post.acf.latitude, post.acf.longitude], {
                    icon: Overnatning
                }).bindPopup(`${post.content.rendered}`));
            }

        }

        ToiletterArr = L.layerGroup(ToiletterArr);
        overnatningsArr = L.layerGroup(overnatningsArr);
        // console.log(toiletArr)
        map.addLayer(ToiletterArr);
        // map.removeLayer(ToiletterArr);




        var overlayMaps = {
            "<p>Overnatning</p><img src='images/lyd.png' />": overnatningsArr,
            "<p>Toiletter</p><img src='images/and.jpg' />": ToiletterArr
        };

        L.control.layers([], overlayMaps).addTo(map);


        let iconArr = [];
        for (let post of json) {
            iconArr.push(post.acf.infotype);
            //     let marker = L.marker([post.acf.latitude, post.acf.longitude], { icon: eval(post.acf.infotype) }).addTo(map).bindPopup(`${post.content.rendered}`)
            //     marker.addTo(map)
            //     // console.log(marker)
            //     marker.removeFrom(map)
            //     marker.addTo(map)
        }
        iconArr = [...new Set(iconArr)];


        // console.log(iconArr);
        let template = "";
        for (const markerType of iconArr) {
            template += /*html*/ `
                    <div class="boxIcon">
                    <input type="checkbox" id='check${markerType}' onclick="showOrHide(${markerType})">
                  <p>${markerType}</p> <img src="images/${markerType}.png">
                  </div>
                  `
        }
        let infoBox = document.querySelector('#infoBox');
        infoBox.innerHTML = template;
    }

    showOrHide(arr) {
        console.log('test')
        let checkBox = document.querySelector('#checkToiletter');
        console.log(checkBox.value)
        if (checkBox.checked == true) {
            console.log('checked')
            // Toiletter.removeFrom(map)
            console.log(arr)
            map.removeLayer(ToiletterArr);
        }
    }

    moveInfoBox() {
        // let mapContainer = document.querySelector('#mapid');
        let leafletControls = document.querySelector('.leaflet-right');
        // let personalize = leafletControls.getElementsByTagName('div')[0];
        console.log(leafletControls)
    }
}

const mapInfoService = new MapInfoService();
export default mapInfoService;