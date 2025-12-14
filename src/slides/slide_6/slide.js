const previousSlide = 'slide_5'
const nextSlide = 'slide_7'

const thisSlide = document.title;
updateDC({
    slide: thisSlide,
    startTime: Date.now()
}, undefined);

const tl = gsap.timeline();

function seahorse() {
    const tlSeahorse = gsap.timeline();
    tlSeahorse.to('.seahorse', {
        x: 200
    }).fromTo('.seahorse', 4, {
        rotate: '10deg',
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

tl.fromTo('.title, .subtitle', {
    y: 300,
    opacity: 0
}, {
    y: 0,
    opacity: 1,
    stagger: .4,
}).fromTo('.circle', 1, {
    scale: 0
}, {
    scale: 1,
    ease: 'bounce.out',
    stagger: .2
}).fromTo('.advantages', {
    opacity: 0
}, {
    opacity: 1
}).call(seahorse).fromTo('.bottle-2, .bottle-1', {
    x: 750,
}, {
    x: 0,
    stagger: .4,
}, '-=1').fromTo('.age', {
    scale: 0
}, {
    scale: 1,
    ease: 'bounce.out',
}).fromTo('.octo', {
    display: 'none',
    x: 350
}, {
    display: 'block',
    x: 0
});

const advantagesBtn = document.querySelector('.advantages-box');
let isPopOpened = false;
const pops = document.querySelectorAll('.popup');
const popOpens = Array.from(popupOpenBtns);
let timer = 0;

const autoShowPops = async () => {
    if (isPopOpened) return;
    for (const pop of pops) {
        const popId = pop.id;

        const openBtn = popOpens.find(btn => btn.dataset.popupId === popId);
        const closeBtn = pop.querySelector('.popup__close-btn');

        if (!openBtn || !closeBtn) continue;

        openBtn.click();
        await wait(500); // wait for it to "stay open"

        closeBtn.click();
        await wait(300); // small pause before next
    }
};

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

popupOpenBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (isPopOpened) return;
        isPopOpened = true;
    })
});

advantagesBtn.addEventListener('click', () => {
    const tlAdv = gsap.timeline();

    tlAdv.to('.seahorse', .1, {
        x: 0
    }).to('.advantages', .1, {
        opacity: 0
    }).to('.circle', .2, {
        scale: 0
    }).to('.corall', {
        scale: 1,
    }).to('.popup__open-btn', {
        scale: 1,
        stagger: .1
    });

    setTimeout(() => {
        autoShowPops();
    }, '3000')
});