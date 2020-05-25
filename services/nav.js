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
        let line = document.getElementsByClassName(`line${number}`)[0];
        line.style.stroke = 'var(--camino-yellow)'
    }

    goFrom(number, color) {
        console.log('out')
        let line = document.getElementsByClassName(`line${number}`)[0];
        line.style.stroke = `var(${color})`
    }

    chosen(number) {
        let line = document.getElementsByClassName(`line${number}`)[0];
        line.style.stroke = 'var(--camino-yellow)'
        this.goFrom(number, '--camino-yellow')
    }
}
const scrollService = new ScrollService();
export default scrollService;