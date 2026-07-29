let tasks = [];

let taskInput = document.getElementById("taskInput");
let addbtn = document.getElementById("addbtn");
let taskList = document.getElementById("taskList");

addbtn.addEventListener("click", function () {
    let task = {
        text: taskInput.value,
        completed: false
    };

    tasks.push(task)

    displayTasks();
})

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        taskList.innerHTML += `
            <li>${task.text}</li>
        `;

    });
}