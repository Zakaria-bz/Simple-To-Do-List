const input = document.querySelector('#newtask input');
const pushBtn = document.querySelector('#push');
const tasksContainer = document.querySelector('#tasks');

document.addEventListener('DOMContentLoaded', loadTasks);

pushBtn.addEventListener('click', function () {

    const taskValue = input.value.trim();

    if (taskValue === "") {
        alert("Please Enter a Task");
        return;
    }

    createTask(taskValue);
    saveTask(taskValue);

    input.value = "";
});

function createTask(taskValue) {
    const task = document.createElement('div');
    task.classList.add('task');

    task.innerHTML = `
        <span class="taskname">${taskValue}</span>
        <button class="delete">
            <i class="far fa-trash-alt"></i>
        </button>
    `;

    tasksContainer.appendChild(task);
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        createTask(task);
    });
}


tasksContainer.addEventListener('click', function (e) {

    if (e.target.closest('.delete')) {
        const taskElement = e.target.closest('.task');
        const taskText = taskElement.querySelector('.taskname').innerText;

        removeTaskFromStorage(taskText);
        taskElement.remove();
    }

    if (e.target.closest('.task') && !e.target.closest('.delete')) {
        e.target.closest('.task').classList.toggle('completed');
    }
});


function removeTaskFromStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks = tasks.filter(task => task !== taskText);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}