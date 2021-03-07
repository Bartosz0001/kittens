import { select, classNames } from '../settings.js';
import TaskData from './TaskData.js';
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

        new TaskData(localData);
    }
}

export default AddTask;