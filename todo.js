const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const doneList = document.getElementById("doneList");

// Cargar tareas guardadas en Local Storage al cargar la página
const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
savedTasks.forEach(task => {
    addTaskToList(task);
});

// Cargar tareas realizadas guardadas en Local Storage al cargar la página
const savedDoneTasks = JSON.parse(localStorage.getItem("doneTasks")) || [];
savedDoneTasks.forEach(task => {
    addDoneTaskToList(task);
});

addTaskButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        addTaskToList(taskText);
        taskInput.value = "";
        saveTasksToLocalStorage();
    }
});

function addTaskToList(taskText) {
    const li = document.createElement("li");
    li.textContent = taskText;
    li.addEventListener("click", () => {
        moveTaskToDone(li);
    });
    taskList.appendChild(li);

    Toastify({
        text: "Tarea añadida",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
}

function addDoneTaskToList(taskText) {
    const li = document.createElement("li");
    li.textContent = taskText;
    doneList.appendChild(li);
}

function moveTaskToDone(taskElement) {
    taskElement.removeEventListener("click", moveTaskToDone);
    taskList.removeChild(taskElement);
    addDoneTaskToList(taskElement.textContent);
    saveTasksToLocalStorage();
    saveDoneTasksToLocalStorage();
    Toastify({
        text: "Hecho",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
}

function saveTasksToLocalStorage() {
    const tasks = Array.from(taskList.children).map(li => li.textContent);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function saveDoneTasksToLocalStorage() {
    const doneTasks = Array.from(doneList.children).map(li => li.textContent);
    localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
}


const clearListButton = document.getElementById("clearList");

clearListButton.addEventListener("click", () => {
    clearTaskList();
    clearDoneList();
    localStorage.removeItem("tasks");
    localStorage.removeItem("doneTasks");
    Toastify({
        text: "Lista eliminada",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "rigth", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #FFCA00, #FF6752)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
});

function clearTaskList() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
}

function clearDoneList() {
    while (doneList.firstChild) {
        doneList.removeChild(doneList.firstChild);
    }
}


