const previousSlide = 'slide_12'

const thisSlide = document.title;
updateDC({
    slide: thisSlide,
    startTime: Date.now()
}, undefined);

const tl = gsap.timeline();

function fish() {
    const tlFish = gsap.timeline();
    tlFish.fromTo('.ray', 4, {
        rotate: '10deg',
        repeat: -1,
        yoyo: true,
        ease: "none"
    }, {
        rotate: '0deg',
        repeat: -1,
        yoyo: true,
        ease: "none",
    })
    endCount()
}

tl.fromTo('.title', {
    y: 300,
    opacity: 0
}, {
    y: 0,
    opacity: 1,
    stagger: .4,
}).fromTo('video, .video__play', {
    y: 800,
    opacity: 0
}, {
    y: 0,
    opacity: 1,
}).fromTo('.ray', 1.5, {
    x: 1200,
    y: 500
}, {
    x: 0,
    y: 0,
    rotate: '10deg'
}, 0).call(fish);

const videoPlayBtns = document.querySelectorAll('.video__play');
const videos = document.querySelectorAll('video');

videoPlayBtns.forEach(btn => {
    btn.addEventListener('click', (evt) => {
        const videoId = evt.target.dataset.play;
        const videoToPlay = Array.from(videos).find(vid => vid.id == videoId);
        gsap.to(`[data-play="${videoId}"]`, {
            display: 'none',
            opacity: 0
        });
        videoToPlay.play();
    });
})