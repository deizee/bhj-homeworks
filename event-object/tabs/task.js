const tabContainers = [...document.querySelectorAll('.tabs')];
let tabs = {};
let tabContents = {};

tabContainers.forEach((el, index) => {
    tabsArray = [...el.querySelectorAll('.tab')];
    tabContentsArray = [...el.querySelectorAll('.tab__content')];

    tabs[index] = tabsArray;
    tabContents[index] = tabContentsArray;

    tabs[index].forEach((tab, i) => tab.addEventListener('click', () => onTabClick(i, index)));
});

function onTabClick(i, index) {
    tabs[index].forEach(el => el.classList.remove('tab_active'));
    tabContents[index].forEach(el => el.classList.remove('tab__content_active'));

    tabs[index][i].classList.add('tab_active');
    tabContents[index][i].classList.add('tab__content_active');
}