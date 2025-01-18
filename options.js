// Load blocked sites
chrome.storage.sync.get("blockedSites", (data) => {
  const textarea = document.getElementById("sites");
  textarea.value = data.blockedSites ? data.blockedSites.join("\n") : "";
});

// Save and update block rules
document.getElementById("save").addEventListener("click", async () => {
  const sites = document.getElementById("sites").value
    .split("\n")
    .map((site) => site.trim())
    .filter((site) => site);

  // Save the sites in storage
  await chrome.storage.sync.set({ blockedSites: sites });

  // Convert sites to declarativeNetRequest rules
  const rules = sites.map((site, index) => ({
    id: index + 1,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: `*://*.${site}/*`,
      resourceTypes: ["main_frame"]
    }
  }));

  // Update declarativeNetRequest rules dynamically
  chrome.declarativeNetRequest.updateDynamicRules(
    {
      removeRuleIds: rules.map((rule) => rule.id),
      addRules: rules
    },
    () => {
      alert("Blocked sites updated!");
    }
  );
});
