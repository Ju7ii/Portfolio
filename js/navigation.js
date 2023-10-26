//$ VARIABLES $//

const navigationBar = document.querySelector(".navigation");
const navigationButton = document.querySelector(".menu-toggle-button");
const menu = document.getElementById("menu");
const menuItem = document.querySelectorAll(".menu-item");
const html = document.documentElement;

//$ END VARIABLES $//
//!-----------------------------------------------------------------------------------------------------------------------------------------------!//
//$ FUNCTIONS $//

//* OPEN MENU *//
function openMenu() {
    html.style.overflowY = "hidden"; //* disable scrollbar
    navigationButton.setAttribute("aria-expanded", "true"); //* set aria state -> true
    menu.setAttribute("aria-expanded", "true"); //* set aria state -> true
    checkIfScrolled();
}

//* CLOSE MENU *//
function closeMenu() {
    html.style.overflowY = ""; //* enable scrollbar
    navigationButton.setAttribute("aria-expanded", "false"); //* set aria state -> false
    menu.setAttribute("aria-expanded", "false"); //* set aria state -> false
    checkIfScrolled();
}

//* ADD ACTIVE NAVBAR CLASS *//
function addActiveNavbar() {
    if (!navigationBar.classList.contains('active-navbar')) {
        navigationBar.classList.add('active-navbar');
    }
}

//* REMOVE ACTIVE NAVBAR CLASS *// 
function removeActiveNavbar() {
    if (navigationBar.classList.contains('active-navbar')) {
        navigationBar.classList.remove('active-navbar');
    }
}

//* CHECK IF NAVIGATION IS ALREADY OPEN 
function isNavigationOpen() {
    const menuIsOpen = navigationButton.getAttribute("aria-expanded");
    menuIsOpen == "false" ? openMenu() : closeMenu();
}

//* HANDLE SCROLL EVENT
function checkIfScrolled() {
    window.scrollY > 100 ? addActiveNavbar() : removeActiveNavbar();
}

//$ END FUNCTIONS $//
//!-----------------------------------------------------------------------------------------------------------------------------------------------!//
//$ EVENTLISTENERS $//

//* LISTEN FOR NAVIGATION CLICK 
navigationButton.addEventListener("click", isNavigationOpen);

//* LISTEN FOR SCROLL
window.addEventListener('scroll', checkIfScrolled);

//* CLOSE MENU *// 
menuItem.forEach(menuItem => {
    menuItem.addEventListener("click", () => {
        setTimeout(closeMenu, 200);
    })
});

//$ END EVENTLISTENERS $//