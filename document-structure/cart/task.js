const productsContainer = document.querySelector('.products');
const cartContainer = document.querySelector('.cart__products');

productsContainer.addEventListener('click', onProductsContainerClick);

function onProductsContainerClick(e) {
    if (e.target.classList.contains('product__quantity-control')) {
        onCuantityChange(e.target);
    }
    if (e.target.classList.contains('product__add')) {
        onAddBtnClick(e.target);
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

    addProductsToLocalStorage(productId, productImg, quantity);
}

function getProductTemplate(productId, productImg, quantity) {
    return `
        <div class="cart__product" data-id="${productId}">
            <img class="cart__product-image" src="${productImg}">
            <div class="cart__product-count">${quantity}</div>
        </div>
    `
}

function addProductsToLocalStorage(productId, productImg, quantity) {
    let obj = localStorage.getItem('myProductsList');
    obj = obj ? JSON.parse(obj) : {};
    if (obj[productId]) {
        obj[productId].quantity = quantity;
    } else {
        obj[productId] = {
            id: productId,
            img: productImg,
            quantity,
        };
    }
    localStorage.setItem('myProductsList', JSON.stringify(obj));
}