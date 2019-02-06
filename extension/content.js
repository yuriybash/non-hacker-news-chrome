chrome.runtime.sendMessage({
    from: 'content',
    subject: 'showPageAction'
});

const DEFAULT_ELEM_STYLE = '';

const get_threshold = function (f_level) {return 0.1 * f_level};

function filter_hn_stories(filter_level) {

    let story_links = Array.prototype.slice.call(document.getElementsByClassName('storylink'));

    let titles_urls = story_links.map(function(story_link) {
        let title = story_link.text.replace(/[^a-zA-Z0-9 -]/, '').toLowerCase();
        let domain_parts = new URL(story_link.href).hostname.split(".");
        let domain = (domain_parts.length === 2) ? domain_parts[0] : domain_parts[1];
        return [title, domain]
    });

    chrome.runtime.sendMessage({
        from: "content",
        subject: "filter_request",
        data: titles_urls
    }, function(response) {

        const threshold = get_threshold(filter_level);
        let things = document.getElementsByClassName('athing');

        for (let i = 0; i < things.length; i++) {
            const style = (response[i][1] <= threshold) ? 'none' : DEFAULT_ELEM_STYLE;
            let thing = things[i], sib = things[i].nextElementSibling, next_sib = sib.nextElementSibling;

            [thing, sib, next_sib].forEach(function(elem){
                elem.style.display = style;
            })

        }
    });

}


chrome.runtime.onMessage.addListener(function(msg) {

    if(!(msg.from === 'popup')){
        return
    }

    if (msg.subject === 'filterHN') {
        filter_hn_stories(parseInt(msg.filter_level));
        return
    }

    if (msg.subject === 'reset') {
        let things = document.getElementsByClassName('athing');

        for(let thing of things){
            let sib = thing.nextElementSibling, next_sib = sib.nextElementSibling;
            thing.style.display = sib.style.display = next_sib.style.display = DEFAULT_ELEM_STYLE
        }

    }
});
