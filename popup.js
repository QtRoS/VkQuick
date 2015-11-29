function clickEvent() {
    var args = {
        url:"https://vk.com/" + this.id
    }
    chrome.tabs.create(args)
}

function mouseOverEvent() {
    this.style.backgroundColor = "#ddd"
    this.style.borderColor = "#ccc"
    this.style.color = "white"
}

function mouseOutEvent() {
    this.style.backgroundColor = "white"
    this.style.borderColor = "white"
    this.style.color = "black"
}

/* Returns translator function.
 */
function getTranslator() {
    /* Loading i18n sttrings.
     */
    var strArr = [
        { "id" : "im",       "i18n" : chrome.i18n.getMessage("msgIm") },
        { "id" : "audio",    "i18n" : chrome.i18n.getMessage("msgAudio") },
        { "id" : "video",    "i18n" : chrome.i18n.getMessage("msgVideo") },
        { "id" : "friends",  "i18n" : chrome.i18n.getMessage("msgFriends") },
        { "id" : "docs",     "i18n" : chrome.i18n.getMessage("msgDocs") },
        { "id" : "feed",     "i18n" : chrome.i18n.getMessage("msgFeed") },
        { "id" : "fave",     "i18n" : chrome.i18n.getMessage("msgFave") },
        { "id" : "settings", "i18n" : chrome.i18n.getMessage("msgOptions") }
    ]

    return function(div) {
        for (var j = 0; j < strArr.length; j++) {
            if (strArr[j].id == div.id)
                return strArr[j].i18n                
        }
    } 
}

document.addEventListener('DOMContentLoaded', function() {
    /* Find all divs and set events.
     */
    var divs = document.getElementsByTagName("div");
    for (var i = 0; i < divs.length; i++) {
        divs[i].onmouseover = mouseOverEvent
        divs[i].onmouseout = mouseOutEvent
        divs[i].onclick = clickEvent
    }

    var translator = getTranslator()

    /* Update span's text according to locale.
     */
    var spans = document.getElementsByTagName("span")
    for (var i = 0; i < spans.length; i++) {
        spans[i].innerHTML = translator(spans[i].parentNode) || spans[i].innerHTML
    }
});

