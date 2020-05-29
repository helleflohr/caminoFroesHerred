// import { map } from "./../main.js";
class FetchService {
    constructor() {
        this.descriptions;
        this.markers;
        // this.fetchDescription();
        // this.fetchMarkers();
        // this.jsonData;
    }
    async fetchDescription() {
        // await fetch("http://dittejohannejustesen.dk/wordpress/wordpress-cfh/wp-json/wp/v2/posts?_embed&categories=2&per_page=15")
        //     .then((response) => {
        //         return response.json();
        //     })
        //     .then((json) => {
        // this.descriptions = json;


        let response = await fetch("http://dittejohannejustesen.dk/wordpress/wordpress-cfh/wp-json/wp/v2/posts?_embed&categories=2&per_page=15")
        let jsonData = await response.json();
        // console.log(this.descriptions)
        // return jsonData
        this.descriptions = await jsonData

    }
    get() {
        if (this.descriptions.length) {
            return this.descriptions
        } else {
            this.fetchDescription();
            return this.descriptions
        }

    }

    async fetchMarkers() {
        await fetch("http://dittejohannejustesen.dk/wordpress/wordpress-cfh/wp-json/wp/v2/posts?_embed&categories=3&per_page=100")
            .then(function (response) {
                return response.json();
            })
            .then((json) => {
                // this.getDataForCheckbox(json);
                this.markers = json;
                // console.log(this.markers)
            });
    }
}
const fetchService = new FetchService();
export default fetchService;