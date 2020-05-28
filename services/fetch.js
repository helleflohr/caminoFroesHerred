// import { map } from "./../main.js";
class FetchService {
    constructor() {
        this.descriptions;
        this.markers;
        // this.fetchDescription();
        // this.fetchMarkers();
    }
    async fetchDescription() {
        await fetch("http://dittejohannejustesen.dk/wordpress/wordpress-cfh/wp-json/wp/v2/posts?_embed&categories=2&per_page=15")
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                await this.descriptions = json;
                console.log(this.descriptions)
                // this.appendPosts(json)


            });
    }

    async fetchMarkers() {
        await fetch("http://dittejohannejustesen.dk/wordpress/wordpress-cfh/wp-json/wp/v2/posts?_embed&categories=3&per_page=100")
            .then(function (response) {
                return response.json();
            })
            .then((json) => {
                // this.getDataForCheckbox(json);
                await this.markers = json;
                console.log(this.markers)
            });
    }
}
const fetchService = new FetchService();
export default fetchService;