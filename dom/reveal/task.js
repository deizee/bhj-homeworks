const blocks = document.querySelectorAll('.reveal');

document.addEventListener('scroll', onScroll);

function onScroll() {
    const viewportHeight= window.innerHeight;

    blocks.forEach(block => {
        const blockTop = block.getBoundingClientRect().top;
        if (blockTop < viewportHeight) {
            block.classList.add('reveal_active');
        }
    })
}