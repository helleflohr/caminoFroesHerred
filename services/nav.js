// import { map } from "./../main.js";
import fetchService from "./../services/fetch.js"
class ScrollService {
    constructor() {

    }
    goTo(number) {
        console.log(fetchService.descriptions)
        console.log(number)
        let etape = document.querySelector(`#stage${number}`)
        etape.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
        let line = document.getElementsByClassName(`line${number}`)[0];
        line.style.stroke = 'var(--camino-yellow)'
    }

    goFrom(number, color) {
        console.log('out')
        let line = document.getElementsByClassName(`line${number}`)[0];
        line.style.stroke = `var(${color})`
    }

    chosen(element) {
        console.log(element)
        let line = document.getElementsByClassName(`line${element.value}`)[0];
        line.style.stroke = 'var(--camino-yellow)'
        // this.goFrom(element.value, 'var(--camino-yellow)')
        element.style.backgroundColor = 'var(--camino-yellow)'

        // Dropdown
        let etape = document.querySelector(`#stage${element.value}`)
        let dropdown = etape.getElementsByClassName('dropdown')[0];
        dropdown.style.display = 'block';


    }
}
const scrollService = new ScrollService();
export default scrollService;