const saveBtn = document.getElementById("save-btn");
const timeOptionElement = document.getElementById("time-option");

chrome.storage.local.get(["timer", "isRunning", "timeOption"], (res) => {
  console.log("as", res.timeOption);
  timeOptionElement.value = res.timeOption;
});

//validation
timeOptionElement.addEventListener("change", (e) => {
  const val = e.target.value;
  if (val < 10 || val > 60) {
    timeOptionElement.value = 25;
  }
});

saveBtn.addEventListener("click", () => {
  let timeOption = timeOptionElement.value;

  chrome.storage.local.set({
    timeOption: timeOption,
    isRunning: false,
    timer: 0,
  });
});
