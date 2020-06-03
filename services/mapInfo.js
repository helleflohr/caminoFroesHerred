import {
    map
} from "./../main.js";
import loaderService from "./loader.js"
import fetchService from "./fetch.js"
// import fetchService from "./../services/fetch.js"
class MapInfoService {
    constructor() {
        this.iconSizes = 29;
    }


    mapAndMarkers(json) {

        // The HOT style
        let OpenStreetMap_HOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
        });

        // The toner style
        let toner = new L.StamenTileLayer("toner");


        map.addLayer(OpenStreetMap_HOT); // Add HOT to the map as default

        this.tilesAndControles(); // Add the map controles


        let iconClass = L.Icon.extend({ // Icon standard
            options: {
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
            Kirker = new iconClass({
                iconUrl: 'images/ikoner-map/Kirker.svg'
            }),
            Toiletter = new iconClass({
                iconUrl: 'images/ikoner-map/Toiletter.svg'
            }),
            Kanopladser = new iconClass({
                iconUrl: 'images/ikoner-map/Kanopladser.svg'
            }),
            Shelter = new iconClass({
                iconUrl: 'images/ikoner-map/Shelter.svg'
            }),
            Vandposter = new iconClass({
                iconUrl: 'images/ikoner-map/Vandposter.svg'
            }),
            Udsigtspunkter = new iconClass({
                iconUrl: 'images/ikoner-map/Udkigspunkter.svg'
            }),
            Telt = new iconClass({
                iconUrl: 'images/ikoner-map/Telt.svg'
            }),
            Busstop = new iconClass({
                iconUrl: 'images/ikoner-map/Busstop.svg'
            }),
            Forplejningsmuligheder = new iconClass({
                iconUrl: 'images/ikoner-map/Forplejningsmuligheder.svg'
            }),
            Seværdigheder = new iconClass({
                iconUrl: 'images/ikoner-map/Seværdigheder.svg'
            }),
            Genforeningssten = new iconClass({
                iconUrl: 'images/ikoner-map/Genforeningssten.svg'
            }),
            Legepladser = new iconClass({
                iconUrl: 'images/ikoner-map/Legepladser.svg'
            }),
            Indkøbsmuligheder = new iconClass({
                iconUrl: 'images/ikoner-map/Indkøbsmuligheder.svg'
            }),
            Parkering = new iconClass({
                iconUrl: 'images/ikoner-map/Parkering.svg'
            }),
            Hvilesteder = new iconClass({
                iconUrl: 'images/ikoner-map/Hvilesteder.svg'
            })
        let iconArr = [];
        let stayArr = [];
        let OvernatningArr = [];
        let KirkerArr = [];
        let ToiletterArr = [];
        let KanopladserArr = [];
        let VandposterArr = [];
        let UdsigtspunkterArr = [];
        let BusstopArr = [];
        let ForplejningsmulighederArr = [];
        let SeværdighederArr = [];
        let GenforeningsstenArr = [];
        let LegepladserArr = [];
        let IndkøbsmulighederArr = [];
        let ParkeringArr = [];
        let HvilestederArr = [];

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
        stayArr = [...new Set(stayArr)];

        OvernatningArr = this.clustermarkers(OvernatningArr);
        KirkerArr = this.clustermarkers(KirkerArr);
        ToiletterArr = this.clustermarkers(ToiletterArr);
        KanopladserArr = this.clustermarkers(KanopladserArr);
        VandposterArr = this.clustermarkers(VandposterArr);
        UdsigtspunkterArr = this.clustermarkers(UdsigtspunkterArr);
        BusstopArr = this.clustermarkers(BusstopArr);
        ForplejningsmulighederArr = this.clustermarkers(ForplejningsmulighederArr);
        SeværdighederArr = this.clustermarkers(SeværdighederArr);
        GenforeningsstenArr = this.clustermarkers(GenforeningsstenArr);
        LegepladserArr = this.clustermarkers(LegepladserArr);
        IndkøbsmulighederArr = this.clustermarkers(IndkøbsmulighederArr);
        ParkeringArr = this.clustermarkers(ParkeringArr);
        HvilestederArr = this.clustermarkers(HvilestederArr);

        // --------------- Be on map from start ---------------
        for (const marker of fetchService.startMarkers) {
            let markerArr = `${marker}Arr`
            map.addLayer(eval(markerArr))
        }

        let overlayMaps = {};
        for (const icon of iconArr) {
            let overlayLine;
            let name = `${icon}Arr`

            if (icon == "Overnatning") {
                let stayIcon = "";
                let imageIcons = "";
                console.log(stayArr)
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



        // map.on('zoomend', () => {

        //     let leafletIcons = document.querySelectorAll('.leaflet-marker-icon');
        //     let currentZoom = map.getZoom();

        //     if (currentZoom < 12) {
        //         this.iconSizes = 15;
        //         for (const icon of leafletIcons) {
        //             icon.style.width = `${this.iconSizes}px`;
        //             icon.style.height = `${this.iconSizes}px`;
        //         }
        //     } else {
        //         this.iconSizes = 29;
        //         for (const icon of leafletIcons) {
        //             icon.style.width = `${this.iconSizes}px`;
        //             icon.style.height = `${this.iconSizes}px`;
        //         }
        //     }
        //     // console.log(this.iconSizes)
        // });
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

    clustermarkers(markersArr) {

        let clusterGroup = new L.MarkerClusterGroup({
            iconCreateFunction: function (cluster) {
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
                });;
            }
        });
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