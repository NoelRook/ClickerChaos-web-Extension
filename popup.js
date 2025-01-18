// Load the saved states of the toggle switches from chrome.storage.sync
chrome.storage.sync.get(["extensionEnabled", "productiveMode", "blockedSites"], (data) => {
  const extensionToggle = document.getElementById("extensionToggle");
  const modeToggle = document.getElementById("modeToggle");
  const sitesTextarea = document.getElementById("sites");

  // Set initial state based on stored data
  extensionToggle.checked = data.extensionEnabled || false;
  modeToggle.checked = data.productiveMode || false;

  // Update the mode label based on the mode toggle
  const modeLabel = document.getElementById("modeLabel");
  modeLabel.textContent = modeToggle.checked ? "Productive Mode" : "Unproductive Mode";

  // Load the blocked sites into the textarea
  sitesTextarea.value = data.blockedSites ? data.blockedSites.join("\n") : "";

  // Disable the second toggle if the first toggle is off
  toggleModeControl(extensionToggle.checked);
});

// Save the state of the extension and mode toggle switches when changed
document.getElementById("extensionToggle").addEventListener("change", (event) => {
  const extensionEnabled = event.target.checked;
  chrome.storage.sync.set({ extensionEnabled });

  // Disable/enable the mode toggle based on the extension toggle state
  toggleModeControl(extensionEnabled);
});

document.getElementById("modeToggle").addEventListener("change", (event) => {
  const modeToggle = event.target;
  const modeLabel = document.getElementById("modeLabel");

  // Update the label based on the toggle state
  modeLabel.textContent = modeToggle.checked ? "Productive Mode" : "Unproductive Mode";

  // Save the mode state
  chrome.storage.sync.set({ productiveMode: modeToggle.checked });
});

// Save blocked sites when the "Save" button is clicked
document.getElementById("save").addEventListener("click", async () => {
  const sites = document.getElementById("sites").value
    .split("\n")
    .map((site) => site.trim())
    .filter((site) => site);

  // Save the blocked sites in storage
  await chrome.storage.sync.set({ blockedSites: sites });

  // Get the current extension state and mode
  const extensionEnabled = document.getElementById("extensionToggle").checked;
  const productiveMode = document.getElementById("modeToggle").checked;

  // Save extension state and mode
  await chrome.storage.sync.set({
    extensionEnabled: extensionEnabled,
    productiveMode: productiveMode
  });

  alert("Blocked sites updated!");
});

// Edit (Clear) the blocked sites when the "Edit" button is clicked
document.getElementById("clear").addEventListener("click", () => {
  chrome.storage.sync.remove("blockedSites");
  document.getElementById("sites").value = "";
  alert("Blocked sites cleared!");
});

// Function to disable/enable the mode toggle based on the extension toggle state
function toggleModeControl(isEnabled) {
  const modeToggle = document.getElementById("modeToggle");
  const modeLabel = document.getElementById("modeLabel");

  if (isEnabled) {
    modeToggle.disabled = false;
  } else {
    modeToggle.disabled = true;
    modeLabel.textContent = "Unproductive Mode"; // Reset label when extension is off
  }
}
