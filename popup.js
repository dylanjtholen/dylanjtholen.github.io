function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}
var warningDiv = document.getElementById("warning");
var redirectSite = "https://www.google.com"; function openBackup() { var tab = window.open('about:blank', '_blank'); tab.document.documentElement.innerHTML = '<!DOCTYPE html><html><head><title>Classes</title><link rel="icon" type="image/png" href="https://ssl.gstatic.com/classroom/favicon.png"><style>body {margin:0;overflow:hidden}</style></head><body><iframe width="100%" height="100%" src="' + window.location.href + '" frameborder="0"></iframe></body></html>'; tab.document.close(); window.location.replace(redirectSite); }
if (!inIframe()) {
warningDiv.style.display = ("block");
openBackup();
}