const modalMain = document.getElementById('modal_main');
modalMain.classList.add('modal_active');

const modalCloseElements = document.querySelectorAll('.modal__close_times');
[...modalCloseElements].forEach(el => el.addEventListener('click', onModalCloseClick));

function onModalCloseClick(e) {
    const parent = e.target.closest('.modal');
    parent.classList.remove('modal_active');
}

const modalSuccess = document.getElementById('modal_success');
const showSuccess = document.querySelector('.show-success');
showSuccess.addEventListener('click', onshowSuccessClick);

function onshowSuccessClick() {
    modalMain.classList.remove('modal_active');
    modalSuccess.classList.add('modal_active');
}