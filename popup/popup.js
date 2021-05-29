const addTaskBtn = document.getElementById("add-task-btn");
const startTimerBtn = document.getElementById("start-timer-btn");
const resetTimerBtn = document.getElementById("reset-timer-btn");
const timerText = document.getElementById("time");
let tasks = [];

updateTime();
chrome.storage.local.get(["isRunning"], (res) => {
  startTimerBtn.textContent = !res.isRunning ? "Start Timer" : "Pause Timer";
});

setInterval(updateTime, 1000);

function updateTime() {
  chrome.storage.local.get(["timer", "isRunning"], (res) => {
    const minutes = `${25 - Math.ceil(res.timer / 60)}`.padStart(2, 0);
    let seconds = "00";
    if (res.timer % 60 != 0) {
      seconds = `${60 - Math.ceil(res.timer % 60)}`.padStart(2, 0);
    }
    timerText.textContent = `${minutes}:${seconds}`;
  });
}

addTaskBtn.addEventListener("click", () => addTask());

resetTimerBtn.addEventListener("click", () => {
  chrome.storage.local.set({ timer: 0, isRunning: false }, () => {
    startTimerBtn.textContent = "Start Timer";
  });
});

startTimerBtn.addEventListener("click", () => {
  chrome.storage.local.get(["isRunning"], (res) => {
    let isRunning = !res.isRunning;
    chrome.storage.local.set({ isRunning }, () => {
      startTimerBtn.textContent = !isRunning ? "Start Timer" : "Pause Timer";
    });
  });
});

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
