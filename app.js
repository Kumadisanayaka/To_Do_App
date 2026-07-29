let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let taskInput = document.getElementById("taskInput");
let addbtn = document.getElementById("addbtn");
let taskList = document.getElementById("taskList");

let editIndex = null;

displayTasks();
addbtn.addEventListener("click", function () {

    let taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    let task = {
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

    tasks.forEach((task, index) => {
        taskList.innerHTML += `
            <li>
                <span>
                    ${task.completed ? "✅" : "☐"}
                    ${task.text}
                </span>
                <button onclick="deleteTask(${index})">Delete</button>
                <button onclick="completedTask(${index})">Completed</button>
                <button onclick="editTask(${index})">Edit</button>
            </li>
            
        `;

    });
}

function completedTask(index) {
    tasks[index].completed = !tasks[index].completed;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
}

function editTask(index) {
    let task = tasks[index];

    taskInput.value = task.text;

    editIndex = index;

    addbtn.textContent = "Update";
}

