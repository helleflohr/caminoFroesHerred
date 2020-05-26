// import { map } from "./../main.js";
import fetchService from "./../services/fetch.js"
class ScrollService {
    constructor() {
    }
    goTo(number) {
        console.log(fetchService.descriptions)
        console.log(number)

        let line = document.getElementsByClassName(`line${number}`)[0];
        line.style.stroke = 'var(--camino-yellow)'
    }

    goFrom(number, color) {
        console.log('out')
        let line = document.getElementsByClassName(`line${number}`)[0];
        line.style.stroke = `var(${color})`
    }

    /* ---------- Johanne & Maja ------ */
    chosen(number) {
        console.log(number)
        let line = document.getElementsByClassName(`line${number}`)[0];
        line.style.stroke = 'var(--camino-yellow)'
        // this.goFrom(number.value, 'var(--camino-yellow)')
        /* number.style.backgroundColor = 'var(--camino-yellow)' */

        // Dropdown 
        let etape = document.querySelector(`#stage${number}`)
        etape.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        let dropdown = etape.getElementsByClassName('dropdown')[0];
        if (dropdown.style.display === "none") {
            dropdown.style.display = "block";
          } else {
            dropdown.style.display = "none";
          }
    }

}
const scrollService = new ScrollService();
export default scrollService;