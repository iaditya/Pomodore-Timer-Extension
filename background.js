chrome.alarms.create("pomodoreTimer", {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "pomodoreTimer") {
    chrome.storage.local.get(["timer", "isRunning"], (res) => {
      if (res.isRunning) {
        let timer = res.timer + 1;
        let isRunning = true;
        if (res.timer == 25 * 60) {
          this.registration.showNotification("Chrome Timer Ext", {
            body: `25 minutes has passed.`,
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

chrome.storage.local.get(["timer", "isRunning"], (res) => {
  chrome.storage.local.set({
    timer: "timer" in res ? res.timer : 0,
    isRunning: "isRunning" in res ? res.isRunning : false,
  });
});
