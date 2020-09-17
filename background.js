chrome.runtime.onMessage.addListener((request) => {
    if (request.message === "get_url") {
        // Send a message to the active tab
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var activeTab = tabs[0];
            if (activeTab) {
                chrome.tabs.sendMessage(activeTab.id, { "message": "fetch_current_url" });
            }
        });
    }
});