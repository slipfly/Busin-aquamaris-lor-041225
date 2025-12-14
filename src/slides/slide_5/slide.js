const previousSlide = 'slide_4'
const nextSlide = 'slide_6'

const thisSlide = document.title;
updateDC({
    slide: thisSlide,
    startTime: Date.now()
}, undefined);

const tl = gsap.timeline();

function star () {
    gsap.fromTo('.star', {
        rotate: '20deg',
        repeat: -1,
        yoyo: true,
        ease: "none"
    }, {
        rotate: '-10deg',
        repeat: -1,
        yoyo: true,
        ease: "none"
    })
}

tl.fromTo('.title, .text-1, .image, .text-2', {
    y: 300,
    opacity: 0
}, {
    y: 0,
    opacity: 1,
    stagger: .2,
}).fromTo('.star', {
    scale: 2,
    opacity: 0
}, {
    scale: 1,
    opacity: 1,
    rotate: '20deg',
    ease: 'bounce.out',
}).call(star);