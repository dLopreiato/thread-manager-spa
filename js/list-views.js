// Cross Page Globals
// pageManager_ViewLoaders - Defined in page-manager.js

// Globals

function loadView_list(hashRemainder)
{
    console.log(hashRemainder);
}

function onPageLoad_ListViews()
{
    pageManager_ViewLoaders["list"] = loadView_list;
}
