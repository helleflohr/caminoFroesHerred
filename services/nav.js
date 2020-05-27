import { map } from "./../main.js";
import fetchService from "./../services/fetch.js"
import mapService from "./map.js"
class ScrollService {
    constructor() {
        this.trWidth = [];
        this.trMargin = [];
        this.numberCounter = [];
        this.numberImageCounter = [];
        this.numberDescriptionCounter = [];
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
                ], { 'padding': [50, 50], 'duration': 0.1 });
            }
        }
    }

    zoomOut() {
        map.setView(L.latLng(55.356480, 9.157975), 12)
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




        let underline = document.querySelector(`#hr${number}`);
        if (this.numberCounter.indexOf(number) === -1) {
            this.numberCounter.push(number)
            underline.style.width = `${this.trWidth[0]}px`;

        }


        let descriptionDiv = etape.getElementsByClassName('descriptionDiv')[0]

        if (this.numberDescriptionCounter.indexOf(number) === -1) {
            this.numberDescriptionCounter.push(number)

            for (const stage of fetchService.descriptions) {
                if (stage.acf.stageNumber == number) {

                    descriptionDiv.innerHTML = `${stage.content.rendered}`;
                }
            }

        }

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

    bigImg(number) {

        if (this.numberImageCounter.indexOf(number) === -1) {
            this.numberImageCounter.push(number)


            console.log(number)
            let etape = document.querySelector(`#stage${number}`);
            let imageContainer = etape.getElementsByClassName('tabImages')[0];
            for (const stage of fetchService.descriptions) {
                if (stage.acf.stageNumber == number) {
                    console.log(number, stage.acf.images, imageContainer)
                    imageContainer.innerHTML = `${stage.acf.images}`;

                    let images = imageContainer.getElementsByTagName('img');

                    for (const image of images) {
                        image.style.cursor = 'pointer';
                        image.onmouseover = function () {
                            this.style.opacity = "0.7";
                        }
                        image.onmouseout = function () {
                            this.style.opacity = "1";
                        }
                        image.addEventListener("click", function () {
                            // Get the expanded image
                            var expandImg = document.getElementById("expandedImg");
                            // Get the image text
                            var imgText = document.getElementById("imgtext");
                            // Use the same src in the expanded image as the image being clicked on from the grid
                            expandImg.src = image.src;
                            // Use the value of the alt attribute of the clickable image as text inside the expanded image
                            imgText.innerHTML = image.alt;
                            // Show the container element (hidden with CSS)
                            expandImg.parentElement.style.display = "block";
                            expandImg.parentElement.parentElement.style.display = "block";
                        }, false);
                    }

                }

            }


        }
    }


}
const scrollService = new ScrollService();
export default scrollService;