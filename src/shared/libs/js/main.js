const slidesAmount = 14; // поменять
const presName = 'Aquamaris_1225'

const getSelector = (node, attr, initSelector) =>
    node.getAttribute(attr) ? '#' + node.getAttribute(attr) : initSelector

const setAppearAnimation = (
    openNodeList,
    closeNodeList,
    dataAttr,
    initSelector,
    duration = 0.3
) => {
    if (openNodeList.length) {
        openNodeList.forEach(nodeEl => {
            nodeEl.onclick = () => {
                closeNodeList.forEach(node => {
                    node.click();
                })
                setTimeout(() => {
                    gsap.to(
                        getSelector(nodeEl, dataAttr, initSelector),
                        duration,
                        {
                            display: 'flex',
                            autoAlpha: 1,
                        }
                    )
                }, 0)
                nodeEl.getAttribute('data-close-id') &&
                    gsap.to(
                        '#' + nodeEl.getAttribute('data-close-id'),
                        duration,
                        {
                            display: 'none',
                            autoAlpha: 0
                        }
                    )
            }
        })
    }
    if (closeNodeList.length) {
        closeNodeList.forEach(nodeEl => {
            nodeEl.onclick = () => {
                gsap.to(getSelector(nodeEl, dataAttr, initSelector), duration, {
                    display: 'none',
                    autoAlpha: 0,
                })
            }
        })
    }
}

const setChangeAnimation = (evt, objects) => {
    const sel = '#' + evt.target.dataset.open;

    const out = [...objects].filter(obj => '#' + obj.id !== sel);

    const viewTl = gsap.timeline();

    viewTl.to(out, {
        display: 'none',
        opacity: 0
    }).to(sel, {
        display: 'block',
        opacity: 1
    });
}

const animatePointer = (evt) => {
    const view = evt.target.dataset.open;
    const pointerTl = gsap.timeline();
    pointerTl.to('.pointer', {
        x: pointerParams[view].x,
        width: pointerParams[view].width
    });
}

const changeLink = (counter) => {
    const linkImg = document.querySelector('.links__image')
    linkImg.src = `./image/links-${counter}.png`
}

// View

const openViewBtns = document.querySelectorAll('.open-view');
const views = document.querySelectorAll('.view');

openViewBtns.forEach(btn => btn.addEventListener('click', (evt) => {
    setChangeAnimation(evt, views)
    animatePointer(evt);
    const counter = evt.target.dataset.open.slice(-1);
    changeLink(counter);
}))

// PopUp
const popupOpenBtns = document.querySelectorAll('.popup__open-btn')
const popupCloseBtns = document.querySelectorAll('.popup__close-btn')
setAppearAnimation(popupOpenBtns, popupCloseBtns, 'data-popup-id', '.popup')
const blackouts = document.querySelectorAll('.blackout');
const popupTl = gsap.timeline({ paused: true });
if (blackouts.length > 0) {
    popupTl.to('.blackout', {
        display: 'block',
        opacity: 1
    }).to('.side-menu__open-btn', {
        display: 'none',
        opacity: 0
    }, 0);

    blackouts.forEach(item => item.addEventListener('click', () => {
        popupTl.reverse();

        popupCloseBtns.forEach(btn => btn.click())
    }))
}

popupOpenBtns.forEach(btn => btn.addEventListener('click', () => {
    popupTl.play();
}))


// InnerView
const viewOpenBtns = document.querySelectorAll('.inner-view__open-btn')
const viewCloseBtns = document.querySelectorAll('.inner-view__close-btn')
setAppearAnimation(
    viewOpenBtns,
    viewCloseBtns,
    'data-view-id',
    '.inner-view',
    0.5
)

// Button 'ССЫЛКИ'
const linksOpenBtn = document.querySelector('.header__links')
const linksCloseBtn = document.querySelector('.links')
const linkTl = gsap.timeline({ paused: true })
let isLinkOpen = false;

if (linksCloseBtn) {
    linkTl.fromTo(
        '.links',
        0.3,
        {
            opacity: 0,
            display: 'none',
        },
        { opacity: 1, display: 'flex' }
    ).fromTo('.links__image', .3, {
        y: 1000
    }, {
        y: 0
    })

    linksOpenBtn.onclick = () => {

        if (isLinkOpen) {
            linksOpenBtn.classList.remove('active')
            linkTl.reverse();
        } else {
            linksOpenBtn.classList.add('active')
            linkTl.play();
        }

        isLinkOpen = !isLinkOpen;
    }
    linksCloseBtn.onclick = () => {

        linkTl.reverse();

        isLinkOpen = !isLinkOpen;
    }
}

// Open side-menu

const sideMenuOpenBtn = document.querySelector('.side-menu__open-btn');
const sideMenuCloseBtn = document.querySelector('.side-menu__close-btn');
const sideMenu = document.querySelector('.side-menu');
const sideMenuItems = document.querySelectorAll('.side-menu__item');
const sideMenuTl = gsap.timeline({ paused: true });

const sideMenuContent = {
    slides: 'slides',
    bookmarks: 'bookmarks',
    materials: 'materials',
    evaluation: 'evaluation',
}

const sideMenuTitles = {
    slides: 'Слайды',
    bookmarks: 'Добавленное в закладки',
    materials: 'Материалы',
    evaluation: 'Оценить презентацию',
};

const medications = [
    'Аква Марис беби',
    'Аква Марис лейка',
    'Аква Марис экстремальный'
]; 

const getMenuTitle = (part) => {
    const menuTitle = document.getElementById('menu_title');
    const newImg = document.createElement('img');
    const newSpan = document.createElement('span');

    if (part === sideMenuContent.bookmarks) {
        newImg.src = '../shared/images/icon-heart.svg'
    } else {
        newImg.src = '../shared/images/icon-paper.svg'
    }

    newSpan.textContent = sideMenuTitles[part];

    menuTitle.innerHTML = '';
    menuTitle.appendChild(newImg);
    menuTitle.appendChild(newSpan);
}

const getMenuContent = (part) => {
    getMenuTitle(part);
    const contentContainer = document.querySelector('.side-menu__content');

    switch (part) {
        case sideMenuContent.bookmarks:
            renderBookmarks();
            break;

        case sideMenuContent.slides:
            renderSlides();
            break;

        case sideMenuContent.materials:
            renderMaterials();
            break

        case sideMenuContent.evaluation:
            renderEvaluation();
            break;
    
        default:
            contentContainer.innerHTML = '';
            break;
    }
}

let contentHeight;
const content = document.getElementById("content");
const scrollContainer = document.querySelector('.side-menu__scroll-container');
const scroll = document.getElementById("scroll");

if (sideMenuOpenBtn) {
    sideMenuTl.fromTo(
        '.side-menu',
        0.3,
        {
            opacity: 0,
            display: 'none',
        },
        { opacity: 1, display: 'flex' }
    ).fromTo('.side-menu__container', .3, {
        x: 700
    }, {
        x: 0
    });

    sideMenuOpenBtn.onclick = () => {
        sideMenuTl.play();
    }
    sideMenuCloseBtn.onclick = () => {
        sideMenuTl.reverse();
    }

    sideMenuItems.forEach(btn => {
        btn.addEventListener('click', (evt) => {
            getMenuContent(evt.target.id)
            contentHeight = undefined;
            setTimeout(() => {
                contentHeight = content.offsetHeight;
                if (contentHeight) {
                    console.log(contentHeight);

                    if (contentHeight > 929) {
                        gsap.to('.side-menu__scroll-container, #scroll', {
                            display: 'block',
                            opacity: 1
                        });
                    } else {
                        gsap.to('.side-menu__scroll-container, #scroll', {
                            display: 'none',
                            opacity: 0
                        });
                    }
                }
            }, 500);
            
            
            
        });
    });
}

Draggable.create("#scroll", {
    type: "y",
    bounds: {
        minX: 0,
        maxX: 0,
        minY: 0,
        maxY: 802,
    },
    inertia: false,
    onDrag: function () {
        let maxOffset = (contentHeight - 929);
        let offset = (this.y / 802) * maxOffset; // считаем соотношение между скроллом и картинкой
        TweenLite.set(content, { y: -offset });
    },
});

// clean classes

function cleanSMContainerClasses() {
    const container = document.querySelector('.side-menu__content');
    Object.keys(sideMenuContent).forEach(([key, value]) => {
        container.classList.remove(`.side-menu__content--${value}`);
    });
}

// slides

function renderSlides() {
    const path = '../shared/images/thumbnails/';
    const container = document.querySelector('.side-menu__content');
    cleanSMContainerClasses();
    container.classList.add('side-menu__content--slides');
    container.innerHTML = '';
    for (let i = 0; i < slidesAmount; i++) {
        const newDiv = document.createElement('div');
        newDiv.className = 'slide__box'
        newDiv.innerHTML = `<img 
            class="slide__image" 
            src="${path}slide_${i}.png"
            onclick="() => {
                nav.goToSlideName("slide_${i}");
                sideMenuCloseBtn.click();
            }" />`;
        newDiv.addEventListener('click', () => {
            nav.goToSlideName(`slide_${i}`);
            sideMenuCloseBtn.click();
        })
        container.appendChild(newDiv);
    }
}

// header state btns

/**
 *
 * @param {string} stateHolderName
 */

const getStateOf = (stateHolderName) => {
    const dc = JSON.parse(localStorage.getItem('Datacontainer'));
    const currentSlide = document.querySelector('title').innerText;
    const slide = dc.slides.find(item => item.name == currentSlide);

    const state = slide[stateHolderName].value;

    return state;
}

/**
 *
 * @param {string} stateHolderName
 * @param {object} state
 */

const setStateOf = (stateHolderName, state) => {
    const dc = JSON.parse(localStorage.getItem('Datacontainer'));
    const currentSlide = document.querySelector('title').innerText;
    const slide = dc.slides.find(item => item.name == currentSlide);
    slide[stateHolderName].value = state;

    localStorage.setItem('Datacontainer', JSON.stringify(dc));
}

/**
 *
 * @param {HTMLElement} btn
 */

const checkStateOf = (stateHolderName, btn) => {
    const dc = JSON.parse(localStorage.getItem('Datacontainer'));    
    const currentSlide = document.querySelector('title').innerText;
    const slide = dc.slides.find(item => item.name == currentSlide);

    if (!slide[stateHolderName].value) {
        btn.classList.remove('active');
        return false;
    }
    btn.classList.add('active');
    return true;
}

const stateBtnHandler = (stateHolderName, btn) => {    
    const dc = JSON.parse(localStorage.getItem('Datacontainer'));
    const currentSlide = document.querySelector('title').innerText;
    const slide = dc.slides.find(item => item.name == currentSlide);

    slide[stateHolderName].value = !slide[stateHolderName].value;

    setStateOf(stateHolderName, slide[stateHolderName].value);
    flags[stateHolderName] = checkStateOf(stateHolderName, btn);
}

// materials

function renderMaterials() {
    const path = '../shared/pdf/';
    const container = document.querySelector('.side-menu__content');
    cleanSMContainerClasses();
    container.classList.add('side-menu__content--materials');
    const materialsContent = medications.map(med => (`<div class="materials__item">
        <a href="${path}${med}.pdf">${med}</a>
        <span>Инструкция<br>по применению</span>
        <div class="materials__mail-btn"></div>
    </div>`));
    container.innerHTML = materialsContent;
}

// evaluation

function renderEvaluation() {
    const container = document.querySelector('.side-menu__content');
    cleanSMContainerClasses();
    container.classList.add('side-menu__content--evaluation');
    container.innerHTML = `<div class="evaluation__box">
        <textarea class="evaluation__textarea" rows="10" placeholder="Напишите ваш комментарий"></textarea>
        <button class="evaluation__button">Отправить</button>
    </div>`;
}

//nav

let nav;

function addNewPoint(slide) {
    console.log(`added new point: ${slide}`);
    if (localStorage.getItem('path') !== '' &&
        localStorage.getItem('path') !== null &&
        localStorage.getItem('path') !== undefined) {
        const path = localStorage.getItem('path').includes(',') ?
            localStorage.getItem('path').split(',') : Array(localStorage.getItem('path'));
        path.push(slide);
        localStorage.setItem('path', path);
    } else {
        localStorage.setItem('path', slide);
    }
}

/**
 *
 * @param {string} slideName -  Vault_External_Id_vod__c field || Media_File_Name_vod__c
 * @param {string} presentation - Presentation_Id_vod__c || ''. дефолитм на пустую строку, так навигируем внутри текущей презентации
 */

function getLastPoint() {
    const path = localStorage.getItem('path').split(',');
    const lastPoint = String(path.splice(-1));
    localStorage.setItem('path', path);
    console.log(`return to ${lastPoint}`);
    return lastPoint;
}

const viewerScripts = {
    goToSlideName: (slideName) => {
        const currentSlide = document.querySelector('title').innerText;
        const currentTime = Date.now();
        const slideEndTime = {
            slide: currentSlide,
            endTime: currentTime
        }
        updateDC(undefined, slideEndTime);
        window.location.href = `../${slideName}/index.html`;
    },
    goToSlideNameAndRemember: (slideName) => {
        addNewPoint(document.title);
        console.log(`go to ${slideName}`);
        viewerScripts.goToSlideName(slideName, dir);
    }
}

window.onload = () => {
    nav = viewerScripts;
}

const homeIcon = document.querySelector('.header__home')
HOME_SLIDE = 'slide_0' // Поменять

if (document.title === HOME_SLIDE) {
    localStorage.removeItem('path');
}

if (homeIcon) {
    homeIcon.addEventListener('click', () => nav.goToSlideName(HOME_SLIDE))
}

const backBtn = document.querySelector('.header__back');
if (backBtn) {
    backBtn.addEventListener('click', () => {
        nav.goToSlideName(getLastPoint())
    });
}

// progress-bar
const progressBar = document.getElementById('progress-bar');

function getProgressBar () {
    const currentSlide = document.querySelector('title').innerText.split('_').pop();

    for (let i = 0; i < slidesAmount; i++) {
        const newDiv = document.createElement('div');
        newDiv.classList.add('progress__block');
        
        const divWidth = (progressBar.offsetWidth / slidesAmount) - 2;
        newDiv.style.width = `${divWidth}px`;

        if (currentSlide >= i) {
            newDiv.classList.add('progress__block--dark');
        } else {
            newDiv.classList.add('progress__block--light');
        }

        progressBar.appendChild(newDiv);
    }
}

getProgressBar();

// datacontainer

const getDCStory = () => {
    const story = [];
    for (let i = 0; i < slidesAmount; i++) {
        const name = `slide_${i}`;
        story.push(name);
    }
    return story;
}

const generateTimeBasedUUID = () => {
    // Get current timestamp in milliseconds
    const timestamp = Date.now();

    // Convert timestamp to hex and pad to ensure length
    const timeHex = timestamp.toString(16).padStart(12, '0');

    // Generate random hex values for the remaining parts
    const randomPart1 = Math.floor(Math.random() * 0xffffffff).toString(16).padStart(8, '0');
    const randomPart2 = Math.floor(Math.random() * 0xffffffff).toString(16).padStart(8, '0');
    const randomPart3 = Math.floor(Math.random() * 0xffffffff).toString(16).padStart(8, '0');

    // Construct the UUID in the format: 8-4-4-4-12
    return `${timeHex.slice(0, 8)}-${timeHex.slice(8, 12)}-4${randomPart1.slice(1, 4)}-${(Math.floor(Math.random() * 4) + 8).toString(16)}${randomPart1.slice(4, 7)}-${randomPart2}${randomPart3.slice(0, 4)}`;
}

const getDCNewSlide = (slide) => {
    return {
        name: slide,
        title: slide,
        SlideTiming: {
            startDate: {
                title: "Начало",
                value: undefined,
                valueType: 7
            },
            dueDate: {
                title: "Завершение",
                value: undefined,
                valueType: 7
            },
            duration: {
                title: "Продолжительность, мин",
                value: undefined,
                valueType: 1
            }
        },
        like: {
            title: 'like',
            value: 0,
            valueType: 5
        },
        dislike: {
            title: 'dislike',
            value: 0,
            valueType: 5
        },
        bookmark: {
            title: 'bookmark',
            value: 0,
            valueType: 5
        },
        visited: {
            title: 'visited',
            value: 0,
            valueType: 5
        }
    }
}

const getDCSlides = () => {
    const slides = [];
    for (let i = 0; i < slidesAmount; i++) {
        slides.push(getDCNewSlide(`slide_${i}`))
    }
    return slides;
}

const setDCSlideStartDate = (slide, startTime) => {
    return {
        ...slide,
        SlideTiming: {
            ...slide.SlideTiming,
            startDate: {
                ...slide.SlideTiming.dueDate,
                value: startTime
            }
        }
    }
}

const setDCSlideEndDate = (slide, endTime) => {
    const startTime = slide.SlideTiming.startDate.value;
    const calcDuration = ((endTime - startTime) / (1000 * 60)).toFixed(1);
    return {
        ...slide,
        SlideTiming: {
            ...slide.SlideTiming,
            dueDate: {
                ...slide.SlideTiming.dueDate,
                value: endTime
            },
            duration: {
                ...slide.SlideTiming.duration,
                value: calcDuration
            }
        }
    }
}

const setDCPresTiming = (dc, endTime) => {
    const startTime = dc.PresentationTiming.startDate.value;
    const calcDuration = ((endTime - startTime) / (1000 * 60)).toFixed(1);
    return {
        ...dc,
        PresentationTiming: {
            ...dc.PresentationTiming,
            dueDate: {
                ...dc.PresentationTiming.dueDate,
                value: endTime,
            },
            duration: {
                ...dc.PresentationTiming.duration,
                value: calcDuration,
            }
        }
    }
}

const getNewDC = () => {
    return {
        story: getDCStory(),
        title: presName,
        dataContainer: generateTimeBasedUUID(),
        PresentationTiming: {
            startDate: {
                title: "Начало",
                value: Date.now(),
                valueType: 7
            },
            dueDate: {
                title: "Завершение",
                value: undefined,
                valueType: 7
            },
            duration: {
                title: "Продолжительность, мин",
                value: undefined,
                valueType: 1
            }
        },
        slides: getDCSlides(),
    }
}

let dc = JSON.parse(localStorage.getItem('Datacontainer'));
console.log(dc);

if (dc == undefined) {
    console.log('new dc');
    
    dc = getNewDC();
    console.log(dc);
}

function endCount () {
    const dc = JSON.parse(localStorage.getItem('Datacontainer'));
    const currentSlide = document.querySelector('title').innerText;
    const slide = dc.slides.find(item => item.name == currentSlide);
    if (!slide.SlideTiming.dueDate.value) {
        updateDC(undefined, {
            slide: currentSlide,
            endTime: Date.now()
        });
    }
}

function updateDC(slideStartTime, slideEndTime) {
    if (slideStartTime) {
        const slide = dc.slides.find(slide => slide.name === slideStartTime.slide);
        if (!slide.SlideTiming.startDate.value)
            setDCSlideStartDate(slide, slideStartTime.startTime);
    }

    if (slideEndTime) {
        const slide = dc.slides.find(item => item.name == slideEndTime.slide);
        setDCSlideEndDate(slide, slideEndTime.endTime);
    }

    const currentTime = Date.now();
    dc = setDCPresTiming(dc, currentTime);    
    localStorage.setItem('Datacontainer', JSON.stringify(dc));
}

const isDatacontainer = localStorage.getItem('Datacontainer') == undefined;

if (!isDatacontainer) {
    const dc = getNewDC();
    localStorage.setItem('Datacontainer', JSON.stringify(dc));
}

// likes + dislikes + bookmarks

const likeBtn = document.querySelector('.header__like');
const dislikeBtn = document.querySelector('.header__dislike');
const addBookmarkBtn = document.querySelector('.header__bookmarks');

const flags = {
    likes: checkStateOf('like', likeBtn),
    dislikes: checkStateOf('dislike', dislikeBtn),
    bookmarks: checkStateOf('bookmark', addBookmarkBtn)
}

if (likeBtn) {
    likeBtn.addEventListener('click', () => {
        stateBtnHandler('like', likeBtn)
    });
}

if (dislikeBtn) {
    dislikeBtn.addEventListener('click', () => {
        stateBtnHandler('dislike', dislikeBtn)
    });
}

if (addBookmarkBtn) {
    addBookmarkBtn.addEventListener('click', () => {
        stateBtnHandler('bookmark', addBookmarkBtn)
    });
}



// bookmarks

function handleBookmarksNav(bookmark) {
    nav.goToSlideName(bookmark);
    sideMenuCloseBtn.click();
}

function setBookmarksRemover() {
    const bookmarksRemoveBtns = document.querySelectorAll('.bookmark__btn--close');
    const bookmarkBoxes = document.querySelectorAll('.bookmark__box');
    bookmarksRemoveBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const sl = btn.dataset.name;
            const slBox = Array.from(bookmarkBoxes).filter(box => box.dataset.slide == sl)
            bookmarks = bookmarks.filter(item => item != sl);
            setBookmarks();
            checkBookmarks();
            slBox[0].remove();
        });
    });
}

function renderBookmarks() {
    const path = '../shared/images/thumbnails/';
    const container = document.querySelector('.side-menu__content');
    cleanSMContainerClasses();
    container.classList.add('side-menu__content--bookmarks');

    const dc = JSON.parse(localStorage.getItem('Datacontainer'));
    const bookmarks = [];
    dc.slides.forEach(slide => {
        if (slide.like.value) {
            bookmarks.push(slide.name);
        }
    })
    console.log(bookmarks);
    

    const bookmarksContent = bookmarks.map(bookmark => (`<div class="bookmark__box" data-slide="${bookmark}">
        <img
            class="bookmark__image"
            src="${path}${bookmark}.png"
            onclick="handleBookmarksNav('${bookmark}')" />
            <div class="bookmark__buttons">
                <div class="bookmark__btn bookmark__btn--mail"></div>
                <div 
                    class="bookmark__btn bookmark__btn--close" 
                    data-name="${bookmark}"></div>
            </div>
    </div>`)).join('');
    container.innerHTML = bookmarksContent;
    setBookmarksRemover();
}