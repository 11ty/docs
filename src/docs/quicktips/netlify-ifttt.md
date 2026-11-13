---
tiptitle: "Trigger a Netlify Build Every Day"
date: 2019-02-01
---

In [Quick Tip #007](/docs/quicktips/eliminate-js/) we talked about migrating away from using a Client-side third-party JavaScript widget to display GitHub stargazer counts and towards a Data fetched at Build time approach.

Updating this data at build time means that the data isn’t necessarily “live” (although the counts are likely cached at by at least one of the upstream dependencies of this widget, with a frequency that is out of your control).

I’m comfortable with these numbers being a little delayed (more than the JS widget method was) and with this new approach I get more control over the frequency of updates BUT I do probably want to run the build at least once a day. To do this, I used an [IFTTT](https://ifttt.com/) applet to trigger my Netlify build to run every morning using [Netlify’s Build Hooks](https://docs.netlify.com/configure-builds/build-hooks/).

Many other services also provide build hooks and/or scheduled builds!

_Heavily inspired by [Phil Hawksworth’s work on RSS Jamstack]({{ "https://twitter.com/philhawksworth/status/1038067638369443840" | canonicalTwitterUrl }})._

## <span class="numberflag"><span class="sr-only">Step</span> 1</span> Create a Build Hook

1. Go into your [Netlify](https://app.netlify.com/) site’s `Build & Deploy` settings
2. Select `Continuous Deployment`
3. Add a `Build hook`
4. Name it `Deploy every day` (or whatever you’d like)
5. I selected the `main` branch for my site.
6. Save this and it will provide you with a long URL a la `https://api.netlify.com/build_hooks/SOME_ID_HERE`. This is the URL you want.

## <span class="numberflag"><span class="sr-only">Step</span> 2</span> Schedule the Hook Trigger

Here are a few options to trigger your build hook:

- Use [cron-job.org](https://cron-job.org/) to dynamically trigger your build hook.
- Use [IFTTT](https://ifttt.com/) (mini-tutorial below).

## Mini-Tutorials

### IFTTT

1. Go to [`New Applet` on ifttt.com](https://ifttt.com/create)
2. Click `+this`
3. Select the `Date & Time` service
4. Select the `Every day at` option (or whatever frequency you’d like)
5. Select the time you’d like the build to run.
6. Click `+that`
7. Select the `Webhooks` service
8. Select the `Make a web request` option
9. For the URL field, use the Build Hook URL you’ve already retrieved from Netlify.
10. For the Method field, choose `POST`.
11. For the Content Type field, choose `application/x-www-form-urlencoded`.
12. For the Body field, type `{}`.
13. Click the `Create action` button.
14. Click `Finish`.
