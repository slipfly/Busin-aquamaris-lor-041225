const previousSlide = 'slide_8'
const nextSlide = 'slide_10'

const thisSlide = document.title;
updateDC({
    slide: thisSlide,
    startTime: Date.now()
}, undefined);

const tl = gsap.timeline();

function shell() {
    const tlShell = gsap.timeline();
    const tlStar = gsap.timeline();
    tlShell.fromTo('.shell', 4, {
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

tl.fromTo('.title, .subtitle', {
    y: 300,
    opacity: 0
}, {
    y: 0,
    opacity: 1,
    stagger: .4,
}).fromTo('.plate', {
    y: 800,
    opacity: 0
}, {
    y: 0,
    opacity: 1,
    stagger: .1
}).fromTo('.column', {
    scaleY: 0
}, {
    scaleY: 1,
    stagger: .2
}).fromTo('.number', {
    scale: 2,
    opacity: 0
}, {
    scale: 1,
    opacity: 1,
    ease: 'bounce.out',
}).fromTo('.star', 1, {
    x: -2000,
    scale: 0,
    opacity: 0
}, {
    x: 0,
    scale: 1,
    opacity: 1,
}).fromTo('.shell', 1, {
    x: 2000,
    scale: 0,
    opacity: 0
}, {
    x: 0,
    scale: 1,
    opacity: 1,
}, "-=1").call(shell);