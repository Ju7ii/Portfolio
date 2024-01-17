//$ VARIABLES $//

const navOptionsBar = document.querySelector(".nav-options");
const navigationButton = document.querySelector(".menu-toggle-button");
const navElement = document.querySelector(".navigation");
const menu = document.getElementById("menu");
const menuItem = document.querySelectorAll(".menu-item");
const progressBar = document.getElementById("progress-bar");
const preventAnchorLinks = document.querySelectorAll(".prevent-anchor");
const html = document.documentElement;
let previouslyOpenMenu = true;
let menuToggleCounter = 0;

//$ END VARIABLES $//
//!-----------------------------------------------------------------------------------------------------------------------------------------------!//
//$ FUNCTIONS $//


/**
 * Sets attributes and styles based on the current screen size.
 * Checks if the screen width is less than or equal to 75em (responsive breakpoint) using a media query.
 * If the condition is true, it performs a series of actions including adding CSS classes, toggling menu visibility, and updating the z-index of the navigation element.
 * If the condition is false, it resets the styles and attributes to their default values.
 */
//* CHECK MEDIAQUERY AND SETS ATTRIBUTES IF TRUE
function setAttributes() {
  const mediaQueryNavigation = window.matchMedia("screen and (max-width: 75em)");

  if (mediaQueryNavigation.matches) {
    // Screen width is less than or equal to 75em
    menu.classList.remove("menu-animation-fade-out");
    menu.classList.add("menu-animation-fade-in");

    if (previouslyOpenMenu && menuToggleCounter < 1) {
      toggleMenu("", "false", false);
    } else if (!previouslyOpenMenu) {
      toggleMenu("hidden", "true", true);
    } else {
      toggleMenu("", "false", false);
    }

    navElement.style.zIndex = "var(--z-menu)";
  } else {
    // Screen width is greater than 75em
    html.style.overflowY = "";
    removeAttributes();
    menu.classList.remove("menu-animation-fade-in");
    menu.classList.add("menu-animation-fade-out");
    navElement.style.zIndex = "";
  }

  menuToggleCounter++;
  previouslyOpenMenu = menu.ariaExpanded;
  console.log(previouslyOpenMenu);
}
//* REMOVES ARIA ATTRIBUTES
function removeAttributes() {
  navigationButton.removeAttribute("aria-expanded");
  menu.removeAttribute("aria-expanded");
}

//* OPEN OR CLOSE MENU *//
function toggleMenu(overflow, expanded, activeNav) {
  html.style.overflowY = overflow;
  navigationButton.setAttribute("aria-expanded", expanded);
  menu.setAttribute("aria-expanded", expanded);
  progressBar.setAttribute("aria-expanded", expanded);

  checkIfScrolled();

  if (activeNav) {
    showNavbar();
  }
}

function toggleAnimationMenu() {
  menu.classList.toggle("menu-animation-fade-in");
  menu.classList.toggle("menu-animation-fade-out");
}

//* DISPLAY NAVBAR *//
function showNavbar() {
  navOptionsBar.classList.add("active-navbar");
}

//* HIDE NAVBAR *//
function hideNavbar() {
  navOptionsBar.classList.remove("active-navbar");
}

//* CHECK IF NAVIGATION IS ALREADY OPEN
function isNavigationOpen() {
  const menuIsOpen = navigationButton.getAttribute("aria-expanded");
  menuIsOpen == "false"
    ? toggleMenu("hidden", "true", true)
    : toggleMenu("", "false", false);
}

//* HANDLE SCROLL EVENT
function checkIfScrolled() {
  window.scrollY > 1 ? showNavbar() : hideNavbar();
}

function updateProgressBar() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  progressBar.style.width = scrolled + "%";
}

//$ END FUNCTIONS $//
//!-----------------------------------------------------------------------------------------------------------------------------------------------!//
//$ EVENTLISTENERS $//

//* LISTEN FOR RESIZE OR RELOAD
window.addEventListener("load", setAttributes);
window.addEventListener("resize", setAttributes);

//* LISTEN FOR NAVIGATION CLICK
navigationButton.addEventListener("click", isNavigationOpen);
navigationButton.addEventListener("click", toggleAnimationMenu);

//* LISTEN FOR SCROLL
window.addEventListener("scroll", checkIfScrolled);
window.addEventListener("scroll", updateProgressBar);

//* LISTEN FOR CLICK ON MENU POINT *//
menuItem.forEach((item) => {
  item.addEventListener("click", () => {
    setTimeout(() => {
      toggleMenu("", "false", false);
      toggleAnimationMenu();
    }, 200);
  });
});

preventAnchorLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    var anchor = this.href.split("#")[1];
    console.log(anchor);
    var targetElement = document.getElementById(anchor);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
  });
});

//$ END EVENTLISTENERS $//
