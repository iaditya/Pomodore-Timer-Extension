const timeElement = document.getElementById("time");
const timerElement = document.getElementById("timer");
const nameElement = document.getElementById("name");

function updateTimeElemtns() {
  const currentTime = new Date().toLocaleTimeString();
  timeElement.textContent = `Current Time is : ${currentTime}`;

  chrome.storage.local.get(["time"], (result) => {
    const time = result.time ?? 0;
    timerElement.textContent = `The timer is at ${time + 1}`;
  });
}
updateTimeElemtns();
setInterval(updateTimeElemtns, 1000);

chrome.storage.sync.get(["name"], (result) => {
  const name = result.name ?? "????";
  nameElement.textContent = "Hello user - " + name;
});
