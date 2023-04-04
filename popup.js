function load() {
    chrome.storage.local.get("power").then((result) => {
        if (!result) {
            chrome.storage.local.set({ "power": true });
        }

        document.getElementById("svg").style.fill = result.power ? "white" : "black";
    });

    document.getElementById("switch").addEventListener("click", () => {
        chrome.storage.local.get("power").then((result) => {
            chrome.storage.local.set({ "power": !result.power }).then(() => {
                document.getElementById("svg").style.fill = !result.power ? "white" : "black";
            });
        });
    })
}

load();