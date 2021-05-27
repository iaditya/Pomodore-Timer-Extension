const inputElement = document.getElementById("input-name");
const inputTimer = document.getElementById("input-timer");
const saveBtn = document.getElementById("save-btn");

saveBtn.addEventListener("click", (e) => {
  const name = inputElement.value;
  const notificationTime = inputTimer.value;
  chrome.storage.sync.set({
    name,
    notificationTime,
  });
});

chrome.storage.sync.get(["name", "notificationTime"], (result) => {
  inputElement.value = result.name ?? "????";
  inputTimer.value = result.notificationTime ?? 1000;
});

console.log("options page");
