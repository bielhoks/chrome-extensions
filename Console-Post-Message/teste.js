// Cria um elemento do tipo script no html da pagina, e esse script modifica o objeto window.

var script = document.createElement("script");
script.innerHTML = "window.bowserTeste = { text: 'Hello'}";
document.head.appendChild(script);