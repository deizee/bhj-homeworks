const deadElement = document.getElementById('dead');
const lostElement = document.getElementById('lost');
const gameContainer = document.querySelector('.hole-game');

gameContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('hole_has-mole')) {
        ++deadElement.textContent;
        checkWin();
    } else {
        ++lostElement.textContent;
        chekLose();
    }
})

function checkWin() {
    if (deadElement.textContent == '10') {
        alert('Вы победили!');
        deadElement.textContent = '0';
        lostElement.textContent = '0';
    }
}

function chekLose() {
    if (lostElement.textContent == '5') {
        alert('Вы проиграли ((');
        deadElement.textContent = '0';
        lostElement.textContent = '0';
    }
}