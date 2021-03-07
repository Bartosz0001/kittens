import { select, classNames } from '../settings.js';
import TaskTemplate from './TaskTemplate.js';

class AddTask {
    constructor(author, task) {
        const thisTask = this;

        thisTask.author = author;
        thisTask.task = task;
        thisTask.getDate();
        thisTask.generateId();
        thisTask.render();
    }

    getDate() {
        const thisTask = this;

        const d = new Date();
        const day = fixDate(d.getDate());
        const month = fixDate(d.getMonth()+1);
        const year = fixDate(d.getFullYear());

        thisTask.date = '' + day + '.' + month + '.' + year;

        function fixDate(digits) {
            if(digits < 10) return '0' + digits;
            else return digits;
        }
    }

    generateId() {
        const thisTask = this;

        thisTask.id = '';
        for(let i = 0; i<4; i++) {
            const rand = Math.floor(Math.random() * 10000);
            thisTask.id = thisTask.id + rand + '-';
        }
        thisTask.id = thisTask.id + '0000';
    }

    render() {
        const thisTask = this;

        const localData = {
            id: thisTask.id,
            author: thisTask.author.name,
            image: thisTask.author.image,
            date: thisTask.date,
            task: thisTask.task,
            done: false,
        };

        new TaskTemplate(localData);

        if(localStorage.getItem('localTasksList')) thisTask.localTasksList = JSON.parse(localStorage.getItem("localTasksList"));
        else thisTask.localTasksList = [];

        thisTask.localTasksList.push(localData);
        localStorage.setItem('localTasksList', JSON.stringify(thisTask.localTasksList));

        const newTask = document.getElementById('task' + thisTask.id);
        const checkBtns = document.querySelectorAll(select.others.checkBtns);
        const deleteBtns = document.querySelectorAll(select.others.deleteBtns);

        for(let checkBtn of checkBtns) {
            if(checkBtn.parentElement.id === newTask.id)
            checkBtn.addEventListener('click', function() {
                checkBtn.classList.add(classNames.others.done);
                const list = JSON.parse(localStorage.getItem("localTasksList"));
                list.find(element => element.id === checkBtn.parentElement.id.replace('task', '')).done = true;
                localStorage.setItem('localTasksList', JSON.stringify(list));
                thisTask.countTasks();
            });
        }

        const tasksList = document.querySelector(select.containerOf.tasksList);
        const allTasks = document.querySelector(select.others.allTasks);
        const completedTasks = document.querySelector(select.others.completedTasks);
        const uncompletedTasks = document.querySelector(select.others.uncompletedTasks);
        const tasks  = document.querySelectorAll(select.others.tasks);

        thisTask.countTasks();

        for(let deleteBtn of deleteBtns) {
            if(deleteBtn.parentElement.id === newTask.id) {
                deleteBtn.addEventListener('click', function() {
                    const list = JSON.parse(localStorage.getItem("localTasksList"));
                    const parent = deleteBtn.parentElement;
                    tasksList.removeChild(parent);
                    list.splice(list.indexOf(list.find(element => element.id === parent.id.replace('task', ''))), 1);
                    localStorage.setItem('localTasksList', JSON.stringify(list));
                    thisTask.countTasks();
                });
            }
        }

        allTasks.addEventListener('click', function(event) {
            event.preventDefault();
            for(let task of tasks) {
                task.classList.remove(classNames.others.hide);
            }
        });

        completedTasks.addEventListener('click', function(event) {
            event.preventDefault();
            for(let checkBtn of checkBtns) {
                const task = checkBtn.parentElement;
                if(checkBtn.classList.contains(classNames.others.done)) task.classList.remove(classNames.others.hide);
                else task.classList.add(classNames.others.hide);
            }
        });

        uncompletedTasks.addEventListener('click', function(event) {
            event.preventDefault();
            for(let checkBtn of checkBtns) {
                const task = checkBtn.parentElement;
                if(checkBtn.classList.contains(classNames.others.done)) task.classList.add(classNames.others.hide);
                else task.classList.remove(classNames.others.hide);
            }
        });
    }

    countTasks() {
        const allTasksData = document.querySelector(select.others.allTasksData);
        const completedTasksData = document.querySelector(select.others.completedTasksData);
        const uncompletedTasksData = document.querySelector(select.others.uncompletedTasksData);
        const tasks  = document.querySelectorAll(select.others.tasks);
        const checkBtns = document.querySelectorAll(select.others.checkBtns);

        allTasksData.innerHTML = tasks.length;
        let checkedBtnsLength = 0;
        for(let checkBtn of checkBtns) {
            if(checkBtn.classList.contains(classNames.others.done)) checkedBtnsLength++;
        }
        completedTasksData.innerHTML = checkedBtnsLength;
        uncompletedTasksData.innerHTML = tasks.length - checkedBtnsLength;
    }
}

export default AddTask;