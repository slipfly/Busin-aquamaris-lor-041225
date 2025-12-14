const previousSlide = 'slide_1'
const nextSlide = 'slide_3'

const thisSlide = document.title;
updateDC({
    slide: thisSlide,
    startTime: Date.now()
}, undefined);

const tl = gsap.timeline();

tl.fromTo('.title, .subtitle, .star', {
    y: 300,
    opacity: 0
}, {
    y: 0,
    opacity: 1,
    stagger: .2,
}).fromTo('.head', {
    x: 1050
}, {
    x: 0
})