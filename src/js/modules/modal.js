import {updateTask} from './localstorage'

const form = document.querySelector('[data-form-modal]');
const modal = document.querySelector('[data-modal]');
const closeBtn = document.querySelector('[data-close]');
const taskNameInput = document.querySelector('[data-task-name-modal]');
const taskDescriptionInput = document.querySelector('[data-task-description-modal]');
const taskDateInput = document.querySelector('[data-task-date-modal]');
const taskTimeInput = document.querySelector('[data-task-time-modal]');
const applyBtn = document.querySelector('[data-task-add-modal]');

closeBtn.addEventListener('click', onModalClose);

applyBtn.addEventListener('click', () => {
    modal.classList.add('modal--closed');
});

window.addEventListener('click', (e) => {
    const target = e.target;

    if (target.hasAttribute('data-change')) {
        openModal();

        const parent = target.closest('.tasks__item');
        const taskName = parent.querySelector('.tasks__title');
        const taskDescription = parent.querySelector('.tasks__description');
        const taskDate = parent.querySelector('.tasks__date');
        const taskTime = parent.querySelector('.tasks__time');

        taskNameInput.value = taskName.innerText;
        taskDescriptionInput.value = taskDescription.innerText;
        taskDateInput.value = taskDate.innerText;
        taskTimeInput.value = taskTime.innerText;

        taskNameInput.addEventListener('change', (e) => {
            const target = e.target;
            taskName.innerText = target.value;
            updateTask(parent.id, target.value, taskDescriptionInput.value, taskDateInput.value, taskTimeInput.value);
        });

        taskDescriptionInput.addEventListener('change', (e) => {
            const target = e.target;
            taskDescription.innerText = target.value;
            updateTask(parent.id, taskNameInput.value, target.value, taskDateInput.value, taskTimeInput.value);
        });

        taskDateInput.addEventListener('change', (e) => {
            const target = e.target;
            taskDate.innerText = target.value;
            updateTask(parent.id, taskNameInput.value, taskDescriptionInput.value, target.value, taskTimeInput.value);
        });

        taskTimeInput.addEventListener('change', (e) => {
            const target = e.target;
            taskTime.innerText = target.value;
            updateTask(parent.id, taskNameInput.value, taskDescriptionInput.value, taskDateInput.value, target.value);
        });
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
});

function openModal() {
    modal.classList.remove('modal--closed');
}

function onModalClose() {
    modal.classList.add('modal--closed');
    form.reset();
}

