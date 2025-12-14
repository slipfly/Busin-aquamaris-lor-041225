const nextSlide = 'slide_1'
const thisSlide = document.title;
updateDC({
    slide: thisSlide,
    startTime: Date.now()
}, undefined);

const tl = gsap.timeline();

function star() {
    const tlStar = gsap.timeline();
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
}).fromTo('.bottle-1, .bottle-2, .bottle-3, .shell', {
    x: 1200,
}, {
    x: 0,
    stagger: .4,
    duration: .5,
}).fromTo('.octo', {
    x: 500,
    display: 'none'
}, {
    x: 0,
    display: 'block'
}).fromTo('.star', {
    x: -500,
    y: 300
}, {
    rotate: '10deg', 
    x: 0,
    y: 0
}).call(star);