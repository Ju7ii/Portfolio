var character = 2;
var newTitleText = " Innovation in Pixels: Julian's Portfolio👨‍💻";
var currentTitle = document.title;
function counter() {
    counter.timer = setInterval(function () {
        document.title = newTitleText.substring(character, newTitleText.length) + newTitleText.substring(0, character);
        character++;
        if (character > message.length) {
            character = 0;
        }
    }, 500);
}
function stop() {
    clearInterval(counter.timer);
}
window.onblur = function () {
    counter();
};
window.onfocus = function () {
    stop();
    document.title = currentTitle;
};