When the data is merged in the {% if page.url != "/docs/data-cascade/" %}[Eleventy Data Cascade](/docs/data-cascade/){% else %}Eleventy Data Cascade{% endif %}, the order of priority for sources of data is (from highest priority to lowest):

1. [Computed Data](/docs/data-computed/){% if page.url == "/docs/data-computed/" %} ⬅{% endif %}
1. [Front Matter Data in a Template](/docs/data-frontmatter/){% if page.url == "/docs/data-frontmatter/" %} ⬅{% endif %}
1. [Template Data Files](/docs/data-template-dir/){% if page.url == "/docs/data-template-dir/" %} ⬅{% endif %}
1. [Directory Data Files (and ascending Parent Directories)](/docs/data-template-dir/){% if page.url == "/docs/data-template-dir/" %} ⬅{% endif %}
1. [Front Matter Data in Layouts](/docs/layouts/#front-matter-data-in-layouts) _(this [moved in 1.0](https://github.com/11ty/buildawesome/issues/915))_{% if page.url == "/docs/layouts/" %} ⬅{% endif %}
1. [Configuration API Global Data](/docs/data-global-custom/){% if page.url == "/docs/data-global-custom/" %} ⬅{% endif %}
1. [Global Data Files](/docs/data-global/){% if page.url == "/docs/data-global/" %} ⬅{% endif %}
