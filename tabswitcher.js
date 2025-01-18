let isSwitching = true; // Always starts as active by default

// Function to switch to a random tab
function switchToRandomTab() {
  chrome.tabs.query({}, (tabs) => {
    if (tabs.length > 1) {
      const randomIndex = Math.floor(Math.random() * tabs.length);
      chrome.tabs.update(tabs[randomIndex].id, { active: true });
    }
  });

  // Set a random interval between 10 seconds and 1 minute
  const randomInterval = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
  console.log(`Next switch in ${randomInterval / 1000} seconds`);

  // Schedule the next switch
  setTimeout(() => {
    if (isSwitching) {
      switchToRandomTab();
    }
  }, randomInterval);
}

// Start the random tab switching immediately when the extension loads
chrome.runtime.onInstalled.addListener(() => {
  console.log("Random Tab Switching Started by default");
  switchToRandomTab();
});
