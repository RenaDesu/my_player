const taskDates = document.querySelectorAll('.tasks__date');
const todayDate = new Date().toISOString().slice(0, 10);

if ('Notification' in window) {

    if (Notification.permission === 'granted') {
        notify();
    } else {
        Notification.requestPermission().then((res) => {
            if (res === 'granted') {
                notify();
            } else if (res === 'denied') {
                console.log('Доступ к уведомлениям отклонен');
            } else if (res === 'default') {
                console.log('Разрешение на уведомления не получено');
            }
        })
    }

} else {
    console.error('Уведомления не поддерживаются');
}

function notify() {
    taskDates.forEach((date) => {
        const parent = date.closest('.tasks__item');
        const completedBtn = parent.querySelector('[data-completed]');
        if (date.innerText == todayDate && !completedBtn.classList.contains('tasks__button-complete-tick--checked')) {
            new Notification('Внимание!', {
                body: 'Срок вашей задачи подошел, загляните в приложение ToDo',
                icon: 'https://cdn-icons-png.flaticon.com/512/3248/3248093.png',
            });
        }
    });
}

function setNotificationColor() {
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
}

setNotificationColor();