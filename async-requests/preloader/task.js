const loader = document.getElementById('loader');
const items = document.getElementById('items');

document.addEventListener('DOMContentLoaded', getLoader);

function getLoader() {
    let valuteList = localStorage.getItem('myValuteList');
    valuteList = valuteList ? JSON.parse(valuteList) : [];

    if (valuteList.length == 0) {
        getRequest();
    } else {
        valuteList.forEach(el => {
            const template = getTemplate(el);
            items.insertAdjacentHTML('beforeend', template);
        });

        loader.classList.remove('loader_active');
    };
}

function getRequest() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://netology-slow-rest.herokuapp.com');
    xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState == xhr.DONE && Math.floor(xhr.status / 100) == 2) {
            const data = JSON.parse(xhr.responseText);
            const valute = data.response.Valute;

            Object.values(valute).forEach(el => {
                const template = getTemplate(el);
                items.insertAdjacentHTML('beforeend', template);
                addValuteInLocalStorage(el);
            });

            loader.classList.remove('loader_active');
        };
    });
    xhr.send();
}

function getTemplate(el) {
    return `
        <div class="item">
            <div class="item__code">
                ${el.CharCode}
            </div>
            <div class="item__value">
                ${el.Value}
            </div>
            <div class="item__currency">
                руб.
            </div>
        </div>
    `
}

function addValuteInLocalStorage(el) {
    let valuteList = localStorage.getItem('myValuteList');
    valuteList = valuteList ? JSON.parse(valuteList) : [];
    valuteList.push(el);
    localStorage.setItem('myValuteList', JSON.stringify(valuteList));
}