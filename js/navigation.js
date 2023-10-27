//$ VARIABLES $//

const navOptionsBar = document.querySelector('.nav-options');
const navigationButton = document.querySelector('.menu-toggle-button');
const navElement = document.querySelector('.navigation');
const menu = document.getElementById('menu');
const menuItem = document.querySelectorAll('.menu-item');
const html = document.documentElement;

//$ END VARIABLES $//
//!-----------------------------------------------------------------------------------------------------------------------------------------------!//
//$ FUNCTIONS $//

//* CHECK IF MEDIAQUERY AND SETS ATTRIBUTES IF TRUE
function setAttributes() {
    const mediaQueryNavigation = window.matchMedia('screen and (max-width: 55em)');
    if (mediaQueryNavigation.matches) {
        toggleMenu('', 'false');
        navElement.style.zIndex = 'var(--z-menu)';
    } else {
        removeAttributes();
        navElement.style.zIndex = '';
    }
}

//* REMOVES ARIA ATTRIBUTES 
function removeAttributes() {
    navigationButton.removeAttribute('aria-expanded');
    menu.removeAttribute('aria-expanded');   
}


//* OPEN OR CLOSE MENU *//
function toggleMenu(overflow, expanded, activeNav) {
    html.style.overflowY = overflow;
    navigationButton.setAttribute('aria-expanded', expanded);
    menu.setAttribute('aria-expanded', expanded);

    checkIfScrolled();
    if (activeNav) {
        showNavbar();
    }
}

function toggleAnimationMenu() {
    menu.classList.toggle('menu-animation-fade-in');
    menu.classList.toggle('menu-animation-fade-out');
}

//* DISPLAY NAVBAR *//
function showNavbar() {
    navOptionsBar.classList.add('active-navbar');
}

//* HIDE NAVBAR *//
function hideNavbar() {
    navOptionsBar.classList.remove('active-navbar');
}

//* CHECK IF NAVIGATION IS ALREADY OPEN 
function isNavigationOpen() {
    const menuIsOpen = navigationButton.getAttribute('aria-expanded');
    menuIsOpen == 'false' ? toggleMenu('hidden', 'true', true) : toggleMenu('', 'false', false);
}

//* HANDLE SCROLL EVENT
function checkIfScrolled() {
    window.scrollY > 100 ? showNavbar() : hideNavbar();
}

//$ END FUNCTIONS $//
//!-----------------------------------------------------------------------------------------------------------------------------------------------!//
//$ EVENTLISTENERS $//

//* LISTEN FOR RESIZE OR RELOAD
window.addEventListener('load', setAttributes);
window.addEventListener('resize', setAttributes);

//* LISTEN FOR NAVIGATION CLICK 
navigationButton.addEventListener('click', isNavigationOpen);
navigationButton.addEventListener('click', toggleAnimationMenu);

//* LISTEN FOR SCROLL
window.addEventListener('scroll', checkIfScrolled);

//* LISTEN FOR CLICK ON MENU POINT *// 
menuItem.forEach(menuItem => {
    menuItem.addEventListener('click', () => {
        setTimeout(() => {
            toggleMenu('', 'false'); //Closing menu
        }, 200);
    })
});

//$ END EVENTLISTENERS $//