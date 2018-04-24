'use strict';

const predictor_endpoint = "https://si6k7q7byd.execute-api.us-east-1.amazonaws.com/dev";

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if ((msg.from === 'content') && (msg.subject === 'showPageAction')) {
    chrome.pageAction.show(sender.tab.id);
  } else if((msg.from === 'content') && (msg.subject === 'filter_request')) {

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", predictor_endpoint);
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

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

  if(!(msg.from === 'content')){
    return undefined;
  }

  if (msg.subject === 'showPageAction') {
    chrome.pageAction.show(sender.tab.id);
  } else if(msg.subject === 'filter_request'){

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", predictor_endpoint);
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
