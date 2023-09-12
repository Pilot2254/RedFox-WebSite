let clicks = 0;
let autoClicks = 0;
let rebirths = 0;
let autoClickerOn = false;
let autoClickInterval;

const clickButton = document.getElementById("clickButton");
const autoClickButton = document.getElementById("autoClickButton");
const rebirthButtons = document.getElementsByClassName("rebirthButton");
const clicksElement = document.getElementById("clicks");
const rebirthsElement = document.getElementById("rebirths");

function updateClicks() {
    clicksElement.innerText = clicks;
}

function updateRebirths() {
    rebirthsElement.innerText = rebirths;
}

function click() {
    clicks++;
    updateClicks();
}

function activateAutoClicker() {
    if (autoClickerOn) {
        clearInterval(autoClickInterval);
        autoClickerOn = false;
        autoClickButton.classList.remove("on");
    } else {
        autoClickerOn = true;
        autoClickButton.classList.add("on");
        autoClickInterval = setInterval(function() {
            clicks += autoClicks;
            updateClicks();
        }, 1000);
    }
}

function rebirth(rebirthAmount) {
    clicks -= rebirthAmount;
    rebirths++;
    updateClicks();
    updateRebirths();
}

clickButton.addEventListener("click", click);
autoClickButton.addEventListener("click", activateAutoClicker);

for (let i = 0; i < rebirthButtons.length; i++) {
    rebirthButtons[i].addEventListener("click", function () {
        const rebirthAmount = parseInt(rebirthButtons[i].parentNode.parentNode.cells[0].innerText.split("x")[1].trim());
        rebirth(rebirthAmount);
    });
}



// Hi devs, please add more functions to this game, Like rebirths etc. --p2254
// I dont have time, sorry --maty
// WHY? it must be most boring game in the world --Ang3L
// I agree with maty --xxx_bad_xxx
// A agree with me --ReMeow
// Guys, why is redfox still not popular?! --Daddy>x12
// UWU *said in nigerian low deep voice* --maty

