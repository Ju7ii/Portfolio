//$ VARIABLES $//

const projectButtons = document.getElementsByClassName("not-available");
const errorBox = document.getElementById("error-box");

//$ END VARIABLES $//
//!-----------------------------------------------------------------------------------------------------------------------------------------------!//
//$ FUNCTIONS $//

//* SAVE PREFERED LANGUAGE IN LOCAL STORAGE
function setLanguage(event) {
  event.preventDefault();
  const selectedLanguage = event.currentTarget.getAttribute("set-language");
  localStorage.setItem("userLanguage", selectedLanguage);
  // REDIRECT AFTER 10MS
  setTimeout(() => {
    // REDIRECT USER TO SELECTED SITE
    if (selectedLanguage === "en") {
      window.location.href = "../en";
    } else {
      window.location.href = "../de";
    }
  }, 10);
}

function openError() {
  const closeButton = document.getElementById("menu-close-button");
  setTimeout(() => {
    errorBox.classList.add("error-fade-in");
    errorBox.setAttribute("aria-hidden", "false");
    closeButton.setAttribute("aria-controls", "primary-navigation");

    document.addEventListener("click", checkClick);
  }, 10);
}

function checkClick(e) {
  const targetIsOutsideContainer = !errorBox.contains(e.target);
  if (targetIsOutsideContainer) {
    closeError();
  }
}

function closeError() {
  document.removeEventListener("click", checkClick);
  errorBox.classList.remove("error-fade-in");
}

//$ END FUNCTIONS $//
//!-----------------------------------------------------------------------------------------------------------------------------------------------!//
//$ EVENTLISTENERS $//

Array.from(projectButtons).forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    openError();
  });
});
