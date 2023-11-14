//$ VARIABLES $//

const projectButtons = document.getElementsByClassName('not-available');
const errorBox = document.getElementById('error-box');

//$ END VARIABLES $//
//!-----------------------------------------------------------------------------------------------------------------------------------------------!//
//$ FUNCTIONS $//

function openError() {
    const closeButton = document.getElementById('menu-close-button');
    setTimeout(() => {
        errorBox.classList.add('error-fade-in');
        errorBox.setAttribute('aria-hidden', 'false');
        closeButton.setAttribute('aria-controls', 'primary-navigation');

        document.addEventListener('click', checkClick);

    }, 10);
}

function checkClick(e) {
    const targetIsOutsideContainer = !errorBox.contains(e.target);
    if (targetIsOutsideContainer) {
        closeError();
    }
}

function closeError() {
    document.removeEventListener('click', checkClick);
    errorBox.classList.remove('error-fade-in');
}

//$ END FUNCTIONS $//
//!-----------------------------------------------------------------------------------------------------------------------------------------------!//
//$ EVENTLISTENERS $//

Array.from(projectButtons).forEach(button => {
    button.addEventListener('click', e => {
        e.preventDefault();
        openError();
    });
})

