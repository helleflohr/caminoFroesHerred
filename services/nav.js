// import { map } from "./../main.js";
import fetchService from "./../services/fetch.js"
class ScrollService {
    constructor() {

    }
    goTo(number) {
        // console.log(fetchService.descriptions)
        // console.log(number)

        let line = document.getElementsByClassName(`line${number}`)[0];
        line.style.stroke = 'var(--camino-yellow)'
    }

    goFrom(number, color) {
        // console.log('out')
        let line = document.getElementsByClassName(`line${number}`)[0];
        line.style.stroke = `var(${color})`
    }

    chosen(element) {

        let selected = document.querySelector(".btn.selected");
        let line = document.getElementsByClassName(`line${element.value}`)[0];
        // Adds the class "selected" to the button wich has been selected
        element.classList.add("selected");
        // Removes the class 
        selected.classList.remove("selected");



        // console.log(element)

        // line.style.stroke = 'var(--camino-yellow)'
        // this.goFrom(element.value, 'var(--camino-yellow)')
        // element.style.backgroundColor = 'var(--camino-yellow)'
        etape.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest"
        });

        // Dropdown
        let etape = document.querySelector(`#stage${element.value}`)
        etape.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
        });
        let dropdown = etape.getElementsByClassName('dropdown')[0];
        dropdown.style.display = 'block';


    }
}
const scrollService = new ScrollService();
export default scrollService;