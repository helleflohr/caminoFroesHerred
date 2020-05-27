import { map } from "./../main.js";
import fetchService from "./../services/fetch.js"
import mapService from "./map.js"
class ScrollService {
    constructor() {
        this.trWidth = [];
        this.trMargin = [];
        this.numberCounter = [];
    }

    scrollToElement(element) {
        let top = document.querySelector(`#${element}`);
        top.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
        });
    }

    scrollToEtape(number) {
        let etape = document.querySelector(`#stage${number}`);
        if (number == 1) {
            console.log(number)
            etape.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest"
            });
        } else {
            etape.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest"
            });
        }
    }


    goTo(number) {
        // console.log(fetchService.descriptions)


        let line = document.getElementsByClassName(`line${number}`)[0];
        // line.style.stroke = 'var(--camino-yellow)'
        line.classList.add("hoverLine");
    }

    goFrom(number) {

        let line = document.getElementsByClassName(`line${number}`)[0];
        line.classList.remove("hoverLine");

    }

    zoomToEtape(number) {
        for (const etape of mapService.fitBounds) {
            if (etape.number == number) {
                console.log(etape.southWest.lat, etape.southWest.lng)
                map.flyToBounds([
                    [etape.southWest.lat, etape.southWest.lng],
                    [etape.northEast.lat, etape.northEast.lng]
                ], { 'padding': [50, 50], 'duration': 1.5 });
            }
        }
    }

    zoomOut() {
        map.setView(L.latLng(55.356480, 9.157975), 11)
    }

    chosen(number) {

        // let selected = document.querySelector(".btn.selected");
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
        for (const button of allButtons) {

            if (button.value == number) {
                button.classList.add("selected");
            } else {
                button.classList.remove("selected");
            }

        }

        // Removes the class 


        let etape = document.querySelector(`#stage${number}`);
        let headline = etape.querySelector('h4')
        headline.style.color = 'var(--camino-yellow)'



        // Dropdown 

        let allDropdowns = document.getElementsByClassName('dropdown');
        for (const dropdown of allDropdowns) {
            dropdown.style.display = "none";
        }


        let dropdown = etape.getElementsByClassName('dropdown')[0];
        dropdown.style.display = 'block';





        let listItem = etape.getElementsByClassName('tabNav');
        for (const item of listItem) {
            this.trWidth.push(item.offsetWidth)
            this.trMargin.push(item.offsetLeft)
        }


        // this.counter = 0
        // let numberCounter = []

        let underline = document.querySelector(`#hr${number}`);
        if (this.numberCounter.indexOf(number) === -1) {
            this.numberCounter.push(number)
            underline.style.width = `${this.trWidth[0]}px`;

        }




        console.log(this.numberCounter)


        // if (this.counter === 0) {
        //     console.log(this.counter)
        //     let underline = document.querySelector(`#hr${number}`);

        //     underline.style.width = `${this.trWidth[0]}px`;

        //     this.counter++
        //     // let offse = underline.offsetParent;
        //     // console.log(offse, underline.offsetLeft)
        // }

    }



    tabs(tab, number) {
        console.log('im using tabs')
        console.log(this.trMargin)
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
            underline.style.width = `${this.trWidth[0]}px`;
        }

        if (tab === "images") {
            let margin = this.trMargin[1] - this.trMargin[0]
            underline.style.marginLeft = `${margin}px`;
            underline.style.width = `${this.trWidth[1]}px`;
        }

        if (tab === "comments") {
            let margin = this.trMargin[2] - this.trMargin[0]
            underline.style.marginLeft = `${margin}px`;
            underline.style.width = `${this.trWidth[2]}px`;
        }
        console.log(underline.style.width)
    }

}
const scrollService = new ScrollService();
export default scrollService;