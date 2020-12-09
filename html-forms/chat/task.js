const chatWidgetElement = document.querySelector('.chat-widget');
const messages = document.querySelector( '.chat-widget__messages' );
const inputElement = document.getElementById('chat-widget__input');
let intervalId = null;

// Events
chatWidgetElement.addEventListener('click', onchatWidgetClick);
document.addEventListener('keyup', onKeyUp);
inputElement.addEventListener('blur', onInputBlur);

// Handlers
function onchatWidgetClick() {
    chatWidgetElement.classList.add('chat-widget_active');
}

function onKeyUp(e) {
    if (e.key != 'Enter') return;
    clearInterval(intervalId);

    showClientMessage();
    showBotMessage();

    startWaitingMessage();
}

function showClientMessage() {
    let inputText = inputElement.value;
    if (inputText) {
        const template = messageTemplate(inputText, 'message message_client');
        messages.innerHTML += template;
        inputElement.value = '';
        messages.lastElementChild.scrollIntoView();
    }
}

function showBotMessage() {
    const msg = generateMessage();
    const template = messageTemplate(msg);
    setTimeout(() => {
        messages.innerHTML += template;
        messages.lastElementChild.scrollIntoView();
    }, 1000);
}

function messageTemplate(msg, type = 'message') {
    return `
        <div class="${type}">
            <div class="message__time">${new Date().toTimeString().slice(0, 5)}</div>
            <div class="message__text">
                ${msg}
            </div>
        </div>
    `;
}

function generateMessage() {
    const botMessagesList = [
        'Кто тут?',
        'Вы не купили ни одного товара, чтобы с нами так разговаривать!',
        'К сожалению, все операторы сейчас заняты. Не пишите нам больше',
        'Где ваша совесть?',
        'До свидания!',
        'Мы ничего не будем вам продавать!',
        'Хотеть не вредно!',
        'Вы мне грубите',
        'Вы часом не баран по гороскопу?',
        'Было бы смешно, но не было',
        'Ваше чувство юмора в стадии зачатия',
        'Как много интересного вы говорите! Как жаль, что меня это мало интересует',
        'Что за день такой? Одни идиоты и тупицы попадаются',
        'Может да, а может и нет',
        'Как скажете',
        'Сам такой!',
        'Коэффициент вашего умственного развития отбивает всякое желание дискутировать с вами на данную тему',
    ];
    const msgIndex = Math.floor((Math.random() * 17));
    return botMessagesList[msgIndex];
}

function startWaitingMessage() {
    intervalId = setInterval(() => {
        showBotMessageAfterWaiting();
    }, 10000);
}

function showBotMessageAfterWaiting() {
    messages.innerHTML += messageTemplate('Вы еще тут?');
    messages.lastElementChild.scrollIntoView();
}

function onInputBlur() {
    clearInterval(intervalId);
}