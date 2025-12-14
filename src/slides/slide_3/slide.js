const previousSlide = 'slide_2'
const nextSlide = 'slide_4'

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
    stagger: .2,
}).fromTo('.col1', .5, {
    y: 300,
    opacity: 0
}, {
    y: 0,
    opacity: 1,
    stagger: .1,
}).fromTo('.col2', .5, {
    y: 300,
    opacity: 0
}, {
    y: 0,
    opacity: 1,
    stagger: .1,
}, '-=.5').fromTo('.corall-1', {
    scale: 0
}, {
    scale: 1
}).fromTo('.corall-2', {
    scale: 0
}, {
    scale: 1
}).fromTo('.text', .2, {
    opacity: 0,
    scale: 1.2
}, {
    opacity: 1,
    scale: 1
});