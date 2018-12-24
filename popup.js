'use strict';

let filter_button = document.getElementById('filter');
let reset_button = document.getElementById('reset');
let slider = document.getElementById('hn_tech_range');
let slider_value = document.getElementById('slider_output')

slider.oninput = function(){
    slider_value.innerHTML = this.value;
}

filter_button.onclick = function(element){
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {

        let filter_level = document.getElementById('hn_tech_range').value;

        // ...and send a request for the DOM info...
        chrome.tabs.sendMessage(
            tabs[0].id,
            {from: 'popup', subject: 'filterHN', filter_level: filter_level},
            // ...also specifying a callback to be called
            //    from the receiving end (content script)
            );
    });
};

reset_button.onclick = function(element){
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {


        chrome.tabs.sendMessage(
            tabs[0].id,
            {from: 'popup', subject: 'reset'},
            );
    });
};
