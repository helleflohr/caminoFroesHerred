// import { map } from "./../main.js";
class FetchService {
    constructor() {
        this.descriptions = [];
        this.markers;
        this.startMarkers;
        this.fetchStartMarkers();


    }
    async fetchDescription() {
        let response = await fetch("http://dittejohannejustesen.dk/wordpress/wordpress-cfh/wp-json/wp/v2/posts?_embed&categories=2&per_page=17")
        this.descriptions = await response.json();
    }
    async getDescriptions() {
        if (this.descriptions.length === 0) {
            await this.fetchDescription();
        }
        return this.descriptions
    }

    async fetchMarkers() {
        await fetch("http://dittejohannejustesen.dk/wordpress/wordpress-cfh/wp-json/wp/v2/posts?_embed&categories=3&per_page=300")
            .then(function (response) {
                return response.json();
            })
            .then((json) => {
                this.markers = json;
            });
        console.log(this.markers)
    }

    async fetchStartMarkers() {
        await fetch("http://dittejohannejustesen.dk/wordpress/wordpress-cfh/wp-json/wp/v2/posts?_embed&categories=9")
            .then(function (response) {
                return response.json();
            })
            .then((json) => {
                this.startMarkers = json[0].acf.onMapFromStart;

            });
        console.log(this.startMarkers)
    }

}
const fetchService = new FetchService();
export default fetchService;