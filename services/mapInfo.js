import { map } from "./../main.js";
class MapInfoService {
    constructor() {
        this.createMarkers();

    }

    createMarkers() {

        let iconClass = L.Icon.extend({
            options: {
                // shadowUrl: 'images/and.jpg',
                iconSize: [30, 30],
                shadowSize: [40, 44],
                iconAnchor: [22, 94],
                shadowAnchor: [4, 62],
                popupAnchor: [-3, -76]
            }
        })


        let Overnatning = new iconClass({ iconUrl: 'images/and.jpg' })
        // redIcon = new iconClass({ iconUrl: 'images/lyd.png' }),
        // orangeIcon = new iconClass({ iconUrl: 'leaf-orange.png' });


        fetch("http://dittejohannejustesen.dk/wordpress/wordpress-cfh/wp-json/wp/v2/posts?_embed&categories=3")
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                console.log(json)

                // this.appendMarkers(json)
                for (let post of json) {
                    let theIcon;
                    if (post.acf.infotype == "Overnatning") {
                        theIcon = "Overnatning"
                    }
                    console.log(post.acf.infotype)
                    L.marker([post.acf.latitude, post.acf.longitude], { icon: post.acf[infotype] }).addTo(map).bindPopup(`${post.content.rendered}`)

                }
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
        </> `
        }
        L.marker([post.acf.breddegrad, post.acf.Længdegrad], { icon: greenIcon }).addTo(map).bindPopup("<b>Hello world!</b>I am a popup!<img src='images/and.jpg' style='max-width: 100%'>")
        L.marker([55.379615, 9.089192], { icon: redIcon }).addTo(map).bindPopup("<b>Hello world!</b>I am a popup!<img src='images/lyd.png' style='max-width: 100%'>")
        L.marker([55.379615, 9.049192], { icon: redIcon }).addTo(map).bindPopup("<b>Hello world!</b>I am a popup!<img src='images/lyd.png' style='max-width: 100%'>")
    };
}

const mapInfoService = new MapInfoService();
export default mapInfoService;