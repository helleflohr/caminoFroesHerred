import {
    map
} from "./../main.js";
import fetchService from "./../services/fetch.js"
import mapService from "./map.js"
class StageService {
    constructor() {
        // this.underlineTab();
    }
    underlineTab() {
        let listItem = document.getElementsByClassName('tabNav');
        // console.log(listItem[0].offsetWidth)

        for (const item of listItem) {
            // console.log(item.offsetWidth)

        }

    }
}

const stageService = new StageService();
export default stageService;