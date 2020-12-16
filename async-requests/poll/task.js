const poll = document.querySelector('poll');
const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');

pollAnswers.addEventListener('click', onPollAnswersClick);

const xhr = new XMLHttpRequest();
xhr.open('GET','https://netology-slow-rest.herokuapp.com/poll.php');
xhr.addEventListener('readystatechange', function() {
    if (this.readyState == xhr.DONE && this.status >= 200 && this.status < 300) {
        const response = JSON.parse(this.responseText);
        const { id, data: { title, answers } } = response;

        const titleTemplate = getTitleTemplate(title);
        pollTitle.insertAdjacentHTML('afterbegin', titleTemplate);

        answers.forEach(answer => {
            const answerTemplate = getAnswerTemplate(answer);
            pollAnswers.insertAdjacentHTML('beforeend', answerTemplate);
        })
    }});
xhr.send();

function getTitleTemplate(title) {
    return `
        <div class="poll__title" id="poll__title">
           ${title}
        </div>
    `
}

function getAnswerTemplate(answer) {
    return `
        <button class="poll__answer">
            ${answer}
        </button>
    `
}

function onPollAnswersClick(e) {
    if (e.target.classList.contains('poll__answer')) {
        alert('Спасибоб ваш голос засчитан!');
    }
}

