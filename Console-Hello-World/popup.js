
function display_h1 (results){
  url=results;
  document.querySelector("#id1").innerHTML = "<p>Page Url: " + url ;
}
chrome.tabs.query({active: true}, function(tabs) {
  let tab = tabs[0];
  chrome.tabs.executeScript(tab.id, {
    file: './teste.js'
  }, display_h1);
});
