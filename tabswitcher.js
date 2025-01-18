chrome.runtime.onInstalled.addListener(() => {
    console.log("Annoying Tab Switcher extension installed.");
    setInterval(switchTabs, 300000); // Switch tabs every 1 second
  });
  
  function switchTabs() {
    chrome.tabs.query({}, (tabs) => {
      const randomIndex = Math.floor(Math.random() * tabs.length);
      chrome.tabs.update(tabs[randomIndex].id, { active: true });
    });
  }