I figured out how to have a Google Sheet be used as a data source to populate an Eleventy rendered page.  Once it is setup, you just need to edit the Google Sheet, run a bash script to download the Google Sheet JSON data, then run the Eleventy build.

1. Create a Google Sheet, publish it to the web, and expose it as JSON, using this article as a reference: [https://medium.com/@scottcents/how-to-convert-google-sheets-to-json-in-just-3-steps-228fe2c24e6](https://medium.com/@scottcents/how-to-convert-google-sheets-to-json-in-just-3-steps-228fe2c24e6)


![image](https://user-images.githubusercontent.com/11214905/93403024-fda66e80-f84b-11ea-921c-ba88a25e2a73.png)


2. Create a bash script to download the Google Sheet JSON and save it to the Eleventy site folder:
```
#!/bin/sh

# a shell script used to download links spreadsheet in json form

DIR=/www/my_site_folder

# wget output file
FILE=my_data.json

# wget log file
LOGFILE=wget.log

# wget download url
URL=spreadsheets.google.com/feeds/list/Your_Sheet_ID/od6/public/values?alt=json

cd $DIR
wget $URL -O $FILE -o $LOGFILE
```
3. Create an eleventyComputed.js file in the Eleventy data folder (Note, the Google Sheet JSON file is a nested object, so you should extract the `entry` object before passing to the Eleventy data array to reduce the data complexity in the page template)
```
module.exports = {
  eleventyComputed: {
    myData: data => {
      return data.my_data.feed.entry;
    }
  }
};
```
4. Create a page template that uses the `data.my_data` data (njk file example from Skeleventy repo).  This example assumes you have a Google Sheet with column header values of `Location`, `Name`, `Description`, `URL`. The JSON data presents the key values as all lowercase.  You can uncomment the `{{ myData | log }}` in the page template if you want to see the myData object in the console output during the build process.  You can also access the data.my_data object from the template if you want to use that method.)
```
---
layout: default
meta_title: sheetsdata
meta_description: Data from Google Sheets
body_class: sheetsdata
title: Data from Google Sheets
---

{# {{ myData | log }} #}

<main id="main" class="main inner flex flex-1 flex-col py-10 lg:py-20 focus:outline-none" tabindex="-1">

    <section id="container-centre" class="column centre flex-1">

        <h1 class="page-title">{{ title }}</h1>

        <div class="content">

            <p>Data from Google Sheets.</p>

            <ul class="mb-12 list-disc pl-4">
                {% for item in myData %}
                    <li>location: {{ item.gsx$location.$t }}, name: {{ item.gsx$name.$t }}, description: {{ item.gsx$description.$t }}, link: {{ item.gsx$url.$t }}</li>
                {% endfor %}
            </ul>

        </div>

    </section>

</main>
```
This example renders the Google Sheet data on the page as follows:
```
* location: USA, name: TECI blog, description: Description1, link: Link
* location: USA, name: Name2, description: Description2, link: Link2
* location: Japan, name: Name3, description: Description3, link: Link3

```
