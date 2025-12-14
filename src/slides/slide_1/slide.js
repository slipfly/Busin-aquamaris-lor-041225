const previousSlide = 'slide_0'
const nextSlide = 'slide_2'

const thisSlide = document.title;
updateDC({
    slide: thisSlide,
    startTime: Date.now()
}, undefined);

const tl = gsap.timeline();

tl.fromTo('.title, .subtitle, .plate, .symptom, .plate-4', {
    y: 300,
    opacity: 0
}, {
    y: 0,
    opacity: 1,
    stagger: .2,
}).fromTo('.kid', {
    x: 1000,
}, {
    x: 0,
}).fromTo('.corall', {
    scale: 0
}, {
    scale: 1
}).fromTo('.text', .2, {
    opacity: 0,
    scale: 1.2
}, {
    opacity: 1,
    scale: 1
})