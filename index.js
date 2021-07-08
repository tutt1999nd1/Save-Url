document.getElementById("current_url").innerHTML = window.location.toString();
chrome.tabs.getSelected(null, function(tab) {
    myFunction(tab.url);
});

function myFunction(tablink) {
    // do stuff here
    document.getElementById("current_url").innerHTML = tablink;
    document.getElementById("current_url").innerHTML = tablink;
    document.getElementById("current_url").innerHTML = tablink;
}