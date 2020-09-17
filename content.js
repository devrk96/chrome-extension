chrome.runtime.onMessage.addListener((request) => {
  if (request.message === "fetch_current_url") {
    const currentUrl = location.href;
    const currentTitle = document.title;
    chrome.runtime.sendMessage({ "message": "updated_url", "url": currentUrl, title: currentTitle });
  }
}
);