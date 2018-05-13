chrome.runtime.sendMessage({
    from: 'content',
    subject: 'showPageAction'
});

function get_threshold(filter_level) {
    /*
        Obtained via previous regression
     */
    return 0.03354 * filter_level - 0.06227
}

function filter_hn_stories(filter_level) {

    let story_links = Array.prototype.slice.call(document.getElementsByClassName('storylink'));
    let titles_urls = story_links.map(function(story_link) {

        let title = story_link.text.replace(/[^a-zA-Z0-9 -]/, '').toLowerCase();
        let domain_parts = new URL(story_link.href).hostname.split(".");
        if (domain_parts.length === 2) {
            return [title, domain_parts[0]]
        } else {
            return [title, domain_parts[1]]
        }
    });

    chrome.runtime.sendMessage({
        from: "content",
        subject: "filter_request",
        data: titles_urls
    }, function(response) {

        const threshold = get_threshold(filter_level);
        let things = document.getElementsByClassName('athing');

        for (let i = 0; i < things.length; i++) {
            if (response[i][1] <= threshold) {
                things[i].style.display = 'none'
            }
        }
    });

}


chrome.runtime.onMessage.addListener(function(msg, sender, response) {
    if (msg.from === 'popup') {
        if (msg.subject === 'filterHN') {
            filter_hn_stories(parseInt(msg.filter_level));
        } else if (msg.subject === 'reset') {
            let things = document.getElementsByClassName('athing');
            for (let i = 0; i < things.length; i++) {
                things[i].style.display = ''
            }
        }
    }
});
