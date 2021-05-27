const timeElement = document.getElementById("time");
const timerElement = document.getElementById("timer");
const nameElement = document.getElementById("name");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

function updateTimeElemtns() {
  const currentTime = new Date().toLocaleTimeString();
  timeElement.textContent = `Current Time is : ${currentTime}`;

  chrome.storage.local.get(["time"], (result) => {
    const time = result.time ?? 0;
    timerElement.textContent = `The timer is at ${time} seconds`;
  });
}
updateTimeElemtns();
setInterval(updateTimeElemtns, 1000);

chrome.storage.sync.get(["name"], (result) => {
  const name = result.name ?? "????";
  nameElement.textContent = "Hello user - " + name;
});

startBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunnning: true,
  });
});

stopBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunnning: false,
  });
});

resetBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunnning: false,
    time: 0,
  });
});

console.log("popup page");
