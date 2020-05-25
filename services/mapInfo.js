import { map } from "./../main.js";
class MapInfoService {
    constructor() {
        this.createMarkers();

    }

    createMarkers() {

        let iconClass = L.Icon.extend({
            options: {
                // shadowUrl: 'images/and.jpg',
                iconSize: [38, 38], // size of the icon
                shadowSize: [50, 64], // size of the shadow
                iconAnchor: [19, 19], // point of the icon which will correspond to marker's location
                shadowAnchor: [4, 62],  // the same for the shadow
                popupAnchor: [0, -15] // point from which the popup should open relative to the iconAnchor
            }
        })


        let stay = new iconClass({ iconUrl: 'images/stay.png' }),
            church = new iconClass({ iconUrl: 'images/lyd.png' }),
            toilets = new iconClass({ iconUrl: 'images/toilets.png' })
        // orangeIcon = new iconClass({ iconUrl: 'leaf-orange.png' });




        fetch("http://dittejohannejustesen.dk/wordpress/wordpress-cfh/wp-json/wp/v2/posts?_embed&categories=3")
            .then(function (response) {
                return response.json();
            })
            .then((json) => {
                this.getDataForCheckbox(json);

                // L.marker([55.379615, 9.089192], { icon: redIcon }).addTo(map).bindPopup("<b>Hello world!</b>I am a popup!<img src='images/lyd.png' style='max-width: 100%'>")
                // L.marker([55.379615, 9.049192], { icon: redIcon }).addTo(map).bindPopup("<b>Hello world!</b>I am a popup!<img src='images/lyd.png' style='max-width: 100%'>")
                // let iconArr = [];
                // for (let post of json) {
                //     // let choosenIcon = post.acf.infotype;
                //     iconArr.push(post.acf.infotype);
                //     L.marker([post.acf.latitude, post.acf.longitude], { icon: eval(post.acf.infotype) }).addTo(map).bindPopup(`${post.content.rendered}`)

                // }


                // iconArr = [...new Set(iconArr)];
                // console.log(iconArr);
                // let template = "";
                // for (const markerType of iconArr) {
                //     template += /*html*/ `
                //     <div class="boxIcon">
                //     <input type="checkbox">
                //   <p>${markerType}</p> <img src="images/${markerType}.png">
                //   </div>

                //   `


                // }
                // let infoBox = document.querySelector('#infoBox');
                // infoBox.innerHTML = template;
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
        // L.marker([post.acf.breddegrad, post.acf.Længdegrad], { icon: greenIcon }).addTo(map).bindPopup("<b>Hello world!</b>I am a popup!<img src='images/and.jpg' style='max-width: 100%'>")
        // L.marker([55.379615, 9.089192], { icon: redIcon }).addTo(map).bindPopup("<b>Hello world!</b>I am a popup!<img src='images/lyd.png' style='max-width: 100%'>")
        // L.marker([55.379615, 9.049192], { icon: redIcon }).addTo(map).bindPopup("<b>Hello world!</b>I am a popup!<img src='images/lyd.png' style='max-width: 100%'>")
    };

    getDataForCheckbox(json) {
        let iconArr = [];
        for (let post of json) {
            iconArr.push(post.acf.infotype);
            console.log(iconArr);


        }
        iconArr = [...new Set(iconArr)];
        console.log(iconArr);
    }
}

const mapInfoService = new MapInfoService();
export default mapInfoService;