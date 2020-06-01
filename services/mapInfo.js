import {
    map
} from "./../main.js";
import loaderService from "./loader.js"
import fetchService from "./fetch.js"
// import fetchService from "./../services/fetch.js"
class MapInfoService {
    constructor() {
        // this.createMarkers();
        // this.iconSize();
        this.iconSizes = 29;



    }

    async createMarkers() {
        loaderService.show(true)
        await fetch("http://dittejohannejustesen.dk/wordpress/wordpress-cfh/wp-json/wp/v2/posts?_embed&categories=3&per_page=300")
            .then(function (response) {
                return response.json();
            })
            .then((json) => {
                this.getDataForCheckbox(json);
            })
            .then(iconCreateFunction(cluster));
        loaderService.show(false)
    }

    // appendMarkers(posts) {
    //     console.log('hi')
    //     for (let post of posts) {
    //         console.log(post);
    //         document.querySelector("#grid-posts").innerHTML += `
    //                     < article class= "grid-item" >
    //                     <h3>${post.title.rendered}</h3>
    //                     <h4>${post.acf.kilometer}</h4>
    //                     <h5>${post.acf.start}</h5>
    //                     <h5>${post.acf.slut}</h5>
    //                     <p>${post.acf.rutebeskrivelse}</p>
    //                     <img src="${post.acf.billeder.url}">
    //                         <p>${post.acf.hvad_siger_andre}</p>
    //     </br> `
    //     }
    // }

    onLocationFound(e) {
        var radius = e.accuracy;

        L.marker(e.latlng).addTo(map)
            .bindPopup("You are within " + radius + " meters from this point").openPopup();

        L.circle(e.latlng, radius).addTo(map);
    }



    getDataForCheckbox(json) {
        let OpenStreetMap_HOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
        });

        let toner = new L.StamenTileLayer("toner");
        map.addLayer(OpenStreetMap_HOT);

        this.tilesAndControles();

        // console.log(this.iconSizes, this.iconSizes / 2)
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
        let SeværdighederArr = [];
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



        KirkeArr = this.clustermarkers(KirkeArr, new L.MarkerClusterGroup())
        ToiletterArr = this.clustermarkers(ToiletterArr, new L.MarkerClusterGroup())
        OvernatningArr = this.clustermarkers(OvernatningArr, new L.MarkerClusterGroup())
        SeværdighederArr = this.clustermarkers(SeværdighederArr, new L.MarkerClusterGroup())
        KanopladsArr = this.clustermarkers(KanopladsArr, new L.MarkerClusterGroup())
        VandpostArr = this.clustermarkers(VandpostArr, new L.MarkerClusterGroup())
        UdkigspunktArr = this.clustermarkers(UdkigspunktArr, new L.MarkerClusterGroup())
        BusstopArr = this.clustermarkers(BusstopArr, new L.MarkerClusterGroup())
        ForplejningsmulighedArr = this.clustermarkers(ForplejningsmulighedArr, new L.MarkerClusterGroup())
        GenforeningsstenArr = this.clustermarkers(GenforeningsstenArr, new L.MarkerClusterGroup())
        LegepladsArr = this.clustermarkers(LegepladsArr, new L.MarkerClusterGroup())
        IndkøbsmulighedArr = this.clustermarkers(IndkøbsmulighedArr, new L.MarkerClusterGroup())
        ParkeringArr = this.clustermarkers(ParkeringArr, new L.MarkerClusterGroup())
        HvilestedArr = this.clustermarkers(HvilestedArr, new L.MarkerClusterGroup())


        // --------------- Be on map from start ---------------
        for (const marker of fetchService.startMarkers) {


            let markerArr = `${marker}Arr`
            console.log(markerArr);
            map.addLayer(eval(markerArr))
        }

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

            overlayMaps[overlayLine] = eval(name);
        }




        let baseMaps = {
            "Farver": OpenStreetMap_HOT,
            "Gråtone": toner
        };
        L.control.layers(baseMaps, overlayMaps, {
            position: 'bottomleft'
        }).addTo(map);



        map.on('zoomend', () => {

            let leafletIcons = document.querySelectorAll('.leaflet-marker-icon');
            let currentZoom = map.getZoom();
            // console.log(this.iconSizes)
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
            // console.log(this.iconSizes)
        });
    }

    tilesAndControles() {


        L.control.locate({
            initialZoomLevel: '14',
            flyTo: 'true'
        }).addTo(map);



        // --------------- Printer function - Helle ---------------
        L.control.browserPrint({
            title: 'Print kort',
            documentTitle: 'Kort printet ved brug af leaflet.browser.print plugin',
            manualMode: false
        }).addTo(map)

        L.control.browserPrint.mode.custom();
        L.control.browserPrint.mode.landscape();
        L.control.browserPrint.mode.portrait();
    }
    // --------------- Printer function - End ---------------

    // --------------- Cluster marker function - Helle ---------------
    iconCreateFunction(cluster) {
        let childCount = cluster.getChildCount(); //Gets the amount of child elements
        let c = ' marker-cluster-';
        if (childCount < 5) { //When there are less than 5 items clustered, there will a small cluster
            c += 'small';
        } else if (childCount < 10) { // now a medium cluster
            c += 'medium';
        } else {
            c += 'large'; //or a large cluster
        }

        return new L.DivIcon({ //Then a new icon is returned, and can be styled in css
            html: '<div><span>' + childCount + '</span></div>',
            className: 'marker-cluster' + c,
            iconSize: new L.Point(40, 40)
        });
    }
    // --------------- Cluster marker function - End ---------------

    clustermarkers(markersArr, clusterGroup) {
        for (let i = 0; i < markersArr.length; i++) {

            let marker = markersArr[i];
            clusterGroup.addLayer(marker)
        }

        return clusterGroup;
    }
    // --------------- Cluster marker function - End ---------------


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