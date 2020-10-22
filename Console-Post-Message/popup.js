// Não está sendo usada a function pois o script não retorna nada.

//vai pro bowser
chrome.tabs.query({active: true}, function(tabs) {
  let tab = tabs[0];
  chrome.tabs.executeScript(tab.id, {
    file: './contentscript.js'
  });
});

//vai também pro bowser
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  //intercepta mensagens que venham do runtime do chrome
if (request.greeting == "from_content_script") {
  sendResponse({
    start: "response_from_background_script",
    datalayer: "dataLayer",
  });
}
});

//esse não
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
 if (request.datalayer_response == "accepted") {
    console.log(request.datalayer_object);
  }
});



