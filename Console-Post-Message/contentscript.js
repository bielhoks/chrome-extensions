chrome.runtime.sendMessage({ greeting: "from_content_script" }, function (
  response
) {
  if (response.start == "response_from_background_script") {
    var script = document.createElement("script");
    script.innerHTML = `
      window["${response.datalayer}"].forEach(elem=>{
        window.postMessage({
          dataLayer:"dispatch_datalayer_object_from_window",
          datalayer_object:elem
        },"*");
      });


      if (!window["${response.datalayer}"].push_c) {
        window["${response.datalayer}"].push_c = window["${response.datalayer}"].push;
        window["${response.datalayer}"].push = function (obj) {
          window["${response.datalayer}"].push_c(obj);
          window.postMessage({
            dataLayer:"dispatch_datalayer_object_from_window",
            datalayer_object:obj
          },"*");
        }
    };`;
    document.head.appendChild(script);
  }
});

window.addEventListener("message", function (event) {
  // We only accept messages from ourselves
  // if (event.source != window)
  //     return;
  if (
    event.data.dataLayer &&
    event.data.dataLayer == "dispatch_datalayer_object_from_window"
  ) {
    //contexto da window
    console.log(
      "Content script received message: " +
        JSON.stringify(event.data.datalayer_object)
    );

    //manda mensagem de volta do contexto da window pra extensão
    chrome.runtime.sendMessage({
      datalayer_response: "accepted",
      datalayer_object: event.data.datalayer_object,
    });
  }
});
