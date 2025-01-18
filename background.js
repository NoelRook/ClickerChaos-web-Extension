// List of blocked websites (can be modified via storage)
let blockedSites = ["facebook.com", "youtube.com"];

chrome.storage.sync.get("blockedSites", (data) => {
  if (data.blockedSites) blockedSites = data.blockedSites;
});

// Listener for web requests
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    return { cancel: true }; // Block the request
  },
  {
    urls: blockedSites.map((site) => `*://*.${site}/*`), // Match patterns
  },
  ["blocking"]
);

// Listen for storage changes to update the block list
chrome.storage.onChanged.addListener((changes) => {
  if (changes.blockedSites) {
    blockedSites = changes.blockedSites.newValue;
  }
});
