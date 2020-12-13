const addButton = document.getElementById('tasks__add');
const input = document.getElementById('task__input');
const tasksContainer = document.getElementById('tasks__list');
const taskList = {};

document.addEventListener('DOMContentLoaded', onLoad);
addButton.addEventListener('click', onAddBtnClick);
tasksContainer.addEventListener('click', onTaskContainerClick);

function onLoad() {
    let obj = localStorage.getItem('myTaskList');
    obj = obj ? JSON.parse(obj) : {};
    Object.values(obj).forEach(el => {
        const {id, text} = el;
        const taskTemplate = createTaskTemplate(text, id);
        tasksContainer.insertAdjacentHTML('afterbegin', taskTemplate);
    })
}

function onAddBtnClick(e) {
    e.preventDefault();
    if (!input.value) return;
    const taskId = Date.now();
    addTack(input.value, taskId);
    input.value = '';
}

function addTack(taskText, taskId) {
    const taskTemplate = createTaskTemplate(taskText, taskId);
    tasksContainer.insertAdjacentHTML('afterbegin', taskTemplate);
    addTaskToLocalStorage(taskText, taskId);
}

function createTaskTemplate(text, id) {
    return `
        <div class="task">
            <div class="task__title" data-id="${id}">
                ${text}
            </div>
            <a href="#" class="task__remove">&times;</a>
        </div>
    `
}

function onTaskContainerClick(e) {
    if (!e.target.classList.contains('task__remove')) return;
    const parent = e.target.closest('.task');
    const id = parent.querySelector('.task__title').dataset.id;
    parent.remove();
    deleteTaskFromLokalStorage(id);
}

function addTaskToLocalStorage(taskText, taskId) {
    let obj = localStorage.getItem('myTaskList');
    obj = obj ? JSON.parse(obj) : {};
    obj[taskId] = {
        id: taskId,
        text: taskText,
    };
    localStorage.setItem('myTaskList', JSON.stringify(obj));
}

function deleteTaskFromLokalStorage(id) {
    let obj = localStorage.getItem('myTaskList');
    obj = obj ? JSON.parse(obj) : {};
    delete obj[id];
    localStorage.setItem('myTaskList', JSON.stringify(obj));
}