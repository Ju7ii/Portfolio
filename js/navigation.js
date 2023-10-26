//* GLOBAL VARIABLES *//

const navigationBar = document.querySelector("navigation");
const navigationButton = document.querySelector(".menu-toggle-button");
const menu = document.getElementById("menu");
const menuItem = document.querySelectorAll(".menu-item");
const html = document.documentElement;



// = EVENT LISTENERS = //

//  PAGE IS SCROLLED CHECK  //

window.onscroll = () => {
    if (window.scrollY > 100) {
        addActiveNavbar();
    }
    else {
        removeActiveNavbar();
    }
};

//  END PAGE IS SCROLLED CHECK  //



//  HAMBURGER BUTTON CLICK CHECK  //

navigationButton.addEventListener("click", () => {
    const menuIsOpen = navigationButton.getAttribute("aria-expanded");
    if (menuIsOpen = "false") {
        openMenu();
    } else {
        closeMenu();
    }
});

//  END HAMBURGER BUTTON CLICK CHECK  //



//  MENU LINK CLICK CHECK  //

menuItem.forEach(menuItem => {
    menuItem.addEventListener("click", () => {
        setTimeout(closeMenu, 200);
    })
});



//$ FUNCTIONS $//

function openMenu() {
    html.style.overflowY = "hidden"; //* disable scrollbar
    navigationButton.setAttribute("aria-expanded", "true"); //* set aria state -> true
    menu.setAttribute("aria-expanded", "true"); //* set aria state -> true
    addActiveNavbar();
}

function closeMenu() {
    html.style.overflowY = ""; //* enable scrollbar
    navigationButton.setAttribute("aria-expanded", "false"); //* set aria state -> false
    menu.setAttribute("aria-expanded", "false"); //* set aria state -> false
    window.scrollY > 100 ? null : removeActiveNavbar(); //* only remove the navbar when on top of site
}

function addActiveNavbar() {
    navigationBar.classList.add("active-navbar");
}

function removeActiveNavbar() {
    navigationBar.classList.remove("active-navbar");
}

//$ END FUNCTIONS $//

//$ EVENTLISTENERS $//


//$ EVENTLISTENERS $//