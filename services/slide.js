class SlideService {
  constructor() {
    this.fitBounds = [];
    this.slideIndex = 1;
    // this.showSlides(this.slideIndex)
  }




  // Next/previous controls
  plusSlides(n, number) {
    showSlides(this.slideIndex += n, number);
    console.log(n, number);

  }

  showSlides(n, number) {

    let i;
    let etape = document.querySelector(`#stage${number}`);
    let slides = etape.getElementsByClassName("mySlides");
    console.log(slides);

    if (n > slides.length) {
      this.slideIndex = 1
    }
    if (n < 1) {
      this.slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    slides[this.slideIndex - 1].style.display = "block";

  }
}




const slideService = new SlideService();
export default slideService;