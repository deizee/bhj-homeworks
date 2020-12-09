const timer1 = document.getElementById('timer');
let seconds = +timer1.textContent;

function countdown1() {
    --seconds;
    timer1.textContent = seconds;
    if (seconds === 0) {
        alert('Вы победили в конкурсе!');
        clearInterval(interval1);
    }
    return seconds;
}

const interval1 = setInterval(countdown1, 1000);

// =====================================================

const container = document.getElementById('status');
const timer2 = document.createElement('div');
timer2.id = 'timer2';
timer2.innerHTML = `
    <hr><br> 
    Введите время в формате hh:mm:ss
    <br><br> 
    <input type='text' id='hh' style='width: 20px' value='00'> :
    <input type='text' id='mm' style='width: 20px' value='00'> :
    <input type='text' id='ss' style='width: 20px' value='00'>
    <br><br> 
    <input  type='button' id='start-btn' value='Старт!'>
`

container.insertAdjacentElement('afterend', timer2);

const startBtn = document.getElementById('start-btn');
startBtn.addEventListener('click', countdown2);

let interval2 = null;

function countdown2() {
    let hh = document.getElementById('hh').value;
    let mm = document.getElementById('mm').value;
    let ss = document.getElementById('ss').value;
    let ms = (+hh * 3600 + +mm * 60 + +ss) * 1000;

    const nowTime = Date.now();
    const future = nowTime + ms;

    interval2 = setInterval(() => fn(future), 1000);
}

function fn(future) {
    const countdown = (Math.ceil((future - Date.now()) / 1000)) * 1000;
    const timeString = new Date(countdown).toISOString();
    hh.value = timeString.slice(11, 13);
    mm.value = timeString.slice(14, 16);
    ss.value = timeString.slice(17, 19);
    if (countdown <= 0) {
        clearInterval(interval2);
        window.location = 'https://soundslibmp3.ru/sounds/1585738391_dzyn-12.mp3';
        return;
    }
}





