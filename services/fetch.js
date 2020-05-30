// import { map } from "./../main.js";
class FetchService {
    constructor() {
        this.descriptions = [];
        this.markers;

    }
    async fetchDescription() {
        let response = await fetch("http://dittejohannejustesen.dk/wordpress/wordpress-cfh/wp-json/wp/v2/posts?_embed&categories=2&per_page=15")
        this.descriptions = await response.json();
    }
    async getDescriptions() {
        if (this.descriptions.length === 0) {
            await this.fetchDescription();
        }
        return this.descriptions
    }

    async fetchMarkers() {
        await fetch("http://dittejohannejustesen.dk/wordpress/wordpress-cfh/wp-json/wp/v2/posts?_embed&categories=3&per_page=100")
            .then(function (response) {
                return response.json();
            })
            .then((json) => {
                this.markers = json;
            });
    }
}
const fetchService = new FetchService();
export default fetchService;