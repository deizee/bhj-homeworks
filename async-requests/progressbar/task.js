const progress = document.getElementById('progress');
const form = document.forms['form'];
const inputFile = form.querySelector('input');
const sendBtn = form.elements['send'];

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://netology-slow-rest.herokuapp.com/upload.php');

    xhr.upload.onprogress = function(event) {
        progress.value = (event.loaded / event.total).toFixed(2);
    }

    xhr.send(new FormData(form));
}