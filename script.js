const slider = document.querySelector('.slider');
const images = slider.querySelectorAll('img');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const pagination = document.querySelector('.pagination');
let currentIndex = 0;
let autoSlideInterval;

images.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.addEventListener('click', () => goToSlide(index));
    pagination.appendChild(dot);
});

const dots=pagination.querySelectorAll('div');

function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot,index) => {
        dot.classList.toggle('active', index===currentIndex);
    });
}
function goToSlide(index) {
    currentIndex=(index+images.length)%images.length;
    updateSlider();
}
prevBtn.addEventListener('click',() => goToSlide(currentIndex-1));
nextBtn.addEventListener('click',() => goToSlide(currentIndex+1));
function startAutoSlide() {
    autoSlideInterval = setInterval(() => goToSlide(currentIndex + 1), 3000);
}
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}
slider.addEventListener('mouseenter',stopAutoSlide);
slider.addEventListener('mouseleave',startAutoSlide);
let startX=0;
let endX=0;
slider.addEventListener('touchstart', (event) =>{
    startX=event.touches[0].clientX;
});
slider.addEventListener('touchend', (event) =>{
    endX=event.changedTouches[0].clientX;
    handleSwipe();
});
function handleSwipe() {
    const swipeThreshold=50;
    const swipeDistance=endX-startX;
    if (swipeDistance>swipeThreshold) {
        goToSlide(currentIndex-1);
    }
    else if (swipeDistance<swipeThreshold) {
        goToSlide(currentIndex+1);
    }
}
updateSlider();
startAutoSlide();