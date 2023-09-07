import {
    addTask
} from './add-task';

const taskName = document.querySelector('[data-task-name]');
const taskDescription = document.querySelector('[data-task-description]');
const taskDate = document.querySelector('[data-task-date]');
const taskTime = document.querySelector('[data-task-time]');
const taskAddBtn = document.querySelector('[data-task-add]');
const form = document.querySelector('[data-form]');
const sortBtn = document.querySelector('[data-sort]');
const taskContainer = document.querySelector('[data-task-container]');

const random_id = `_${Math.random().toString(30).substring(2,17) + Math.random().toString(30).substring(2,17)}`;

taskAddBtn.addEventListener('click', () => {
    getTask(taskName.value, taskDescription.value, taskDate.value, taskTime.value);
    form.reset();
});

//Добавление задачи
function getTask(name, description, date, time) {
    let data;

    const tasksArray = [{
        name: `${name}`,
        description: `${description}`,
        date: `${date}`,
        time: `${time}`,
        id: `item ${random_id}`,
        completed: false
    }, ];

    localStorage.setItem(`item ${random_id}`, JSON.stringify(tasksArray[0]));

    data = JSON.parse(localStorage.getItem(`item ${random_id}`));

    addTask(data.name, data.description, data.date, data.time, `item ${random_id}`, data.completed);
}

//Отображение задач на странице
for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
        let data;
        data = JSON.parse(localStorage.getItem(key));
        addTask(data.name, data.description, data.date, data.time, key, data.completed);
    }
}

//Сортировка задач
sortBtn.addEventListener('click', () => {
    let dataArr = [];
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            let data;
            data = JSON.parse(localStorage.getItem(key));
            dataArr.push(data);
        }
    }
    const sortedDataArr = dataArr.sort((x, y) => {
        if (x.date < y.date) {
            return -1;
        }
        if (x.date > y.date) {
            return 1;
        }

        if (x.time < y.time) {
            return -1;
        }
        if (x.time > y.time) {
            return 1;
        }
        return 0;
    });

    taskContainer.innerHTML =
        `<li class="tasks__main-item">
        <h3 class="tasks__title">Задачи</h3>
        <button class="button button--small" data-sort type="button">Сортировать по дате</button>
     </li>`;

    sortedDataArr.forEach((elem) => {
        addTask(elem.name, elem.description, elem.date, elem.time, elem.id, elem.completed);
    });

    const taskDates = document.querySelectorAll('.tasks__date');
    const todayDate = new Date().toISOString().slice(0, 10);

    taskDates.forEach((date) => {
        const parent = date.closest('.tasks__item');
        const completedBtn = parent.querySelector('[data-completed]');
        if (date.innerText == todayDate && !completedBtn.classList.contains('tasks__button-complete-tick--checked')) {
            date.style.color = 'red';
            if (date.style.color == 'red') {
                const sibling = date.nextSibling;
                const nextSibling = sibling.nextSibling;
                nextSibling.style.color = 'red';
            } else {
                const sibling = date.nextSibling;
                const nextSibling = sibling.nextSibling;
                nextSibling.style.color = 'black';
            }
        } else {
            date.style.color = 'black';
        }
    });
});

//Пометка задачи как выполненной
window.addEventListener('click', (e) => {
    const target = e.target;
    if (target.hasAttribute('data-completed')) {
        target.classList.toggle('tasks__button-complete-tick--checked');
        const parent = target.closest('.tasks__item');
        const date = parent.querySelector('.tasks__date');
        const time = parent.querySelector('.tasks__time');
        let data;
        data = JSON.parse(localStorage.getItem(`${parent.id}`));
        if (target.classList.contains('tasks__button-complete-tick--checked')) {
            data.completed = true;
            date.style.color = 'black';
            time.style.color = 'black';
        } else {
            data.completed = false;
            date.style.color = 'red';
            time.style.color = 'red';
        }
        localStorage.setItem(`${parent.id}`, JSON.stringify(data));
    }
});

//Удаление задач
window.addEventListener('click', (e) => {
    const target = e.target;
    if (target.hasAttribute('data-delete')) {
        const parent = target.closest('.tasks__item');
        localStorage.removeItem(`${parent.id}`);
        taskContainer.removeChild(parent);
    }
});

//Изменение задачи
export function updateTask(id, name, description, date, time) {
    let data;
    data = JSON.parse(localStorage.getItem(`${id}`));
    data.name = name;
    data.description = description;
    data.date = date;
    data.time = time;
    localStorage.setItem(`${id}`, JSON.stringify(data));
}