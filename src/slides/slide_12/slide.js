const previousSlide = 'slide_11'
const nextSlide = 'slide_13'

const thisSlide = document.title;
updateDC({
    slide: thisSlide,
    startTime: Date.now()
}, undefined);

const tl = gsap.timeline();

tl.fromTo('.title, .star, .side', {
    y: 300,
    opacity: 0
}, {
    y: 0,
    opacity: 1,
    stagger: .2,
});