chrome.alarms.create("pomodoreTimer", {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "pomodoreTimer") {
    chrome.storage.local.get(["timer", "isRunning", "timeOption"], (res) => {
      if (res.isRunning) {
        let timeOption = res.timeOption;
        let timer = res.timer + 1;
        let isRunning = true;
        if (res.timer == timeOption * 60) {
          this.registration.showNotification("Chrome Timer Ext", {
            body: `${timeOption} minutes has passed.`,
            icon: "../clock.png",
          });
          timer = 0;
          isRunning = false;
        }
        chrome.storage.local.set({ timer, isRunning });
      }
    });
  }
});

//init data
chrome.storage.local.get(["timer", "isRunning", "timeOption"], (res) => {
  chrome.storage.local.set({
    timer: "timer" in res ? res.timer : 0,
    isRunning: "isRunning" in res ? res.isRunning : false,
    timeOption: "timeOption" in res ? res.timeOption : 25,
  });
});
