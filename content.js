// Inform the background page that
// this tab should have a page-action
chrome.runtime.sendMessage({
    from: 'content',
    subject: 'showPageAction'
});


function filter_hn_stories(filter_level){

    let story_links = Array.prototype.slice.call(document.getElementsByClassName('storylink'));
    let titles_urls = story_links.map(function(story_link){

        let title = story_link.text.replace(/[^a-zA-Z0-9 -]/, '').toLowerCase();
        let domain_parts = new URL(story_link.href).hostname.split(".");
        if(domain_parts.length === 2){
            return [title, domain_parts[0]]
        } else{
            return [title, domain_parts[1]]
        }
    });

    chrome.runtime.sendMessage({from: "content", subject: "filter_request", data: titles_urls}, function(response) {
        console.log("in content.js, response: ");
        console.log(response);

        let threshold = 0.03354*filter_level-0.06227

        let things = document.getElementsByClassName('athing')
        for(var i = 0; i < things.length; i++){
            if(response[i][1] <= threshold){
                things[i].style.display= 'none'
            }
        }
    });

}


// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
    // First, validate the message's structure
    if ((msg.from === 'popup') && (msg.subject === 'filterHN')) {
        filter_hn_stories(parseInt(msg.filter_level));

        // Directly respond to the sender (popup),
        // through the specified callback */
        // response("response from content.js");
    }
});
