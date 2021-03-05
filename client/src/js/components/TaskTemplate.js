import { select } from '../settings.js';

class TaskTemplate {
    constructor(task) {
        const thisTask = this;

        thisTask.task = task;
        thisTask.tasksList = document.querySelector(select.containerOf.tasksList);
        const item = document.createElement('li');
        item.classList.add('task');
        item.innerHTML = `
            <i class="fas fa-check-circle check-icon"></i>
            <div class='bin-icon'>
                <img src='https://cdn.pixabay.com/photo/2020/02/24/07/16/dust-bin-4875414_1280.png' alt='bin' />
            </div>
            <div class='task-image'>
                <img src='/img/${thisTask.task.image}' alt='man' />
            </div>
            <div class='task-description'>
                <h1 class='task-author'>${thisTask.task.author}</h1>
                <h2 class='task-date'>${thisTask.task.date}</h2>
                <h3 class='task-content'>${thisTask.task.task}</h3>
            </div>
        `;
        thisTask.tasksList.appendChild(item);
    }
}

export default TaskTemplate;