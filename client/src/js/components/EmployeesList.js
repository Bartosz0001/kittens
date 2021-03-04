import { select, classNames } from '../settings.js';

class EmployeesList {
    constructor() {
        const thisList = this;

        thisList.getEmployees();
        thisList.createList();
        thisList.getSelectors();
        thisList.initSearch();
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
            console.log(thisList.allListItems);
            for(let listItem of thisList.allListItems) {
                listItem.classList.remove(classNames.others.active);
            }
            item.classList.add(classNames.others.active);
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
}

export default EmployeesList;