const previousSlide = 'slide_9'
const nextSlide = 'slide_11'

const thisSlide = document.title;
updateDC({
    slide: thisSlide,
    startTime: Date.now()
}, undefined);

const tl = gsap.timeline();

function fish() {
    const tlFish = gsap.timeline();
    const tlStar = gsap.timeline();
    tlFish.fromTo('.fish', 4, {
        rotate: '10deg',
        repeat: -1,
        yoyo: true,
        ease: "none"
    }, {
        rotate: '-10deg',
        repeat: -1,
        yoyo: true,
        ease: "none",
    })
    tlStar.fromTo('.star', 3, {
        rotate: '10deg',
        repeat: -1,
        yoyo: true,
        ease: "none"
    }, {
        rotate: '-10deg',
        repeat: -1,
        yoyo: true,
        ease: "none",
    })
}

tl.fromTo('.title', {
    y: 300,
    opacity: 0
}, {
    y: 0,
    opacity: 1,
    stagger: .4,
}).fromTo('.image', {
    y: 800,
    opacity: 0
}, {
    y: 0,
    opacity: 1,
    stagger: .1
}).fromTo('.plate', {
    scale: 0
}, {
    scale: 1,
    stagger: .2
}).fromTo('.star', 1, {
    scale: 0,
}, {
    ease: 'bounce.out', 
    rotate: '10deg',
    scale: 1,
}).fromTo('.fish', 1, {
    x: 300,
}, {
    x: 0,
    rotate: '10deg',
}, "-=1").call(fish);