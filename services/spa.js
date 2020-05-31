import stageService from "./stages.js"
import mapInfoService from "./mapInfo.js";
import mapService from "./map.js";
import scrollService from "./nav.js"
import loaderService from "./loader.js"
import { map, latitude, longitude, zoom } from "./../main.js";
class SpaService {
  constructor() {
    this.defaultPage = "home";
    this.counter = 0;
    this.visitedPages = [];
  }

  init() {
    this.pages = document.querySelectorAll(".page");
    this.navItems = document.querySelectorAll(".tabbar a");
    this.pageChange();
  }

  // hide all pages
  hideAllPages() {
    for (let page of this.pages) {
      // console.log(page)
      page.style.display = "none";
    }
  }

  // show page or tab
  showPage(pageId) {
    if (window.innerWidth < 1024) {
      this.hideAllPages();
      document.querySelector(`#${pageId}`).style.display = "block";
      this.setActiveTab(pageId);
    }
  }

  // sets active tabbar/ menu item
  setActiveTab(pageId) {
    for (let navItem of this.navItems) {
      if (`#${pageId}` === navItem.getAttribute("href")) {
        navItem.classList.add("active");
      } else {
        navItem.classList.remove("active");
      }
    }
  }

  // navigate to a new view/page by changing href
  navigateTo(pageId) {
    window.location.href = `#${pageId}`;
  }

  // set default page or given page by the hash url
  // function is called 'onhashchange'
  pageChange() {



    let page = this.defaultPage;
    if (window.location.hash) {
      page = window.location.hash.slice(1);
      console.log(page)

    }





    // Only show loader the first time on each page
    if (this.visitedPages.indexOf(page) === -1) {
      loaderService.show(true)
    }
    this.visitedPages.push(page)

    if (window.innerWidth > 1024) {
      this.navigateTo('');
    } else {
      this.showPage(page);
      if (page === 'grid-posts') {
        document.querySelector('.navigationEtape').style.display = 'block';
        document.querySelector('.maparea').style.display = 'block';
        stageService.stageSize();


        scrollService.scrollToStage(scrollService.chosenNumber);
        if (this.visitedPages[0] !== page) {
          scrollService.createFirstTabUnderline(scrollService.chosenNumber)
        }


        // scrollService.tabs('description', scrollService.chosenNumber);

      } else if (page === 'home') {
        if (window.innerWidth < 1024) {
          document.querySelector('.navigationEtape').style.display = 'none';
          document.querySelector('.maparea').style.display = 'none';
        } else {
          document.querySelector('.navigationEtape').style.display = 'block';
          document.querySelector('.maparea').style.display = 'block';
        }
        loaderService.show(false)
      } else if (page === 'mapid') {
        document.querySelector('.navigationEtape').style.display = 'block';
        document.querySelector('.maparea').style.display = 'block';
        if (this.visitedPages[0] !== page) {
          map._onResize();
        }


        if (this.counter === 0) {
          console.log(this.counter)
          mapInfoService.createMarkers();
          this.counter++
        }
      }
    }

  }

  // show and hide tabbar
  hideTabbar(hide) {
    let tabbar = document.querySelector('#tabbar');
    if (hide) {
      tabbar.classList.add("hide");
    } else {
      tabbar.classList.remove("hide");
    }
  }
}
const spaService = new SpaService();
export default spaService;