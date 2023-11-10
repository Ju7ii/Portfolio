let character = 2;
let newTitleText = " Innovation in Pixels: Julian's Portfolio👨‍💻";
let currentTitle = document.title;

function counter() {
    counter.timer = setInterval(function () {
        document.title = newTitleText.substring(character, newTitleText.length) + newTitleText.substring(0, character);
        character++;
        if (character > newTitleText.length) {
            character = 0;
        }
    }, 500);
}

function stop() {
    clearInterval(counter.timer);
}

window.addEventListener('blur', counter);
window.addEventListener('focus', function() {
    stop();
    document.title = currentTitle;
});