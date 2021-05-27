chrome.alarms.create({
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  chrome.storage.local.get(["time", "isRunnning"], (result) => {
    const time = result.time ?? 0;
    const isRunnning = !!result.isRunnning;
    if (!isRunnning) {
      return;
    }
    chrome.storage.local.set({
      time: time + 1,
    });
    chrome.action.setBadgeText({
      text: `${time + 1}`,
    });

    chrome.storage.sync.get(["notificationTime"], (res) => {
      console.log("time is ", time);
      if (time != 0 && time % res.notificationTime == 0) {
        this.registration.showNotification("Chrome Timer Ext", {
          body: `${res.notificationTime} second has passed`,
          icon: "clock.png",
        });
      }
    });
  });
});

console.log("background page 1");
