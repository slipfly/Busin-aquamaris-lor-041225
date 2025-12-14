const previousSlide = 'slide_3'
const nextSlide = 'slide_5'

const thisSlide = document.title;
updateDC({
    slide: thisSlide,
    startTime: Date.now()
}, undefined);

const tl = gsap.timeline();

tl.fromTo('.title', {
    y: 300,
    opacity: 0
}, {
    y: 0,
    opacity: 1,
}).fromTo('.col1', {
    y: 300,
    opacity: 0
}, {
    y: 0,
    opacity: 1,
    stagger: .2
}).fromTo('.col2', {
    y: 300,
    opacity: 0
}, {
    y: 0,
    opacity: 1,
    stagger: .2
}, "-=.8").fromTo('.col3', {
    y: 300,
    opacity: 0
}, {
    y: 0,
    opacity: 1,
    stagger: .2
}, "-=.8");