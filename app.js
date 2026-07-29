let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let taskInput = document.getElementById("taskInput");
let addbtn = document.getElementById("addbtn");
let taskList = document.getElementById("taskList");

let allbtn = document.getElementById("allbtn");
let pendingbtn = document.getElementById("pendingbtn");
let completedbtn = document.getElementById("completedbtn");

let editIndex = null;

let currentFilter = "all";

displayTasks();

allbtn.addEventListener("click",function(){
    currentFilter = "all";

    allbtn.classList.add("active");
    pendingbtn.classList.remove("active");
    completedbtn.classList.remove("active");

    displayTasks();

});

pendingbtn.addEventListener("click",function(){
    currentFilter = "pending";

    allbtn.classList.remove("active");
    pendingbtn.classList.add("active");
    completedbtn.classList.remove("active");

    displayTasks();
});

completedbtn.addEventListener("click",function(){
    currentFilter = "completed";

    allbtn.classList.remove("active");
    pendingbtn.classList.remove("active");
    completedbtn.classList.add("active");

    displayTasks();
});

addbtn.addEventListener("click", function () {

    let taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    let task = {
        id: editIndex === null ? Date.now() : tasks[editIndex].id,
        text: taskText,
        completed: editIndex === null ? false : tasks[editIndex].completed
    };

    if (editIndex === null) {

        tasks.push(task);

    } else {

        tasks[editIndex] = task;

        editIndex = null;

        addbtn.textContent = "Add";
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();

    taskInput.value = "";
});

function displayTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "pending") {

        filteredTasks = tasks.filter(task => {
            return task.completed === false;
        });

    } else if (currentFilter === "completed") {

        filteredTasks = tasks.filter(task => {
            return task.completed === true;
        });

    }

    filteredTasks.forEach(task => {

        taskList.innerHTML += `
            <li>
                <span>
                    ${task.completed ? "✅" : "☐"}
                    ${task.text}
                </span>

                <button onclick="deleteTask(${task.id})">
                    Delete
                </button>

                <button onclick="completedTask(${task.id})">
                    ${task.completed ? "Undo" : "Complete"}
                </button>

                <button onclick="editTask(${task.id})">
                    Edit
                </button>
            </li>
        `;
    });
}

function completedTask(id) {

    let index = tasks.findIndex(task => task.id === id);

    tasks[index].completed = !tasks[index].completed;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
}

function deleteTask(id) {
    let index = tasks.findIndex(task => task.id === id);

    tasks.splice(index,1);

    localStorage.setItem("tasks",JSON.stringify(tasks));

    displayTasks();
}

function editTask(id) {

    let index = tasks.findIndex(task => task.id === id);

    let task = tasks[index];

    taskInput.value = task.text;

    editIndex = index;

    addbtn.textContent = "Update";
}



