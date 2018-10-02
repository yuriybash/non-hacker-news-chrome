'use strict';

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  // First, validate the message's structure
  if ((msg.from === 'content') && (msg.subject === 'showPageAction')) {
    // Enable the page-action for the requesting tab
    console.log("showing page action");
    chrome.pageAction.show(sender.tab.id);
  } else if((msg.from === 'content') && (msg.subject === 'filter_request')) {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "https://si6k7q7byd.execute-api.us-east-1.amazonaws.com/dev");
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xmlhttp.onreadystatechange = function() { // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        let predictions = JSON.parse(this.responseText)['prediction'];
        sendResponse(predictions);
      }
    };
    xmlhttp.send(JSON.stringify({"data": msg.data}));

  }
  return true;
});
