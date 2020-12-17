const poll = document.querySelector('poll');
const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');

document.addEventListener('DOMContentLoaded', getPoll);
pollAnswers.addEventListener('click', onPollAnswersClick);

function getPoll() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://netology-slow-rest.herokuapp.com/poll.php');
  xhr.addEventListener('readystatechange', function () {
    if (xhr.readyState == xhr.DONE && Math.floor(xhr.status / 100) == 2) {
      const response = JSON.parse(xhr.responseText);
      renderPoll(response);
    }
  });
  xhr.send();
}

function renderPoll( { id, data: { title, answers } } ) {
  pollTitle.textContent = title;
  pollTitle.dataset.id = id;
  answers.forEach((answer, id) => {
    const answerTemplate = getAnswerTemplate(answer, id);
    pollAnswers.insertAdjacentHTML('beforeend', answerTemplate);
  });
}

function getAnswerTemplate(answer, id) {
  return `
        <button class="poll__answer" data-id="${id}">
            ${answer}
        </button>
    `
}

function onPollAnswersClick(e) {
  if (e.target.classList.contains('poll__answer')) {
    alert('Спасибоб ваш голос засчитан!');

    const pollId = pollTitle.dataset.id;
    const answerId = e.target.dataset.id;
    
    const xhr = new XMLHttpRequest;
    xhr.open('POST', 'https://netology-slow-rest.herokuapp.com/poll.php');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.addEventListener('readystatechange', function () {
      if (xhr.readyState == xhr.DONE && Math.floor(xhr.status / 100) == 2) {
        const response = JSON.parse(xhr.responseText);
        const template = renderStatistic(response);
        pollAnswers.innerHTML = template;
      };
    });
    xhr.send(`vote=${pollId}&answer=${answerId}`);
  }
}

function renderStatistic( { stat } ) {
  const total = stat.reduce(((acc, cur) => acc += cur.votes), 0);
  return stat.map(el => {
    return `
      <div>${el.answer}: <span style="font-weight: bold">${((el.votes * 100) / total).toFixed(2)}%</div>
    `
  }).join(' ');
}