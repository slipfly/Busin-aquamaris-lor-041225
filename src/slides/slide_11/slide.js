const previousSlide = 'slide_10'
const nextSlide = 'slide_12'

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
    stagger: .4,
}).fromTo('.star, .product', {
    y: 800,
    opacity: 0
}, {
    y: 0,
    opacity: 1,
    stagger: .2
}).fromTo('.age, .spot', {
    scale: 0
}, {
    scale: 1,
}).fromTo('.side-text', {
    opacity: 0,
    scale: 1.5
}, {
    opacity: 1,
    scale: 1
}).fromTo('.shell', .5, {
    y: -500,
    opacity: 0
}, {
    y: 0,
    opacity: 1,
    ease: 'bounce.out',
}).fromTo('.remark', {
    opacity: 0,
    scale: 1.5
}, {
    opacity: 1,
    scale: 1
});