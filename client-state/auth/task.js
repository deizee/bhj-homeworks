const signin = document.getElementById('signin');
const form = document.forms['signin__form'];
const login = form.querySelector('input[name="login"]');
const password = form.querySelector('input[name="password"]');
const submitBtn = form.querySelector('#signin__btn');
const logoutBtn = document.querySelector('#logout__btn');
const welcomeElement = document.getElementById('welcome');

document.addEventListener('DOMContentLoaded', onLoad);  
submitBtn.addEventListener('click', onSubmitBtnClick);
logoutBtn.addEventListener('click', onLogoutBtnClick);

function onLoad() {
  logoutBtn.classList.remove('logout_active');
  const id = localStorage.getItem('user_id');
  if (id) {
    showWelcome(id);
  } else {
    signin.classList.add('signin_active');
  };
}

function onSubmitBtnClick(e) {
  e.preventDefault();
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://netology-slow-rest.herokuapp.com/auth.php');

  xhr.addEventListener('readystatechange', function () {
    if (xhr.readyState == xhr.DONE && Math.floor(xhr.status / 100) == 2) {
      const response = JSON.parse(xhr.responseText);
      if (response.success) {
        showWelcome(response.user_id);
        localStorage.setItem('user_id', response.user_id);
      } else {
        alert('Неверный логин или пароль');
      };
      login.value = '';
      password.value = '';
    };
  });

  xhr.send(new FormData(form));
}

function onLogoutBtnClick(e) {
  e.preventDefault();
  localStorage.removeItem('user_id');
  signin.classList.add('signin_active');
  welcomeElement.classList.remove('welcome_active');
  logoutBtn.classList.remove('logout_active');
}

function showWelcome(id) {
  const span = document.getElementById('user_id');
  signin.classList.remove('signin_active');
  logoutBtn.classList.add('logout_active');
  welcomeElement.classList.add('welcome_active');
  span.textContent = id;
}


