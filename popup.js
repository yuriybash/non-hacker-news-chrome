// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let changeColor = document.getElementById('changeColor');
let slider = document.getElementById('hn_tech_range');
let slider_value = document.getElementById('slider_output')

slider.oninput = function(){
    console.log("updating value");
    slider_value.innerHTML = this.value;
}



function filterComplete(info) {
    console.log("in filterComplete in popup.js")
}

changeColor.onclick = function(element){
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
            filterComplete);
    });
};
