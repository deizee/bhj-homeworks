const sliderArrowPrev = document.querySelector('.slider__arrow_prev');
const sliderArrowNext = document.querySelector('.slider__arrow_next');
const sliderItems = [...document.querySelectorAll('.slider__item')];
const sliderDots = [...document.querySelectorAll('.slider__dot')];

sliderArrowPrev.addEventListener('click', onArrowPrevClick);
sliderArrowNext.addEventListener('click', onArrowNextClick);
sliderDots.forEach((dot, index) => dot.addEventListener('click', () => changeSlide(index)));

function onArrowPrevClick() {
    const index = sliderItems.findIndex(el => el.classList.contains('slider__item_active'));
    if (index - 1 < 0) {
        changeSlide(sliderItems.length - 1);
    } else {
        changeSlide(index - 1);
    }
}

function onArrowNextClick() {
    const index = sliderItems.findIndex(el => el.classList.contains('slider__item_active'));
    if (index + 1 > sliderItems.length - 1) {
        changeSlide(0);
    } else {
        changeSlide(index + 1);
    }
}

function changeSlide(i) {
    sliderItems.forEach(el => el.classList.remove('slider__item_active'));
    sliderItems[i].classList.add('slider__item_active');

    sliderDots.forEach(el => el.classList.remove('slider__dot_active'));
    sliderDots[i].classList.add('slider__dot_active');
}