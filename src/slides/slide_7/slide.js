const previousSlide = 'slide_6'
const nextSlide = 'slide_8'

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
}).fromTo('.star, .bottle', {
    y: 1200,
    opacity: 0
}, {
    y: 0,
    opacity: 1, 
    stagger: .2,
}).fromTo('.age', {
    scale: 0
}, {
    scale: 1,
    ease: 'bounce.out',
});