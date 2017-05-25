const slideShow = (function () {
    let slideIndex = 1;
    let slideId = [];
    function fillSlideShow() {
        const divText = document.getElementsByClassName('text');
        const divSlid = document.getElementsByClassName('imgSlide');
        requestServer.getArticles(0, 3).then((array) => {
            for (let i = 0; i < 3; i += 1) {
                divSlid[i].src = array[i].img;
                divText[i].textContent = array[i].title;
                slideId.push(array[i]._id);
            }
            document.querySelector('.slideshow-container').dataset.id = slideId[slideIndex - 1];
        });
    }

    function showSlides(n) {
        let i = 0;
        const slides = document.getElementsByClassName('mySlides');
        const dots = document.getElementsByClassName('dot');
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }
        document.querySelector('.slideshow-container').dataset.id = slideId[slideIndex - 1];

        for (i = 0; i < slides.length; i += 1) {
            slides[i].style.display = 'none';
        }
        for (i = 0; i < dots.length; i += 1) {
            dots[i].className = dots[i].className.replace('active', '');
        }
        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].className += ' active';
    }
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }
    return {
        plusSlides,
        currentSlide,
        showSlides,
        fillSlideShow,
    };
}());
