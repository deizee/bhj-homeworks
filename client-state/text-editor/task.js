const textarea = document.getElementById('editor');
const clearButtonElement = document.getElementById('clear-btn');

// Events
document.addEventListener('DOMContentLoaded', onLoad);
textarea.addEventListener('input', onTextareaBlur);
clearButtonElement.addEventListener('click', onBtnClick);

// Handlers
function onLoad() {
  let text = localStorage.getItem('text');
  textarea.value = text;
}

function onTextareaBlur() {
  let text = textarea.value;
  localStorage.setItem('text', text);
}

function onBtnClick() {
  textarea.value = '';
  localStorage.removeItem('text');
}