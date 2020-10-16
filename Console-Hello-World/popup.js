// Não está sendo usada a function pois o script não retorna nada.
function display_h1 (results){
  console.log(results);
}

chrome.tabs.query({active: true}, function(tabs) {
  let tab = tabs[0];
  chrome.tabs.executeScript(tab.id, {
    file: './teste.js'
  }, display_h1);
});
