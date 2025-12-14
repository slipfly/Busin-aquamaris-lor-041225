const previousSlide = 'slide_7'
const nextSlide = 'slide_9'

const thisSlide = document.title;
updateDC({
    slide: thisSlide,
    startTime: Date.now()
}, undefined);

const tl = gsap.timeline();

tl.fromTo('.title, .subtitle', {
    y: 300,
    opacity: 0
}, {
    y: 0,
    opacity: 1,
    stagger: .4,
}).fromTo('.product', {
    y: 800
}, {
    y: 0
});