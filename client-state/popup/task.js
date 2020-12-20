const modal = document.getElementById('subscribe-modal');

document.addEventListener('DOMContentLoaded', onLoad);
modal.addEventListener('click', onModalClick);

function onLoad() {
  const isClosed = isModalCloseTrue();

  if (!isClosed) {
    setTimeout(() => {
      modal.classList.add('modal_active');
    }, 1000);
  };
}

function isModalCloseTrue() {
  let cookie = document.cookie.split('; ').map((c) => c.split('=')).find((c) => c[0] == 'modalclose');
  return cookie ? cookie[1] : null;
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