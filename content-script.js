let power = false;

const observer = new MutationObserver(function (mutations, mutationInstance) {
    if (!power) {
        return
    }
    if (!document.location.href.startsWith("https://www.youtube.com/shorts/")) {
        return;
    }
    if (!document.getElementById("shorts-container")) {
        return;
    }

    const player_containers = document.getElementsByClassName("player-container");
    for (const player_container of player_containers) {
        if (player_container.style.backgroundImage || player_container.parentNode.hasAttribute("is-active")) {
            const custom_player = document.createElement('div');
            custom_player.setAttribute("class", "custom_player");
            custom_player.style.borderRadius = "10px";
            custom_player.style.overflow = "hidden";
            custom_player.style.zIndex = "1";
            custom_player.style.width = player_container.offsetWidth + "px";
            custom_player.style.height = player_container.offsetHeight + "px";
            custom_player.style.backgroundImage = player_container.style.backgroundImage;
            custom_player.style.backgroundSize = "cover";
            player_container.parentNode.replaceChildren(custom_player); return custom_player;
        }
    };

    const custom_players = document.getElementsByClassName("custom_player");
    for (const custom_player of custom_players) {
        if (custom_player.parentNode.hasAttribute("is-active")) {
            if (!custom_player.hasChildNodes()) {
                const video_id = document.location.href.substring(31);
                const youtube_embed = document.createElement('iframe');
                youtube_embed.setAttribute("src", "https://www.youtube.com/embed/" + video_id + '?&autoplay=1&loop=1');
                youtube_embed.setAttribute("allow", "autoplay");
                youtube_embed.style.width = custom_player.offsetWidth + "px";
                youtube_embed.style.height = custom_player.offsetHeight + "px";
                custom_player.replaceChildren(youtube_embed);
            }
        } else {
            custom_player.replaceChildren();
        }
    }
});

chrome.storage.local.get("power").then((result) => {
    if (!result) {
        chrome.storage.local.set({ "power": true }).then(() => {
            power = true;
        });
    } else {
        power = result.power;
    }
    observer.observe(document, { childList: true, subtree: true });
});

