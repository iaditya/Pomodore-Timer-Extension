console.log("hello from service worker");

let time = 0;

chrome.alarms.create({
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  chrome.storage.local.get(["time"], (result) => {
    const time = result.time ?? 0;
    chrome.storage.local.set({
      time: time + 1,
    });
    chrome.action.setBadgeText({
      text: `${time + 1}`,
    });

    chrome.storage.sync.get(["notificationTime"], (res) => {
      if (time % res.notificationTime == 0) {
        this.registration.showNotification("Chrome Timer Ext", {
          body: `${res.notificationTime} second has passed`,
          icon: "clock.png",
        });
      }
    });
  });
});
