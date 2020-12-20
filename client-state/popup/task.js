const modal = document.getElementById('subscribe-modal');

document.addEventListener('DOMContentLoaded', onLoad);
modal.addEventListener('click', onModalClick);

function onLoad() {
  const isClosed = isModalCloseTrue();

  if (!isClosed) {
    modal.classList.add('modal_active');
  };
}

function isModalCloseTrue() {
  let cookiePair = document.cookie
    .split('; ')
    .map((c) => c.split('='))
    .find((c) => c[0] == 'modalclose');
    
  return cookiePair && cookiePair[1] == 'true' ? true : false;
}

function onModalClick(e) {
  if (e.target.classList.contains('modal__close')) {
    modal.classList.remove('modal_active')
    setCookie();
  };
}

function setCookie() {
  document.cookie = 'modalclose=true';
}