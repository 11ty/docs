---
newstitle: How We Use GitHub Issues and How That’s Changing
eleventyNavigation:
  parent: Blog
---
When new enhancement requests would come in to the [Eleventy repository](https://github.com/11ty/eleventy/issues/), our typical playbook would include the following:

1. Add a reply comment with the following:

> By default this repo closes new enhancement requests and places them in a queue for folks to upvote. We do this to avoid a build-up of open issues and got this idea from the lodash project
>
> Don’t forget to upvote the first comment with 👍 to register your vote! You can view [the current enhancement backlog](https://github.com/11ty/eleventy/issues?q=type%3A%22Vote%20Queue%22%20sort%3Areactions-%2B1-desc).

2. Add a `needs-votes` Label to the issue.
3. Close the issue.

This idea was via [Sam Selikoff](https://samselikoff.com/) on Twitter (_[Archived 2018 context](https://nitter.net/samselikoff/status/991395669016436736)_):

> Recently I noticed Lodash's repo had 0 open issues. As an OSS maintainer I found this fascinating because Lodash is tremendously popular, and keeping issues down is notoriously difficult.

This technique was **great** and served us well for many years for the primary reason that it communicated that [enhancement requests were classified as _secondary_](https://www.zachleat.com/web/eleventy-birthday/#close-all-feature-requests). But it also added a nice list of things that were a possible future for the project that community folks could _weigh in_ on.

However, it also caused some confusion too: issues were closed but unimplemented. “Is the queue considered open/quasi-open/closed?” “If I still want the feature, do I need to file it again?” Folks already participating on the issue when it was placed into the queue usually understood what was happening but new folks visiting the issue later via Search may have not seen the helpful explainer comment.

To make matters every so slightly worse, in [2022 when GitHub shipped **Issue Closed Reasons**](https://github.blog/changelog/2022-05-19-the-new-github-issues-may-19th-update/#%F0%9F%95%B5%F0%9F%8F%BD%E2%99%80%EF%B8%8F-issue-closed-reasons) they defaulted all existing closed issues as _Completed_. The only alternative reason was _Not planned_ which (to me) leaned closer towards _Definitely not_. I would have loved to see a _Yet to be Prioritized_ or an _Maybe, if enough folks upvote it!_ reason.

I’m very thankful to [uncenter](https://uncenter.dev/) who has gently pushed back with feedback on the above method (a few times 😅).

## Leaning into GitHub Discussions

After some very productive (in real life, what?) conversations with [Cory LaViska](https://www.abeautifulsite.net/) (who recently wrote an [excellent blog post on this exact topic](https://www.abeautifulsite.net/posts/how-i-use-git-hub-issues/)), it has become clear that perhaps GitHub Discussions ([generally available in 2024](https://github.blog/open-source/maintainers/create-a-home-for-your-community-with-github-discussions/)) would be a more appropriate mechanism moving forward. Cory expounds thusly:

> - Bug Report 👉 Issue
> - Help/support 👉 Discussion
> - Ask a question 👉 Discussion
> - Ideas/suggestions 👉 Discussion
> - Waxing Philosophical 👉 Discussion

Cory adds to the list later in the post:

> - Actionable Piece of Work (Milestoned Task) 👉 Issue

The nice thing about GitHub Discussions is that upvoting is a first-party user interface feature in the list view. The primary downside is that we’ll lose existing vote counts in the sorted list (they’re still accessible in the full entry): it’s a _level playing field moving into 2026_.

The other nice thing is that GitHub Issues becomes very focused to actionable work that goes into a release, not more imagination-based planning or fielding “How does this work?”-esque education requests.

Feel free to watch as the previous queue is converted to the new [**Eleventy Enhancement Queue**](https://github.com/11ty/eleventy/discussions/categories/enhancement-queue) (and leave your votes!).

Our new issue funnels on both [`eleventy`](https://github.com/11ty/eleventy/issues/new/choose) and [`11ty-website`](https://github.com/11ty/11ty-website/issues/new/choose) will help you find the right place to be!

Appreciate y’all!