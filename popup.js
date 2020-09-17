document.getElementById("link").addEventListener("click", () => {
    // get the list element and create anchor tag 
    const linkContainer = document.getElementById("list");
    const newLink = document.createElement('a');

    // send message to background.js
    chrome.runtime.sendMessage({ message: "get_url" });

    // listen for message from content.js
    chrome.runtime.onMessage.addListener((request) => {
        if (request.message === "updated_url") {
            newLink.setAttribute('href', request.url);
            newLink.setAttribute('target', "_blank");
            newLink.innerText = request.title;

            // get the existing url and push the new link in the array
            chrome.storage.sync.get(['urlList'], function (result) {
                let updatedUrlList;
                const urlObject = { url: request.url, title: request.title };
                if (result.urlList && result.urlList.length > 0) {
                    updatedUrlList = result.urlList.concat([urlObject]);
                } else {
                    updatedUrlList = [urlObject];
                }

                // set the updated array in storage
                chrome.storage.sync.set({ 'urlList': updatedUrlList });
            });
        }
    }
    );

    newLink.href = "fetching...";
    linkContainer.appendChild(newLink);
});

// get data from storage to display existing urls
chrome.storage.sync.get(['urlList'], function (result) {
    const existingUrls = result.urlList;
    if (existingUrls && existingUrls.length > 0) {
        existingUrls.forEach(el => {
            const linkContainer = document.getElementById("list");
            const newLink = document.createElement('a');
            newLink.setAttribute('href', el.url);
            newLink.setAttribute('target', "_blank");
            newLink.innerText = el.title;
            linkContainer.appendChild(newLink);
        });
    }
});