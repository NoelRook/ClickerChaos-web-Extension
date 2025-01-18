// Load the saved state of the extension toggle from chrome.storage.sync
chrome.storage.sync.get(["extensionEnabled", "blockedSites"], (data) => {
  const extensionToggle = document.getElementById("extensionToggle");
  const sitesTextarea = document.getElementById("sites");

  // Set initial state based on stored data
  extensionToggle.checked = data.extensionEnabled || false;

  // Load the blocked sites into the textarea
  sitesTextarea.value = data.blockedSites ? data.blockedSites.join("\n") : "";

  // Disable the second toggle (Productive Mode) if the extension is off
  toggleModeControl(extensionToggle.checked);
});

// Save the state of the extension toggle switch when changed
document.getElementById("extensionToggle").addEventListener("change", (event) => {
  const extensionEnabled = event.target.checked;

  // Save the extension toggle state
  chrome.storage.sync.set({ extensionEnabled });

  // Disable/enable the block mode based on the extension toggle state
  toggleModeControl(extensionEnabled);
});

// Save blocked sites when the "Save" button is clicked
document.getElementById("save").addEventListener("click", async () => {
  const sites = document.getElementById("sites").value
    .split("\n")
    .map((site) => site.trim())
    .filter((site) => site);

  // Save the blocked sites in storage
  await chrome.storage.sync.set({ blockedSites: sites });

  alert("Blocked sites updated!");
});

// // Edit (Clear) the blocked sites when the "Edit" button is clicked
// document.getElementById("clear").addEventListener("click", () => {
//   chrome.storage.sync.remove("blockedSites");
//   document.getElementById("sites").value = "";
//   alert("Blocked sites cleared!");
// });

// Function to disable/enable the mode toggle based on the extension toggle state
function toggleModeControl(isEnabled) {
  // If the extension is turned off, disable further interaction.
  // This function can be used for any future toggles that rely on the extension being enabled.
}
