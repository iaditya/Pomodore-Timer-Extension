const addTaskBtn = document.getElementById("add-task-btn");
let tasks = [];

addTaskBtn.addEventListener("click", () => addTask());

chrome.storage.sync.get(["tasks"], (resp) => {
  tasks = resp.tasks ? resp.tasks : [];
  renderTasks();
});

function saveTasks() {
  chrome.storage.sync.set({
    tasks,
  });
}

function renderTask(taskNum) {
  const taskRow = document.createElement("div");

  const text = document.createElement("input");
  text.type = "text";
  text.value = tasks[taskNum];
  text.placeholder = "Enter a task";
  text.addEventListener("change", () => {
    tasks[taskNum] = text.value;
    saveTasks();
  });

  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "X";
  deleteBtn.addEventListener("click", () => {
    removeTask(taskNum);
  });

  taskRow.appendChild(text);
  taskRow.appendChild(deleteBtn);

  const taskContainer = document.getElementById("task-container");
  taskContainer.appendChild(taskRow);
}

function addTask() {
  const taskNum = tasks.length;
  tasks.push("");
  renderTask(taskNum);
  saveTasks();
}

function removeTask(taskNum) {
  tasks.splice(taskNum, 1);
  saveTasks();
  renderTasks();
  console.log(tasks);
}

function renderTasks() {
  const taskContainer = document.getElementById("task-container");
  taskContainer.textContent = "";
  tasks.map((item, i) => {
    renderTask(i);
  });
}
