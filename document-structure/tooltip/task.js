const links = [...document.querySelectorAll('.has-tooltip')];

links.forEach(el => el.addEventListener('click', onLinkClick));

function onLinkClick(e) {
    e.preventDefault();

    if (e.target.nextElementSibling && e.target.nextElementSibling.classList.contains('tooltip')) {
        e.target.nextElementSibling.remove();
        return;
    }

    const tools = [...document.querySelectorAll('.tooltip')];
    if (tools) {
        tools.forEach(el => el.remove());
    }

    const tool = document.createElement('div');
    tool.textContent = e.target.title;
    tool.classList.add('tooltip', 'tooltip_active');

    const position = e.target.dataset.position;
    const toolCoord = toolPosition(e.target, tool, position);
    tool.style.left = `${toolCoord.left}px`;
    tool.style.top = `${toolCoord.top}px`;

    e.target.insertAdjacentElement('afterend', tool);
}

function toolPosition(target, tool, position) {
    const targetRect = target.getBoundingClientRect();
    let left = 0;
    let top = 0;

    target.insertAdjacentElement('afterend', tool);
    toolRect = tool.getBoundingClientRect();
    const toolWidth = toolRect.width;
    const toolHeight = toolRect.height;
    tool.remove();

    switch (position) {
        case 'top':
            left = targetRect.left;
            top = targetRect.top - toolHeight;
            break;
        case 'left':
            left = targetRect.left - toolWidth;
            top = targetRect.top;
            break;
        case 'right':
            left = targetRect.right;
            top = targetRect.top;
            break;
        case 'bottom':
            left = targetRect.left;
            top = targetRect.bottom;
            break;
    
        default:
            break;
    };

    return {
        left,
        top
    }
}


