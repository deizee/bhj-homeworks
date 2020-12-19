const textarea = document.getElementById('editor');
const btn = document.getElementById('clear-btn');

document.addEventListener('DOMContentLoaded', onLoad);
textarea.addEventListener('input', onTextareaBlur);
btn.addEventListener('click', onBtnClick);

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