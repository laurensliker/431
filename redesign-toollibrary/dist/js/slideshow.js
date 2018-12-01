// Slider init
const slideshow = document.querySelector("#js-slideshow");
const slides = slideshow.querySelectorAll(".js-slideshow-slide");
var slideshowTimer;

// Get screenreaders to announce slides if the slideshow has focus
window.addEventListener("focusin", function () {
    slideshow.setAttribute("aria-live", "polite");
});

// But stop announcing when the slideshow doesn't have focus
window.addEventListener("blur", function () {
    slideshow.setAttribute("aria-live", "off");
});

// Lazy load images
const fetchImage = url => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = url;
        image.onload = resolve;
        image.onerror = reject;
    });
};

const loadImage = image => {
    const src = image.dataset.src;
    fetchImage(src).then(() => {
        image.src = src;
        image.classList.remove("js-lazy");
        image.removeAttribute("data-src");
    });
};

const revealImage = target => {
    target.setAttribute("data-active", true);
    const img = target.querySelector("img");
    if (img.dataset.src) {
        loadImage(img);
    }
};

// Set up data state; first slide should be active, others not
slides.forEach((slide, index) => {
    if (index === 0) {
        // slide.setAttribute("data-active", true);
        revealImage(slide);
    } else {
        slide.setAttribute("data-active", false);
    }
});

// Slider actions
const slideshowButtons = slideshow.querySelectorAll(".js-slideshow-button");

// Determine which slide is next up
const updateSlide = direction => {
    // Deprioritize the current slide
    let currentSlide = document.querySelector(
        ".js-slideshow-slide[data-active=true]"
    );
    currentSlide.setAttribute("data-active", false);

    if (direction === "next") {
        // Find the next slide
        let nextSlide = currentSlide.nextElementSibling;

        if (nextSlide !== null) {
            // If we are not on the last slide
            var target = nextSlide;
        } else {
            // If we are on the last slide
            var target = slides[0];
        }
    }
    if (direction === "previous") {
        // Find the previous slide
        let previousSlide = currentSlide.previousElementSibling;

        if (previousSlide !== null) {
            // If we are not on the first slide
            var target = previousSlide;
        } else {
            // If we are on the first slide
            var target = slides[slides.length - 1];
        }
    }

    revealImage(target);
};

const startSlideshow = () => {
    updateSlide("next");
    slideshowTimer = setTimeout(startSlideshow, 5000);
};

const pauseSlideshow = () => {
    clearTimeout(slideshowTimer);
};

startSlideshow();

// Create eventListener for clicking on the buttons
for (let i = 0; i < slideshowButtons.length; i++) {
    slideshowButtons[i].addEventListener("click", function (e) {
        let action = this.dataset.action;
        // console.log(action);

        if (action === "pause") {
            pauseSlideshow();
            this.setAttribute("aria-label", "play");
            this.dataset.action = "play";
        } else if (action === "play") {
            startSlideshow();
            this.setAttribute("aria-label", "pause");
            this.dataset.action = "pause";
        } else {
            updateSlide(action);
        }
    });
}

// Create eventListener for clicking on the buttons
for (let i = 0; i < slideshowButtons.length; i++) {
    slideshowButtons[i].addEventListener("click", function (e) {
        let action = this.dataset.action;
        // console.log(action);

        if (action === "pause") {
            pauseSlideshow();
            this.setAttribute("aria-label", "play");
            this.dataset.action = "play";
        } else if (action === "play") {
            startSlideshow();
            this.setAttribute("aria-label", "pause");
            this.dataset.action = "pause";
        } else {
            updateSlide(action);
        }
    });
}
