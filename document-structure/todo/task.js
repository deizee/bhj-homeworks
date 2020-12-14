const addButton = document.getElementById('tasks__add');
const input = document.getElementById('task__input');
const tasksContainer = document.getElementById('tasks__list');
const taskList = [];

document.addEventListener('DOMContentLoaded', onLoad);
addButton.addEventListener('click', onAddBtnClick);
tasksContainer.addEventListener('click', onTaskContainerClick);

function onLoad() {
    let list = localStorage.getItem('myTaskList');
    list = list ? JSON.parse(list) : [];
    list.forEach(el => {
        const taskTemplate = createTaskTemplate(el);
        tasksContainer.insertAdjacentHTML('afterbegin', taskTemplate);
    })
}

function onAddBtnClick(e) {
    e.preventDefault();
    if (!input.value) return;
    addTack(input.value);
    input.value = '';
}

function addTack(taskText) {
    const taskTemplate = createTaskTemplate(taskText);
    tasksContainer.insertAdjacentHTML('afterbegin', taskTemplate);
    addTaskToLocalStorage(taskText);
}

function createTaskTemplate(text) {
    return `
        <div class="task">
            <div class="task__title"">
                ${text}
            </div>
            <a href="#" class="task__remove">&times;</a>
        </div>
    `
}

function onTaskContainerClick(e) {
    if (!e.target.classList.contains('task__remove')) return;
    const parent = e.target.closest('.task');
    const taskText = parent.querySelector('.task__title').innerText;
    parent.remove();
    deleteTaskFromLoсalStorage(taskText);
}

function addTaskToLocalStorage(taskText) {
    let list = localStorage.getItem('myTaskList');
    list = list ? JSON.parse(list) : [];
    list.push(taskText);
    localStorage.setItem('myTaskList', JSON.stringify(list));
}

function deleteTaskFromLoсalStorage(taskText) {
    let list = localStorage.getItem('myTaskList');
    list = list ? JSON.parse(list) : [];
    list = list.filter(item => { 
        return item !== taskText;
    });
    localStorage.setItem('myTaskList', JSON.stringify(list));
}