document.addEventListener('DOMContentLoaded', function () {
    const main = document.getElementsByTagName('main')[0]
    
    const swipeSlide = document.querySelector('.swipe')
    const swipeLeft = document.querySelector('.swipeLeft')
    const swipeRight = document.querySelector('.swipeRight')

    if (swipeSlide) {
        let swipe = new Hammer.Manager(swipeSlide)
        swipe.add(new Hammer.Swipe({direction: Hammer.DIRECTION_HORIZONTAL}))
        endCount();
        if (swipeLeft) {
            swipe.on('swipeleft', () => {                
                nav.goToSlideName(nextSlide)
            })
        }
        if (swipeRight) {
            swipe.on('swiperight', () => {
                nav.goToSlideName(previousSlide)
            })
        }
    }
})
