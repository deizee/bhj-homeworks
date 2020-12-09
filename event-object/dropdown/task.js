const dropdowns = [...document.querySelectorAll('.dropdown__value')];
const dropdownLists = [...document.querySelectorAll('.dropdown__list')];

dropdowns.forEach((el, index) => el.addEventListener('click', () => onDropdownClick(index)));
dropdownLists.forEach((el, index) => el.addEventListener('click', (e) => onDropdownListClick(e, index)));

function onDropdownClick(i) {
    dropdownLists[i].classList.toggle('dropdown__list_active');
}

function onDropdownListClick(e, i) {
    e.preventDefault();
    if (e.target.classList.contains('dropdown__link')) {
        dropdowns[i].textContent = e.target.textContent;
    }
    dropdownLists[i].classList.remove('dropdown__list_active');
}