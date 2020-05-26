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
        // this.goFrom(element.value, 'var(--camino-yellow)')
        element.style.backgroundColor = 'var(--camino-yellow)'
        etape.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest"
        });

        // Dropdown 
        let etape = document.querySelector(`#stage${number}`)
        etape.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        let dropdown = etape.getElementsByClassName('dropdown')[0];
        dropdown.style.display = 'block';
    }

    tabs(tab, number) {
        let description = document.querySelector(`#description${number}`);
        let images = document.querySelector(`#images${number}`);
        let comments = document.querySelector(`#comments${number}`);

        description.style.display = 'none';
        images.style.display = 'none';
        comments.style.display = 'none';

        let chosenTab = document.querySelector(`#${tab}${number}`);
        chosenTab.style.display = 'block';


        let underline = document.querySelector(`#hr${number}`);
        if (tab === "description") {
            underline.style.marginLeft = "0%";
            underline.style.width = "27%";
        }

        if (tab === "images") {
            underline.style.marginLeft = "32%";
            underline.style.width = "20%";
        }

        if (tab === "comments") {
            underline.style.marginLeft = "57%";
            underline.style.width = "50%";
        }

    }

}
const scrollService = new ScrollService();
export default scrollService;