// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.



document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const errorMsg = document.getElementById('error-msg');
    const todoList = document.getElementById('todo-list');
    const counter = document.getElementById('counter');
    const filterAllBtn = document.getElementById('filter-all');
    const filterActiveBtn = document.getElementById('filter-active');
    const filterDoneBtn = document.getElementById('filter-done');


    let currentFilter = 'all';


    function updateCounter() {
        const activeCount = todoList.querySelectorAll('li:not(.completed)').length;
        counter.textContent = `${activeCount} item${activeCount === 1 ? '' : 's'} left`;
    }


    function applyFilter() {
        const items = todoList.querySelectorAll('li');
        items.forEach(item => {
            const isCompleted = item.classList.contains('completed');
            if (currentFilter === 'all') {
                item.style.display = '';
            } else if (currentFilter === 'active') {
                item.style.display = isCompleted ? 'none' : '';
            } else if (currentFilter === 'done') {
                item.style.display = isCompleted ? '' : 'none';
            }
        });
    }


    function handleAddItem(e) {
        e.preventDefault();
        const taskText = input.value.trim();


        if (!taskText) {
            errorMsg.style.display = 'block';
            return;
        }


        errorMsg.style.display = 'none';


        const li = document.createElement('li');

        const textSpan = document.createElement('span');
        textSpan.className = 'task-text';
        textSpan.textContent = taskText;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';

        li.appendChild(textSpan);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);


        input.value = '';


        applyFilter();
        updateCounter();
    }


    form.addEventListener('submit', handleAddItem);


    function handleListClick(e) {
        const target = e.target;


        if (target.classList.contains('delete-btn')) {
            const itemToDelete = target.closest('li');
            if (itemToDelete) {
                itemToDelete.remove();
                updateCounter();
            }
            return;
        }


        if (target.classList.contains('task-text') || target.tagName === 'LI') {
            const itemToToggle = target.closest('li');
            if (itemToToggle) {
                itemToToggle.classList.toggle('completed');
                applyFilter();
                updateCounter();
            }
        }
    }


    todoList.addEventListener('click', handleListClick);


    function setFilter(filterType) {
        currentFilter = filterType;
        applyFilter();
    }

    if (filterAllBtn) {
        filterAllBtn.addEventListener('click', () => setFilter('all'));
    }
    if (filterActiveBtn) {
        filterActiveBtn.addEventListener('click', () => setFilter('active'));
    }
    if (filterDoneBtn) {
        filterDoneBtn.addEventListener('click', () => setFilter('done'));
    }
});
