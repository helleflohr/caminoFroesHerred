// import { map } from "./../main.js";
class FetchService {
    constructor() {
        this.descriptions;
        this.markers;
        this.fetchDescription();
    }
    fetchDescription() {
        fetch("http://dittejohannejustesen.dk/wordpress/wordpress-cfh/wp-json/wp/v2/posts?_embed&categories=2&per_page=15")
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.descriptions = json;
                console.log(this.descriptions)
                // this.appendPosts(json)


            });
    }
}
const fetchService = new FetchService();
export default fetchService;