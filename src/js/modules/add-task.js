const taskContainer = document.querySelector('[data-task-container]');
const taskTemplate = document.querySelector('#task-template').content
    .querySelector('.tasks__item');


export function addTask(taskName, taskDescr, taskDate, taskTime, id, completed) {
    const taskElement = taskTemplate.cloneNode(true);
    taskElement.querySelector('.tasks__title').innerText = taskName;
    taskElement.querySelector('.tasks__description').innerText = taskDescr;
    taskElement.querySelector('.tasks__date').innerText = taskDate;
    taskElement.querySelector('.tasks__time').innerText = taskTime;
    if (completed == true) {
        taskElement.querySelector('[data-completed]').classList.add('tasks__button-complete-tick--checked');
    } else {
        taskElement.querySelector('[data-completed]').classList.remove('tasks__button-complete-tick--checked');
    }
    taskElement.setAttribute('id', `${id}`);
    taskContainer.appendChild(taskElement);
}