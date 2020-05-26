// import { map } from "./../main.js";
import fetchService from "./../services/fetch.js"
class ScrollService {
    constructor() { }
    goTo(number) {
        // console.log(fetchService.descriptions)
        console.log(number)

        let line = document.getElementsByClassName(`line${number}`)[0];
        // line.style.stroke = 'var(--camino-yellow)'
        line.classList.add("hoverLine");
    }

    goFrom(number, color) {
        console.log(number, color)

        let line = document.getElementsByClassName(`line${number}`)[0];
        line.classList.remove("hoverLine");
        // line.style.stroke = `var(${color})`
    }

    chosen(number) {

        let selected = document.querySelector(".btn.selected");
        let numberOfStages = 11

        for (let i = 1; i < (numberOfStages + 1); i++) {
            let lines = document.getElementsByClassName(`line${i}`)[0];
            lines.classList.remove("selectedLine");


            let etape = document.querySelector(`#stage${i}`);
            let headline = etape.querySelector('h4')
            headline.style.color = 'var(--text-color-light)'

        }
        let line = document.getElementsByClassName(`line${number}`)[0];

        line.classList.add("selectedLine")
        // Adds the class "selected" to the button wich has been selected
        let allButtons = document.getElementsByClassName('navbtn');
        console.log(allButtons)
        for (const button of allButtons) {
            console.log(number, button, button.value)
            // con

            if (button.value == number) {
                button.classList.add("selected");
                console.log('this is the number', number)
            } else {
                button.classList.remove("selected");
            }

        }

        // Removes the class 


        let etape = document.querySelector(`#stage${number}`);
        let headline = etape.querySelector('h4')
        headline.style.color = 'var(--camino-yellow)'



        // Dropdown 

        etape.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest"
        });
        let allDropdowns = document.getElementsByClassName('dropdown');
        for (const dropdown of allDropdowns) {
            dropdown.style.display = "none";
        }


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
            underline.style.width = "20%";
        }

        if (tab === "images") {
            underline.style.marginLeft = "37%";
            underline.style.width = "15%";
        }

        if (tab === "comments") {
            underline.style.marginLeft = "69%";
            underline.style.width = "30%";
        }

    }

}
const scrollService = new ScrollService();
export default scrollService;