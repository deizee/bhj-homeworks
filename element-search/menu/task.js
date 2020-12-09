const menuLinks = document.querySelectorAll('.menu__link');
[...menuLinks].forEach(link => link.addEventListener('click', onMenuClick));

function onMenuClick(e) {
    const sibling = e.target.nextElementSibling;
    if (sibling && sibling.classList.contains('menu_sub')) {
        e.preventDefault();
        sibling.classList.toggle('menu_active');

        const menuSub = document.querySelectorAll('.menu_sub');
        [...menuSub].forEach(el => {
            if (el != sibling && el.classList.contains('menu_active')) {
                el.classList.remove('menu_active');
            }
        })
    }
}