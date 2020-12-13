const productsContainer = document.querySelector('.products');
const cartContainer = document.querySelector('.cart__products');
const cartTitle = document.querySelector('.cart__title');

document.addEventListener('DOMContentLoaded', onLoad);
productsContainer.addEventListener('click', onProductsContainerClick);
cartContainer.addEventListener('click', onCartContainerClick);

function onLoad() {
    let productsList = localStorage.getItem('myProductsList');
    productsList = productsList ? JSON.parse(productsList) : {};
    if (Object.keys(productsList).length == 0) {
        cartTitle.classList.add('invisible');
    } else {
        cartTitle.classList.remove('invisible');
    }
    Object.values(productsList).forEach(el => {
        const {id, img, quantity} = el;
        const template = getProductTemplate(id, img, quantity);
        cartContainer.insertAdjacentHTML('afterbegin', template);
    })
}

function onProductsContainerClick(e) {
    if (e.target.classList.contains('product__quantity-control')) {
        onCuantityChange(e.target);
    }
    if (e.target.classList.contains('product__add')) {
        onAddBtnClick(e.target);
    }
}

function onCartContainerClick(e) {
    if (e.target.classList.contains('product__del')) {
        onDelBtnClick(e.target);
    }
}

function onCuantityChange(target) {
    const parent = target.closest('.product__quantity-controls');
    const quantityEl = parent.querySelector('.product__quantity-value');
    
    if (target.classList.contains('product__quantity-control_dec')) {
        if (quantityEl.textContent != '1') {
            quantityEl.textContent = +quantityEl.textContent - 1; 
        } 
    }
    if (target.classList.contains('product__quantity-control_inc')) {
        quantityEl.textContent = +quantityEl.textContent + 1;
    }
}

function onAddBtnClick(target) {
    const parent = target.closest('.product');
    const productId = parent.dataset.id;
    const productImg = parent.querySelector('img').src;
    const quantity = +parent.querySelector('.product__quantity-value').textContent;

    const productItem = cartContainer.querySelector(`.cart__product[data-id="${productId}"]`);
    if (productItem) {
        productItem.querySelector('.cart__product-count').textContent = +productItem.querySelector('.cart__product-count').textContent + quantity;
    } else {
        const template = getProductTemplate(productId, productImg, quantity);
        cartContainer.insertAdjacentHTML('beforeend', template);
    };

    cartTitle.classList.remove('invisible');

    showAnimation(parent, productId);

    addProductsToLocalStorage(productId, productImg, quantity);
}

function onDelBtnClick(target) {
    const parent = target.closest('.cart__product');
    const productId = parent.dataset.id;
    delProductFromLocalStorage(productId);
    target.closest('.cart__product').remove();
    if (!cartContainer.querySelector('.cart__product')) {
        cartTitle.classList.add('invisible');
    }
}

function getProductTemplate(productId, productImg, quantity) {
    return `
        <div class="cart__product" data-id="${productId}">
            <img class="cart__product-image" src="${productImg}">
            <div class="cart__product-count">${quantity}</div>
            <div class="product__del">
                Удалить
            </div>
        </div>
    `
}

function addProductsToLocalStorage(productId, productImg, quantity) {
    let productsList = localStorage.getItem('myProductsList');
    productsList = productsList ? JSON.parse(productsList) : {};
    if (productsList[productId]) {
        productsList[productId].quantity += quantity;
    } else {
        productsList[productId] = {
            id: productId,
            img: productImg,
            quantity,
        };
    }
    localStorage.setItem('myProductsList', JSON.stringify(productsList));
}

function delProductFromLocalStorage(productId) {
    let productsList = localStorage.getItem('myProductsList');
    productsList = productsList ? JSON.parse(productsList) : {};
    delete productsList[productId];
    localStorage.setItem('myProductsList', JSON.stringify(productsList));
}

function showAnimation(parent, productId) {
    const img = parent.querySelector('img');
    const imgRect1 = img.getBoundingClientRect();
    const left1 = imgRect1.left;
    const top1 = imgRect1.top;

    const imgInCartContainer = cartContainer.querySelector(`.cart__product[data-id="${productId}"]`).querySelector('img');
    const imgRect2 = imgInCartContainer.getBoundingClientRect();
    const left2 = imgRect2.left;
    const top2 = imgRect2.top;
    
    const imgCopy = img.cloneNode(true);
    imgCopy.style.position = 'absolute';
    imgCopy.style.zIndex = '99';
    imgCopy.style.left = `${left1}px`;
    imgCopy.style.top = `${top1}px`;

    document.body.insertAdjacentElement('afterbegin', imgCopy);
    
    startAnimation(imgCopy, left1, top1, left2, top2);
}

function startAnimation(imgCopy, left1, top1, left2, top2) {
    let x = left2 - left1;
    let y = top1 - top2;
    const stepX = x / 50;
    const stepY = y / 50;
    let interval = setInterval(() => {
        if (x > stepX && y > stepY) {
            left1 += stepX;
            top1 -= stepY;
            imgCopy.style.left = `${left1}px`;
            imgCopy.style.top = `${top1}px`;
            x -= stepX;
            y -= stepY;
        } else {
            clearInterval(interval);
            imgCopy.remove();
        }
    }, 10);
}