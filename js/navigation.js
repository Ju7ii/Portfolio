//* GLOBAL VARIABLES *//

const navigationBar = document.querySelector("navigation");
const navigationButton = document.querySelector(".menu-toggle-button");
const menu = document.getElementById("menu");
const menuItem = document.querySelectorAll(".menu-item");
const html = document.documentElement;



// = EVENT LISTENERS = //

//  PAGE IS SCROLLED CHECK  //

window.onscroll = () => {
    //window.scrollY > 100 ? addActiveNavbar() : removeActiveNavbar();
    if (window.scrollY > 100) {
        addActiveNavbar();
    }
    else {
        removeActiveNavbar();
    }
};


//$ FUNCTIONS $//

//* OPEN MENU *//
function openMenu() {
    html.style.overflowY = "hidden"; //* disable scrollbar
    navigationButton.setAttribute("aria-expanded", "true"); //* set aria state -> true
    menu.setAttribute("aria-expanded", "true"); //* set aria state -> true
    addActiveNavbar();
}

//* CLOSE MENU *//
function closeMenu() {
    html.style.overflowY = ""; //* enable scrollbar
    navigationButton.setAttribute("aria-expanded", "false"); //* set aria state -> false
    menu.setAttribute("aria-expanded", "false"); //* set aria state -> false
    window.scrollY > 100 ? null : removeActiveNavbar(); //* only remove the navbar when on top of site
}

//* ADD ACTIVE NAVBAR CLASS *//
function addActiveNavbar() {
    navigationBar.classList.add("active-navbar");
}

//* REMOVE ACTIVE NAVBAR CLASS *//
function removeActiveNavbar() {
    navigationBar.classList.remove("active-navbar");
}

//* CHECK IF NAVIGATION IS ALREADY OPEN
function isNavigationOpen() {
    const menuIsOpen = navigationButton.getAttribute("aria-expanded");
    menuIsOpen == "false" ? openMenu() : closeMenu();
}

//$ END FUNCTIONS $//
//!-----------------------------------------------------------------------------------------------------------------------------------------------!//
//$ EVENTLISTENERS $//

//* CHECK IF NAVIGATION IS OPEN -> THEN OPEN OR CLOSE IT
navigationButton.addEventListener("click", isNavigationOpen);

//* CLOSE MENU *//
menuItem.forEach(menuItem => {
    menuItem.addEventListener("click", () => {
        setTimeout(closeMenu, 200);
    })
});

//$ EVENTLISTENERS $//