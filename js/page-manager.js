// Cross Page Globals
var pageManager_ViewLoaders = {};
// getCookie - utils.js
// setCookie - utils.js

// Private
var pageManagerPrivate = {
    navLinks: {}
};

pageManagerPrivate.cacheNavLinks = function ()
{
    var navLinks = document.getElementById("navContent").getElementsByTagName("a");

    for (let navLink of navLinks)
    {
        pageManagerPrivate.navLinks[navLink.getAttributeNode("href").value.substr(1)] = navLink;
    }
}
/**
 * Adds " active" to the class name of any link on the navbar which links to the given fullHash. Also removes " active"
 * from the class name of any link on the navbar which does not link to the given full hash.
 * @param {string} fullHash
 */
pageManagerPrivate.setActiveNavLink = function (fullHash)
{
    for (var navLinkKey in pageManagerPrivate.navLinks)
    {
        var navLink = pageManagerPrivate.navLinks[navLinkKey];
        if (navLinkKey == fullHash)
        {
            if (navLink.classList.contains("active"))
            {
                navLink.classList.add("active");
            }
        }
        else
        {
            navLink.classList.remove("active");
        }
    }
}

/**
 * Loads all cached values required for the functions on this file (page-manager.js).
 */
function onPageLoad_PageManager()
{
    pageManagerPrivate.cacheNavLinks();
}

/**
 * Needs to be the last thing called on the page. Will load up the default view.
 */
function loadDefaultView()
{
    if (!location.hash)
    {
        var lastPageVisited = getCookie("lastPageVisited");
        if (!lastPageVisited)
        {
            location.hash = "#welcome";
        }
        else
        {
            location.hash = lastPageVisited;
        }
        
    }
    onHashChange();
}

/**
 * Is attached to the body element in the page. Handles the content changing on any link click.
 * # Cross Page Globals #
 * pageManager_PageLoaders - should be defined in the index.html
 */
function onHashChange()
{
    var fullHash = location.hash.substr(1);
    var hashSections = fullHash.split('/', 2);

    var loaderFunc = pageManager_ViewLoaders[hashSections[0]];
    if (!loaderFunc || typeof loaderFunc !== "function")
    {
        console.warn('no loader found for ' + fullHash);
        return;
    }

    // Everything below here has assumed that a loader has been found
    pageManagerPrivate.setActiveNavLink(fullHash);

    var mainElement = document.getElementById("mainContent");
    while (mainElement.firstChild) {
        mainElement.removeChild(mainElement.firstChild);
    }

    loaderFunc(hashSections[1]);
    
    setCookie("lastPageVisited", fullHash, 10);
}
