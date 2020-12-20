const textarea = document.getElementById('editor');
const btn = document.getElementById('clear-btn');

// Events
document.addEventListener('DOMContentLoaded', onLoad);
textarea.addEventListener('input', onTextareaBlur);
btn.addEventListener('click', onBtnClick);

// Handlers
function onLoad() {
  let text = localStorage.getItem('MyText') || '';
  textarea.value = text;
}

function onTextareaBlur() {
  let text = textarea.value;
  localStorage.setItem('MyText', text);
}

function onBtnClick() {
  textarea.value = '';
  localStorage.setItem('MyText', '');
}