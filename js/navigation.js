//$ VARIABLES $//

const navOptionsBar = document.querySelector(".nav-options");
const navigationButton = document.querySelector(".menu-toggle-button");
const navElement = document.querySelector(".navigation");
const menu = document.getElementById("menu");
const menuItem = document.querySelectorAll(".menu-item");
const progressBar = document.getElementById("progress-bar");
const preventAnchorLinks = document.querySelectorAll(".prevent-anchor");
const html = document.documentElement;

//$ END VARIABLES $//
//!-----------------------------------------------------------------------------------------------------------------------------------------------!//
//$ FUNCTIONS $//

function closeMenuOnResize() {
  const mediaQueryNavigation = window.matchMedia(
    "screen and (min-width: 75em)"
  );
  const menuOpen = menu.getAttribute("aria-expanded");
  if (mediaQueryNavigation.matches) {
    hideNavbar();
  } else if (!mediaQueryNavigation.matches && menuOpen === "true") {
    showNavbar();
  }
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
    navElement.style.zIndex = "var(--z-menu)";
  } else {
    navElement.style.zIndex = "";
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
// window.addEventListener("load", setAttributes);
window.addEventListener("resize", closeMenuOnResize);

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
