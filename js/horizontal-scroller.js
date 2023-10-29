//$ VARIABLES $//

const scrollers = document.querySelectorAll('.scroller');
const scrollList = document.querySelector('.tag-list');

//$ END VARIABLES $//
//!-----------------------------------------------------------------------------------------------------------------------------------------------!//
//$ FUNCTIONS $//

checkReducedMotions();

//* CHECK IF USER HAS NOT REDUCED MOTION -> ADD ANIMATION
function checkReducedMotions() {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        addAnimation();
    }
}

//* FUNCTION TO ADD THE ANIMATION TO PAGE
function addAnimation() {
    scrollers.forEach((scroller) => {

        scroller.setAttribute('data-animated', true);

        const scrollerInner = scroller.querySelector('.scroller-inner');
        const scrollerContent = Array.from(scrollerInner.children);

        shuffleScrollerItems(scrollerContent);

        scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute('aria-hidden', true);
            scrollerInner.appendChild(duplicatedItem);
        });
    });
}

//* SHUFFEL ELEMENTS IN RANDOM ORDER
function shuffleScrollerItems(items) {

    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
    }
    for (const element of items) {
        scrollList.appendChild(element);
    }

}

//$ END FUNCTIONS $//
//!-----------------------------------------------------------------------------------------------------------------------------------------------!//
