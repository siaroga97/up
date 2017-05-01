let slideShow = (function () {
    let slideIndex = 1;
    let slideId=[{}
    ];
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function fillSlideShow() {
        let divText = document.getElementsByClassName('text');
        let divSlid = document.getElementsByClassName('imgSlide');
        let array = articleModel.getArticles(0, articleModel.getSize());
        for (let i = 0; i < 3; i++) {
            divSlid[i].src = array[i].img;
            divText[i].textContent = array[i].title;
            slideId.push(array[i].id);
        }

    }

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName('mySlides');
        let dots = document.getElementsByClassName('dot');
        let text = document.getElementsByClassName('text');
        if (n > slides.length) {
            slideIndex = 1
        }
        if (n < 1) {
            slideIndex = slides.length
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        document.querySelector('.slideshow-container').dataset.id=slideId[slideIndex];
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    }

   return {
       plusSlides:plusSlides,
       currentSliced:currentSlide,
       showSlides: showSlides,
       fillSlideShow: fillSlideShow
   };
}())