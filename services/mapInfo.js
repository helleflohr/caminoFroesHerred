import {
    map
} from "./../main.js";
// import fetchService from "./../services/fetch.js"
class MapInfoService {
    constructor() {
        this.createMarkers();
        // this.iconSize();
        this.iconSizes = 29;

    }

    createMarkers() {
        fetch("http://dittejohannejustesen.dk/wordpress/wordpress-cfh/wp-json/wp/v2/posts?_embed&categories=3&per_page=300")
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

        console.log(this.iconSizes, this.iconSizes / 2)
        let iconClass = L.Icon.extend({
            options: {
                // shadowUrl: 'images/and.jpg',
                iconSize: [this.iconSizes, this.iconSizes], // size of the icon
                shadowSize: [50, 64], // size of the shadow
                iconAnchor: [this.iconSizes / 2, this.iconSizes / 2], // point of the icon which will correspond to marker's location
                shadowAnchor: [4, 62], // the same for the shadow
                popupAnchor: [0, -15] // point from which the popup should open relative to the iconAnchor
            }
        })
        // console.log(iconSize)


        let Seng = new iconClass({
            iconUrl: 'images/ikoner-map/Seng.svg'
        }),
            Kirke = new iconClass({
                iconUrl: 'images/ikoner-map/Kirke.svg'
            }),
            Toiletter = new iconClass({
                iconUrl: 'images/ikoner-map/Toiletter.svg'
            }),
            Kanoplads = new iconClass({
                iconUrl: 'images/ikoner-map/Kanoplads.svg'
            }),
            Shelter = new iconClass({
                iconUrl: 'images/ikoner-map/Shelter.svg'
            }),
            Vandpost = new iconClass({
                iconUrl: 'images/ikoner-map/Vandpost.svg'
            }),
            Udkigspunkt = new iconClass({
                iconUrl: 'images/ikoner-map/Udkigspunkt.svg'
            }),
            Telt = new iconClass({
                iconUrl: 'images/ikoner-map/Telt.svg'
            }),
            Busstop = new iconClass({
                iconUrl: 'images/ikoner-map/Busstop.svg'
            }),
            Forplejningsmulighed = new iconClass({
                iconUrl: 'images/ikoner-map/Forplejningsmulighed.svg'
            }),
            SeværdighederAttraktioner = new iconClass({
                iconUrl: 'images/ikoner-map/SeværdighederAttraktioner.svg'
            }),
            Genforeningssten = new iconClass({
                iconUrl: 'images/ikoner-map/Genforeningssten.svg'
            }),
            Legeplads = new iconClass({
                iconUrl: 'images/ikoner-map/Legeplads.svg'
            }),
            Indkøbsmulighed = new iconClass({
                iconUrl: 'images/ikoner-map/Indkøbsmulighed.svg'
            }),
            Parkering = new iconClass({
                iconUrl: 'images/ikoner-map/Parkering.svg'
            }),
            Hvilested = new iconClass({
                iconUrl: 'images/ikoner-map/Hvilested.svg'
            })
        let iconArr = [];
        let stayArr = [];

        let KirkeArr = [];
        let ToiletterArr = [];
        let OvernatningArr = [];
        let KanopladsArr = [];
        let VandpostArr = [];
        let UdkigspunktArr = [];
        let BusstopArr = [];
        let ForplejningsmulighedArr = [];
        let GenforeningsstenArr = [];
        let LegepladsArr = [];
        let IndkøbsmulighedArr = [];
        let ParkeringArr = [];
        let HvilestedArr = [];

        // if (this.counter == 0) {
        // console.log(this.counter)
        for (let post of json) {
            iconArr.push(post.acf.infotype);




            let name = `${post.acf.infotype}Arr`
            if (post.acf.infotype === "Overnatning") {
                eval(name).push(L.marker([post.acf.latitude, post.acf.longitude], {
                    icon: eval(post.acf.typeOfStay)
                }).bindPopup(`<b>${post.title.rendered}</b><br>${post.content.rendered}`));
                stayArr.push(post.acf.typeOfStay)
            } else {
                eval(name).push(L.marker([post.acf.latitude, post.acf.longitude], {
                    icon: eval(post.acf.infotype)
                }).bindPopup(`<b>${post.title.rendered}</b><br>${post.content.rendered}`));
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

        KanopladsArr = L.layerGroup(KanopladsArr);

        VandpostArr = L.layerGroup(VandpostArr);
        UdkigspunktArr = L.layerGroup(UdkigspunktArr);

        BusstopArr = L.layerGroup(BusstopArr);
        ForplejningsmulighedArr = L.layerGroup(ForplejningsmulighedArr);
        GenforeningsstenArr = L.layerGroup(GenforeningsstenArr);
        LegepladsArr = L.layerGroup(LegepladsArr);
        IndkøbsmulighedArr = L.layerGroup(IndkøbsmulighedArr);
        ParkeringArr = L.layerGroup(ParkeringArr);
        HvilestedArr = L.layerGroup(HvilestedArr);


        // Be on map from start
        map.addLayer(ToiletterArr);
        map.addLayer(KirkeArr);
        map.addLayer(KanopladsArr);
        map.addLayer(VandpostArr);
        map.addLayer(BusstopArr);
        let overlayMaps = {};
        for (const icon of iconArr) {
            let overlayLine;
            let name = `${icon}Arr`

            if (icon == "Overnatning") {
                let stayIcon = "";
                let imageIcons = "";
                for (const stay of stayArr) {
                    imageIcons += `<img src='images/ikoner-map/${stay}.svg' />`

                }
                stayIcon += `<div>${imageIcons}</div>`
                overlayLine = `<p>${icon}</p>${stayIcon}`;
            } else {
                overlayLine = `<p>${icon}</p><div><img src='images/ikoner-map/${icon}.svg' /></div>`;
            }

            // let overlayLine = `<p>${icon}</p><img src='images/${icon}.png' />`;
            overlayMaps[overlayLine] = eval(name);

        }


        // var overlayMaps = {
        //     "<p>Overnatning</p><img src='images/lyd.png' />": OvernatningArr,
        //     "<p>Toiletter</p><img src='images/and.jpg' />": ToiletterArr
        // };
        // console.log(overlayMaps)
        L.control.layers([], overlayMaps, {
            position: 'bottomleft'
        }).addTo(map);

        L.control.layers([], overlayMaps, {
            position: 'bottomleft'
        }).addTo(map);

        // --------------- Printer function - Helle ---------------
        L.control.browserPrint({
            title: 'Just print me!',
            documentTitle: 'Map printed using leaflet.browser.print plugin',

            closePopupsOnPrint: false,
            manualMode: false
        }).addTo(map)

        L.control.browserPrint.mode.custom();
        L.control.browserPrint.mode.landscape();
        L.control.browserPrint.mode.portrait();

        // L.Control.BrowserPrint.Event.PrePrint({
        //     pageSize,
        //     pageBounds,
        //     printObjects
        // }).addTo(map)

        // --------------- Printer function - End ---------------



        // let template = "";
        // for (const markerType of iconArr) {
        //     template += /*html*/ `
        //             <div class="boxIcon">
        //             <input type="checkbox" id='check${markerType}' onclick="showOrHide(${markerType})">
        //           <p>${markerType}</p> <img src="images/ikoner-map/${markerType}.svg">
        //           </div>
        //           `
        // }
        // let infoBox = document.querySelector('#infoBox');
        // infoBox.innerHTML = template;


        map.on('zoomend', () => {

            let leafletIcons = document.querySelectorAll('.leaflet-marker-icon');
            let currentZoom = map.getZoom();
            console.log(this.iconSizes)
            this.iconSize();


            if (currentZoom < 12) {
                this.iconSizes = 15;
                for (const icon of leafletIcons) {
                    icon.style.width = `${this.iconSizes}px`;
                    icon.style.height = `${this.iconSizes}px`;
                }
            } else {
                this.iconSizes = 29;
                for (const icon of leafletIcons) {
                    icon.style.width = `${this.iconSizes}px`;
                    icon.style.height = `${this.iconSizes}px`;
                }
            }
            console.log(this.iconSizes)
        });
    }
    iconSize() {
        let leafletIcons = document.querySelectorAll('.leaflet-marker-icon');
        let currentZoom = map.getZoom();


        // console.log(document.querySelectorAll('.leaflet-control-layers-selector'));
        let leafletCheckboxes = document.querySelectorAll('.leaflet-control-layers-selector');
        for (const checkBox of leafletCheckboxes) {
            // console.log(checkBox)
            checkBox.addEventListener("onchange", () => { // Listen for a click on an image
                // time
                console.log(this.iconSizes)
                if (currentZoom < 12) {
                    this.iconSizes = 15;
                    for (const icon of leafletIcons) {
                        icon.style.width = `${this.iconSizes}px`;
                        icon.style.height = `${this.iconSizes}px`;
                    }
                } else {
                    this.iconSizes = 29;
                    for (const icon of leafletIcons) {
                        icon.style.width = `${this.iconSizes}px`;
                        icon.style.height = `${this.iconSizes}px`;
                    }
                }
                console.log(this.iconSizes)
            }, 5000);

        }




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