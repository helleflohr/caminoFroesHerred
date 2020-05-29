import {
    map
} from "./../main.js";
import fetchService from "./../services/fetch.js"
import mapService from "./map.js"
class StageService {
    constructor() {

    }
    stageSize() {
        let listItem = document.getElementsByClassName('backgroundimg');
        // console.log(listItem[0].offsetWidth)

        for (const item of listItem) {
            // console.log(item.offsetWidth)
            let height = item.offsetWidth / 3 * 2
            // console.log(height)
            item.style.height = `${height}px`

        }

    }
}

const stageService = new StageService();
export default stageService;