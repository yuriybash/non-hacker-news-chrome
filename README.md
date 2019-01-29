## Non-Hacker News

[Hacker News](https://news.ycombinator.com) is one of the best news sources for technology-related content, particularly because none of it is dumbed down - the signal-to-noise ratio is very high.

But the non-technical news on it is also excellent. Here are two examples:

- [Economic Analysis of Medicare-for-All](https://news.ycombinator.com/item?id=18613722)
- [The 9.9 Percent Is the New American Aristocracy](https://news.ycombinator.com/item?id=17172546)

These are pieces of serious long-form analysis and journalism, respectively. They are the opposite of clickbait.

Many of my non-technical friends would be interested in reading these two pieces, but because the majority of content on HN _is_ technical, they don't use the site.

That's where Non-Hacker News comes in.

I trained a [classifier model](https://github.com/yuriybash/non-hacker-news/tree/master/models) to separate technical and non-technical posts. The details of that implementation can be found in [this](https://github.com/yuriybash/non-hacker-news) repo. This repo holds the Chrome extension code.

### Usage

NHN is available as a Chrome extension, and it allows you to choose the aggressiveness with which posts are filtered - a filter level of 1 means no technical posts are filtered, while a filter level of 10 means all technical posts are filtered.

A user-configurable filter level is crucial because there is a large grey area. Examples:

- [FaceTime bug lets you hear audio of person you are calling before they pick up ](https://news.ycombinator.com/item?id=19022353)
- [	Uber Fires More Than 20 Employees in Harassment Probe](https://news.ycombinator.com/item?id=14499294)

These are technology-_related_ articles but not technical in nature. User-configurable filter levels allow users to decide what they prefer to read. The model returns predicted probabilities (rather than 0/1), which allows for this type of of usage. 

### Demo

![Demo](https://github.com/yuriybash/non-hacker-news/raw/master/non_hn_news_preview.gif)
