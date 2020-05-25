// import { map } from "./../main.js";
import fetchService from "./../services/fetch.js"
class ScrollService {
    constructor() {

    }
    goTo(number) {
        console.log(fetchService.descriptions)
        console.log(number)
        let etape = document.querySelector(`#stage${number}`)
        etape.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }
}
const scrollService = new ScrollService();
export default scrollService;