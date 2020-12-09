const clicker = document.querySelector('.clicker');
const clicker__status = document.querySelector('.clicker__status');

const clicker__speed = document.createElement('div');
clicker__speed.innerHTML = `Скорость клика: <span id="clicker__speedCounter">0</span>`;
clicker__status.insertAdjacentElement('afterend', clicker__speed);
const clicker__speedCounter = document.getElementById('clicker__speedCounter');

let clickSpeed = 0;
let date = Date.now();

clicker.addEventListener('click', () => {
    clickerCounter();
    clickSpeedCounter();
});

function clickerCounter() {
    const clicker__counter = document.getElementById('clicker__counter');
    let countOfClicks = +clicker__counter.textContent;
    clicker__counter.textContent = ++countOfClicks;

    const cookie = document.getElementById('cookie');
    cookie.width === 200 ? cookie.width = 250 : cookie.width = 200
}

function clickSpeedCounter() {
    date = (Date.now() - date) / 1000;
    clickSpeed = (1 / date).toFixed(2);
    clicker__speedCounter.textContent = clickSpeed;
    date = Date.now();
}