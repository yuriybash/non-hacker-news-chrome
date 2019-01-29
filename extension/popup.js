'use strict';

let filter_button = document.getElementById('filter');
let reset_button = document.getElementById('reset');
let slider = document.getElementById('hn_tech_range');
let slider_value = document.getElementById('slider_output');

slider.oninput = function() {
    slider_value.innerHTML = this.value;
};

filter_button.onclick = function(element) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {

        const filter_level = document.getElementById('hn_tech_range').value;

        chrome.tabs.sendMessage(
            tabs[0].id, {
                from: 'popup',
                subject: 'filterHN',
                filter_level: filter_level
            },
        );
    });
};

reset_button.onclick = function(element) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {

        chrome.tabs.sendMessage(
            tabs[0].id, {
                from: 'popup',
                subject: 'reset'
            },
        );
    });
};
