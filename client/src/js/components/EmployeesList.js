import { select, classNames } from '../settings.js';

import AddTask from './AddTask.js';

class EmployeesList {
    constructor() {
        const thisList = this;

        thisList.getEmployees();
        thisList.createList();
        thisList.getSelectors();
        thisList.initSearch();
        thisList.addTaskListener();
    }

    getEmployees() {
        const thisList = this;

        thisList.employees = [
            {
                id: 1,
                name: 'Adam Nowak',
                image: 'avatar01.jpeg',
            },
            {
                id: 2,
                name: 'Michał Potoczek',
                image: 'avatar02.jpeg',
            },
            {
                id: 3,
                name: 'Antoni Worek',
                image: 'avatar03.jpeg',
            },
        ];
    }

    getSelectors() {
        const thisList = this;

        thisList.employeeSearchInput = document.querySelector(select.others.employeeSearchInput);
        thisList.allListItems = document.querySelector(select.containerOf.employeeList).children;
        thisList.addTaskBtn = document.querySelector(select.others.addTaskBtn);
        thisList.newTask = document.querySelector(select.others.newTask);
    }

    createList() {
        const thisList = this;

        thisList.list = document.querySelector(select.containerOf.employeeList);

        const searchElem = document.createElement('li');
        searchElem.innerHTML = `<input type='text' placeholder='Szukaj' class='employee-search-input' />`;
        thisList.list.appendChild(searchElem);

        for(let employee of thisList.employees) {
            const elem = document.createElement('li');
            elem.setAttribute('id', 'listItem' + employee.id);
            elem.innerHTML = `
            <div class='employee-box'>
                <div class='employee-image'>
                    <img src='/img/${employee.image}' alt='man' />
                </div>
                <div class='employee-name'>${employee.name}</div>
                <i class="fas fa-check active-icon"></i>
            </div>
            `;
            thisList.initClickableTrigger(elem);
            thisList.list.appendChild(elem);
        }
    }

    initClickableTrigger(item) {
        const thisList = this;

        item.addEventListener('click', function() {
            for(let listItem of thisList.allListItems) {
                listItem.classList.remove(classNames.others.active);
            }
            item.classList.add(classNames.others.active);
            for(let employee of thisList.employees) {
                if(employee.id == item.id.replace('listItem', '')) thisList.chosenEmployee = employee;
            }
        });
    }

    initSearch() {
        const thisList = this;

        thisList.employeeSearchInput.oninput = handleSearch;

        function handleSearch() {
            for(let employee of thisList.employees) {
                const elem = document.getElementById('listItem' + employee.id);
                if(elem) elem.classList.add(classNames.others.hide);

                if(employee.name.toLowerCase().includes(thisList.employeeSearchInput.value)) {
                    elem.classList.remove(classNames.others.hide);
                }
            }
        }
    }

    addTaskListener() {
        const thisList = this;

        thisList.addTaskBtn.addEventListener('click', function(event) {
            event.preventDefault();
            if(thisList.newTask.value.length > 1 && thisList.chosenEmployee) {
                new AddTask(thisList.chosenEmployee, thisList.newTask.value);
            }
            else alert('Nie wybrano pracownika lub treść zadania ma mniej niż 2 znaki');
        })
    }
}

export default EmployeesList;