const rotators = [...document.querySelectorAll('.rotator')];

rotators.forEach(el => rotateElements(el));

function rotateElements(el) {
    const rotatorEls = [...el.children];
    startRotate(rotatorEls);
}

function startRotate(elems) {
    let i = elems.indexOf(elems.find(el => el.matches('.rotator__case_active'))) || 0;
    setInterval(() => {
        elems.forEach(el => el.classList.remove('rotator__case_active'));
        elems[i].classList.add('rotator__case_active');
        elems[i].style.color = `${elems[i].dataset.color}`;
        i++;
        if (i > elems.length - 1) {
            i = 0;
        } 
    }, 1000);
}