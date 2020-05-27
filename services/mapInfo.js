import {
    map
} from "./../main.js";
class MapInfoService {
    constructor() {
        this.createMarkers();
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


        let Hotel = new iconClass({
            iconUrl: 'images/Hotel.png'
        }),
            Kirke = new iconClass({
                iconUrl: 'images/Kirke.png'
            }),
            Toiletter = new iconClass({
                iconUrl: 'images/Toiletter.png'
            }),
            Hostel = new iconClass({
                iconUrl: 'images/Hostel.png'
            })
        let iconArr = [];
        let stayArr = [];

        let KirkeArr = [];
        let ToiletterArr = [];
        let OvernatningArr = [];
        for (let post of json) {
            iconArr.push(post.acf.infotype);




            let name = `${post.acf.infotype}Arr`
            if (post.acf.infotype === "Overnatning") {
                eval(name).push(L.marker([post.acf.latitude, post.acf.longitude], {
                    icon: eval(post.acf.typeOfStay)
                }).bindPopup(`${post.content.rendered}`));
                stayArr.push(post.acf.typeOfStay)
            } else {
                eval(name).push(L.marker([post.acf.latitude, post.acf.longitude], {
                    icon: eval(post.acf.infotype)
                }).bindPopup(`${post.content.rendered}`));
            }
        }
        iconArr = [...new Set(iconArr)];

        // for (const icon of iconArr) {
        //     console.log(icon)
        //     let name = `${icon}Arr`
        //     name = L.layerGroup(eval(name));
        //     console.log(name)

        // }
        KirkeArr = L.layerGroup(KirkeArr);
        ToiletterArr = L.layerGroup(ToiletterArr);
        OvernatningArr = L.layerGroup(OvernatningArr);

        // Be on map from start
        // map.addLayer(ToiletterArr);
        // map.addLayer(KirkeArr);
        let overlayMaps = {};
        for (const icon of iconArr) {
            let overlayLine;
            let name = `${icon}Arr`

            if (icon == "Overnatning") {
                let stayIcon = "";
                for (const stay of stayArr) {
                    stayIcon += `<img src='images/${stay}.png' />`
                }
                overlayLine = `<p>${icon}</p>${stayIcon}`;
            } else {
                overlayLine = `<p>${icon}</p><img src='images/${icon}.png' />`;
            }

            // let overlayLine = `<p>${icon}</p><img src='images/${icon}.png' />`;
            overlayMaps[overlayLine] = eval(name);

        }


        // var overlayMaps = {
        //     "<p>Overnatning</p><img src='images/lyd.png' />": OvernatningArr,
        //     "<p>Toiletter</p><img src='images/and.jpg' />": ToiletterArr
        // };
        // console.log(overlayMaps)
        L.control.layers([], overlayMaps, { position: 'bottomleft' }).addTo(map);


        // let iconArr = [];
        // for (let post of json) {
        //     iconArr.push(post.acf.infotype);
        //     //     let marker = L.marker([post.acf.latitude, post.acf.longitude], { icon: eval(post.acf.infotype) }).addTo(map).bindPopup(`${post.content.rendered}`)
        //     //     marker.addTo(map)
        //     //     // console.log(marker)
        //     //     marker.removeFrom(map)
        //     //     marker.addTo(map)
        // }
        // iconArr = [...new Set(iconArr)];


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


}

const mapInfoService = new MapInfoService();
export default mapInfoService;