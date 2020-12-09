const bookContainer = document.getElementById('book');
const bookControlsPanel = document.querySelector('.book__controls');

bookControlsPanel.addEventListener('click', onbookControlsPaneClick);

function onbookControlsPaneClick(e) {
    e.preventDefault();
    if (e.target.closest('.book__control_font-size')) {
        fontChange(e);
    };
    if (e.target.closest('.book__control_color')) {
        textColorChange(e);
    };
    if (e.target.closest('.book__control_background')) {
        bgColorChange(e);
    };
}

function fontChange(e) {
    e.preventDefault();
    const fontSizeElements = [...e.target.closest('.book__control_font-size').children];
    fontSizeElements.forEach(el => el.classList.remove('font-size_active'));
    e.target.classList.add('font-size_active');

    const fontSize = e.target.dataset.size || null;
    if (fontSize === 'small') {
        bookContainer.classList.remove('font-size_big');
        bookContainer.classList.add('font-size_small');
    } else if (fontSize === 'big') {
        bookContainer.classList.remove('font-size_small');
        bookContainer.classList.add('font-size_big');
    } else {
        bookContainer.classList.remove('font-size_small', 'font-size_big');
    }
}

function textColorChange(e) {
    e.preventDefault();
    const textColorElements = [...e.target.closest('.book__control_color').children];
    textColorElements.forEach(el => el.classList.remove('color_active'));
    e.target.classList.add('color_active');

    const textColor = e.target.dataset.textColor;
    if (textColor === 'black') {
        bookContainer.classList.remove('book_color-gray', 'book_color-whitesmoke');
        bookContainer.classList.add('book_color-black');
    } else if (textColor === 'gray') {
        bookContainer.classList.remove('book_color-black', 'book_color-whitesmoke');
        bookContainer.classList.add('book_color-gray');
    } else {
        bookContainer.classList.remove('book_color-black', 'book_color-gray');
        bookContainer.classList.add('book_color-whitesmoke');
    }
}

function bgColorChange(e) {
    e.preventDefault();
    const bgColorElements = [...e.target.closest('.book__control_background').children];
    bgColorElements.forEach(el => el.classList.remove('color_active'));
    e.target.classList.add('color_active');

    const bgColor = e.target.dataset.bgColor;
    if (bgColor === 'black') {
        bookContainer.classList.remove('book_bg-gray', 'book_bg-white');
        bookContainer.classList.add('book_bg-black');
    } else if (bgColor === 'gray') {
        bookContainer.classList.remove('book_bg-black', 'book_bg-white');
        bookContainer.classList.add('book_bg-gray');
    } else {
        bookContainer.classList.remove('book_bg-black', 'book_bg-gray');
        bookContainer.classList.add('book_bg-white');
    }
}