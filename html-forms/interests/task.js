const categoriesList = [...document.querySelectorAll('.interests_main > ul > .interest')];

const categoriesCheckboxes = categoriesList.map(el => el.querySelector('.interest__check'));

categoriesCheckboxes.forEach(el => {
    el.addEventListener('change', onCheckboxChange);
})
    

function onCheckboxChange(e) {
    const parent = e.target.closest('.interest');
    const listElements = parent.querySelectorAll('.interests_active .interest__check');
    
    if (e.target.checked) {
        listElements.forEach(el => el.checked = true);
    } else {
        listElements.forEach(el => el.checked = false);
    }
}

