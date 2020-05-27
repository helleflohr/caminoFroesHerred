class SlideService {
  constructor() {
    this.fitBounds = [];
    this.slideIndex = 1;
    // this.showSlides(this.slideIndex)
  }




  // Next/previous controls
  plusSlides(n) {
    showSlides(this.slideIndex += n);
  }

  showSlides(n) {
    console.log(n);



    var i;
    var slides = document.getElementsByClassName("mySlides");
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