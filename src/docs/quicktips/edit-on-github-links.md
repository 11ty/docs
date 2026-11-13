---
tiptitle: "Add Edit on GitHub Links to All Pages"
date: 2018-06-08
---

It’s nice to be able to instantly edit your HTML on GitHub when you spot an error or an improvement you can make. Why not facilitate this by adding an _Edit this page on GitHub_ link to every page? You can see an example of this on our page footer.

## Use a Layout File

Make sure you’re using a Layout file so that you can add these to a single place and have the links applied to all of your pages.

- [Read more about Layouts](/docs/layouts/)

Here’s a sample:

```html
    …
    <footer>
      © 2019 Eleventy
    </footer>
  </body>
</html>
```

## Add your link!

Edit your layout file to add the link. Provide the URL to the base of your repo and use the Eleventy provided {% raw %}`{{ page.inputPath }}`{% endraw %} variable to point to the correct input file. Yes, this will also work with paginated templates.

{% raw %}

```html
    …
    <footer>
      © 2019 Eleventy
      <a href="https://github.com/11ty/docs/blob/main/{{ page.inputPath }}">Edit this page on GitHub</a>
    </footer>
  </body>
</html>
```

{% endraw %}

That’s it!
