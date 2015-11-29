var parent = chrome.contextMenus.create(
	{"title": chrome.i18n.getMessage("msgContMenuTranslate"), 
	"contexts":["selection"],
    "onclick": cmTranslateClick})

parent = chrome.contextMenus.create(
	{"title": chrome.i18n.getMessage("msgContMenuOpenLink"), 
	"contexts":["link"],
	"onclick": cmOpenLink})

function cmTranslateClick(info, tab) {
	alert(translate(info.selectionText))
}

function cmOpenLink(info, tab) {
    var newTabUrl = info.linkUrl.toString();
    newTabUrl = unescape(newTabUrl)

    var vkStart = "http://vk.com/away.php";

    if (newTabUrl.indexOf(vkStart) == 0)
    {
    	newTabUrl = newTabUrl.replace(vkStart, "")
    	var indOfEq = newTabUrl.indexOf("http")
    	var indOfAmp = newTabUrl.lastIndexOf("&")

    	if (indOfAmp === -1 || indOfAmp < indOfEq)
    		indOfAmp = newTabUrl.length

    	newTabUrl = newTabUrl.substring(indOfEq, indOfAmp)
		newTabUrl = newTabUrl
    }

    var args = {
        url:newTabUrl
    }
    chrome.tabs.create(args)
}

function translate(txt) {
	var eng = "$^&qwertyuiop[]asdfghjkl;'zxcvbnm,./QWERTYUIOP{}ASDFGHJKL:\"ZXCVBNM<>?";
	var rus = ";:?йцукенгшщзхъфывапролджэячсмитьбю.ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ,";
	
	var resStr = ""

	// Determine type of conversion: ru->en or en->ru.
	var engSymb = 0
	for (var i = 0; i < txt.length; i++) {
		if (eng.indexOf(txt.charAt(i)) !== -1)
			engSymb++
	}

	// Converting symbols.
	var engToRus = engSymb >= (txt.length - engSymb)
	var orgAlph = engToRus ? eng : rus
	var newAlph = engToRus ? rus : eng
	for (var i = 0; i < txt.length; i++) {
		var index = orgAlph.indexOf(txt.charAt(i))
		resStr += index == -1 ? txt[i] : newAlph[index]
	}
	
	return resStr
}



