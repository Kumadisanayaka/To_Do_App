let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let taskInput = document.getElementById("taskInput");
let addbtn = document.getElementById("addbtn");
let taskList = document.getElementById("taskList");


addbtn.addEventListener("click", function () {

    let taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    let task = {
        text: taskText,
        completed: false
    };

    tasks.push(task)

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();

    taskInput.value = "";
})

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        taskList.innerHTML += `
            <li>${task.text}</li>
        `;

    });
}

