//$ VARIABLES $//

const navigationBar = document.querySelector('.navigation');
const navigationButton = document.querySelector('.menu-toggle-button');
const menu = document.getElementById('menu');
const menuItem = document.querySelectorAll('.menu-item');
const html = document.documentElement;

//$ END VARIABLES $//
//!-----------------------------------------------------------------------------------------------------------------------------------------------!//
//$ FUNCTIONS $//

//* OPEN OR CLOSE MENU *//
function toggleMenu(overflow, expanded) {
    html.style.overflowY = overflow;
    navigationButton.setAttribute('aria-expanded', expanded);
    menu.setAttribute('aria-expanded', expanded);
    checkIfScrolled();
}

//* HIDE OR SHOW NAVBAR
function toggleNavbarStatus() {
    navigationBar.classList.toggle('active-navbar');
}

//* CHECK IF NAVIGATION IS ALREADY OPEN 
function isNavigationOpen() {
    const menuIsOpen = navigationButton.getAttribute('aria-expanded');
    menuIsOpen == 'false' ? toggleMenu('hidden', 'true') : toggleMenu('', 'false');
}

//* HANDLE SCROLL EVENT
function checkIfScrolled() {
    window.scrollY > 100 ? toggleNavbarStatus() : toggleNavbarStatus();
}

//$ END FUNCTIONS $//
//!-----------------------------------------------------------------------------------------------------------------------------------------------!//
//$ EVENTLISTENERS $//

//* LISTEN FOR NAVIGATION CLICK 
navigationButton.addEventListener('click', isNavigationOpen);

//* LISTEN FOR SCROLL
window.addEventListener('scroll', checkIfScrolled);

//* LISTEN FOR CLICK ON MENU POINT *// 
menuItem.forEach(menuItem => {
    menuItem.addEventListener('click', () => {
        setTimeout(closeMenu, 200);
    })
});

//$ END EVENTLISTENERS $//