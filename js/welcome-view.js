// Cross Page Globals
// pageManager_ViewLoaders - Defined in page-manager.js

// Globals

function loadView_welcome(hashRemainder)
{
    var header = document.createElement("h1");
    header.innerText = "Hello! Welcome to my app!";

    var contentDiv = document.createElement("div");
    contentDiv.className = "container";
    contentDiv.appendChild(header);

    document.getElementById("mainContent").appendChild(contentDiv);
}

function onPageLoad_WelcomeView()
{
    pageManager_ViewLoaders["welcome"] = loadView_welcome;
}
