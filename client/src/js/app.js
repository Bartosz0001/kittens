import { select, classNames } from './settings.js';
import CatBox from './components/CatBox.js';
import EmployeesList from './components/EmployeesList.js';
import TaskTemplate from './components/TaskTemplate.js';

const app = {
    initPages: function() {
        const thisApp = this;

        thisApp.pages = document.querySelector(select.containerOf.pages).children;
        thisApp.navLinks = document.querySelectorAll(select.nav.links);

        const idFromHash = window.location.hash.replace('#/', '');
        let pageMatchingHash = thisApp.pages[0].id;

        for(let page of thisApp.pages) {
            if(page.id === idFromHash) {
                pageMatchingHash = page.id;
                break;
            }
        }

        thisApp.activatePage(pageMatchingHash);

        for(let link of thisApp.navLinks) {
            link.addEventListener('click', function(event) {
                const clickedElement = this;
                event.preventDefault();

                const id = clickedElement.getAttribute('href').replace('#', '');
                thisApp.activatePage(id);
                window.location.hash = '#/' + id;
            });
        }
    },

    activatePage: function(pageId) {
        const thisApp = this;

        for(let page of thisApp.pages) {
            page.classList.toggle(classNames.pages.active, page.id === pageId);
        }

        for(let link of thisApp.navLinks) {
            link.classList.toggle(classNames.nav.active, link.getAttribute('href') === '#' + pageId);
        }
    },

    initData: async function(amount) {
        const thisApp = this;
        thisApp.data = [];
        const url = `https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=${amount}`;
        await fetch(url)
        .then(response => response.json())
        .then(data => thisApp.data = data);
        thisApp.initCatBoxes();
    },

    initCatBoxes: function() {
        const thisApp = this;

        const catList = document.querySelector(select.containerOf.catList);

        while(catList.firstChild) {
            catList.removeChild(catList.firstChild);
        }

        if(thisApp.data.length) { //thisApp.data is an array
            for(let item of thisApp.data) {
                new CatBox(item);
            }
        } else { //thisApp.data is an object
            new CatBox(thisApp.data);
        }
    },

    initEmployeesList: function() {
        new EmployeesList();
    },

    initClickableTriggers: function() {
        const thisApp = this;

        const inputCatAmount = document.querySelector(select.others.inputCatAmount);
        const inputMsg = document.querySelector(select.others.inputMsg);
        const searchBtn = document.querySelector(select.others.searchBtn);
        const sortDateUp = document.querySelector(select.others.sortDateUp);
        const sortDateDown = document.querySelector(select.others.sortDateDown);
        const sortIdUp = document.querySelector(select.others.sortIdUp);
        const sortIdDown = document.querySelector(select.others.sortIdDown);
        const reloadBtn = document.querySelector(select.others.reloadBtn);
        const employeeBtn = document.querySelector(select.others.employeeBtn);
        const employeeList = document.querySelector(select.containerOf.employeeList);
        const addTaskBtn = document.querySelector(select.others.addTaskBtn);

        inputCatAmount.addEventListener('change', function() {
            if(inputCatAmount.value < 1 || isNaN(inputCatAmount.value)) {
                inputCatAmount.classList.add(classNames.menu.error);
                inputMsg.classList.add(classNames.menu.error);
            }
            else {
                inputCatAmount.classList.remove(classNames.menu.error);
                inputMsg.classList.remove(classNames.menu.error);
                inputCatAmount.classList.add(classNames.menu.valid);
            }
        });

        searchBtn.addEventListener('click', function(event) {
            event.preventDefault();
            if(inputCatAmount.value > 0 && !isNaN(inputCatAmount.value)) {
                thisApp.initData(inputCatAmount.value);
            }
        });

        sortDateUp.addEventListener('click', function(event) {
            event.preventDefault();
            if(thisApp.data.length) {
                thisApp.data = thisApp.data.sort(compareDate);
                thisApp.initCatBoxes();
            }
        });

        sortDateDown.addEventListener('click', function(event) {
            event.preventDefault();
            if(thisApp.data.length) {
                thisApp.data = thisApp.data.sort(compareDate).reverse();
                thisApp.initCatBoxes();
            }
        });

        sortIdUp.addEventListener('click', function(event) {
            event.preventDefault();
            if(thisApp.data.length) {
                thisApp.data = thisApp.data.sort(compareId);
                thisApp.initCatBoxes();
            }
        });

        sortIdDown.addEventListener('click', function(event) {
            event.preventDefault();
            if(thisApp.data.length) {
                thisApp.data = thisApp.data.sort(compareId).reverse();
                thisApp.initCatBoxes();
            }
        });

        reloadBtn.addEventListener('click', function(event) {
            event.preventDefault();
            if(thisApp.data.length) thisApp.initData(thisApp.data.length);
            else thisApp.initData(1);
        });

        function compareDate(a, b) {
            a = a.createdAt.substr(0,10).split('-').join('');
            b = b.createdAt.substr(0,10).split('-').join('');
            a = parseInt(a);
            b = parseInt(b);
            let comparsion = 0;
            if(a < b) comparsion = -1;
            else if(a > b) comparsion = 1;
            return comparsion;
        }

        function compareId(a, b) {
            a = a._id;
            b = b._id;
            let comparsion = 0;
            if(a > b) comparsion = 1;
            else if(a < b) comparsion = -1;
            return comparsion;
        }

        employeeBtn.addEventListener('click', function(event) {
            event.preventDefault();
            employeeList.classList.toggle(classNames.list.active);
        });

        addTaskBtn.addEventListener('click', function(event) {
            event.preventDefault();
        });
    },

    loadTasksFromLocalStorage() {
        const thisApp = this;

        if(localStorage.getItem('localTasksList')) thisApp.localTasksList = JSON.parse(localStorage.getItem("localTasksList"));

        for(let task of thisApp.localTasksList) {
            new TaskTemplate(task);
        }
    },

    init: function() {
        const thisApp = this;

        thisApp.initPages();
        thisApp.initData(30);
        thisApp.initEmployeesList();
        thisApp.loadTasksFromLocalStorage();
        thisApp.initClickableTriggers();
    }
};

app.init();