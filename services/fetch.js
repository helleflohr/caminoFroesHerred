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
        // console.log(this.descriptions)
        // this.appendPosts(json)

        let response = await fetch("http://dittejohannejustesen.dk/wordpress/wordpress-cfh/wp-json/wp/v2/posts?_embed&categories=2&per_page=15")
        this.descriptions = await response.json();
        // console.log(this.descriptions)
        return this.descriptions
        // this.descriptions = await jsonData





        //  fetch("http://dittejohannejustesen.dk/wordpress/wordpress-cfh/wp-json/wp/v2/posts?_embed&categories=2&per_page=15")
        //     .then((response) => {
        //         return response.json();
        //     })
        //     .then((json) => {
        //         this.descriptions = json;
        //         console.log(this.descriptions)
        //         // this.appendPosts(json)


        //     });
    }
    async get() {
        // console.log(this.descriptions)
        if (this.descriptions === true) {
            // console.log('if length')
            // console.log(this.descriptions)
            return this.descriptions
        } else {
            // console.log('if not length')
            await this.fetchDescription();
            // console.log(this.descriptions)
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