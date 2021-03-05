import { select } from '../settings.js';
import TaskTemplate from './TaskTemplate.js';

class AddTask {
    constructor(author, task) {
        const thisTask = this;

        thisTask.author = author;
        thisTask.task = task;
        thisTask.getSelectors();
        thisTask.getDate();
        thisTask.render();
    }

    getSelectors() {
        const thisTask = this;

        thisTask.tasksList = document.querySelector(select.containerOf.tasksList);
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

    render() {
        const thisTask = this;

        const localData = {
            author: thisTask.author.name,
            image: thisTask.author.image,
            date: thisTask.date,
            task: thisTask.task,
        };

        new TaskTemplate(localData);

        if(localStorage.getItem('localTasksList')) thisTask.localTasksList = JSON.parse(localStorage.getItem("localTasksList"));
        else thisTask.localTasksList = [];

        thisTask.localTasksList.push(localData);
        localStorage.setItem('localTasksList', JSON.stringify(thisTask.localTasksList));
    }
}

export default AddTask;