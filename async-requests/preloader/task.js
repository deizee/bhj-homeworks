const loader = document.getElementById('loader');
const items = document.getElementById('items');

const xhr = new XMLHttpRequest();
xhr.open('GET','https://netology-slow-rest.herokuapp.com');
xhr.addEventListener('readystatechange', function() {
    if (this.readyState == xhr.DONE && this.status >= 200 && this.status < 300) {
        const data = JSON.parse(this.responseText);
        const valute = data.response.Valute;
        Object.values(valute).forEach(el => {
            const template = getTemplate(el);
            items.insertAdjacentHTML('beforeend', template);
        });

        loader.classList.remove('loader_active');
    }});
xhr.send();

function getTemplate({ CharCode, Value }) {
    return `
        <div class="item">
            <div class="item__code">
                ${CharCode}
            </div>
            <div class="item__value">
                ${Value}
            </div>
            <div class="item__currency">
                руб.
            </div>
        </div>
    `
}