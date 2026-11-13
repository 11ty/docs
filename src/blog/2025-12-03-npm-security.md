---
newstitle: "Securely Publishing our Packages to npm"
eleventyNavigation:
  parent: Blog
blogHighlight: true
---
As we harden our release practices in the wake of numerous recent vulnerabilities in npm packages amongst high profile authors, it seems worthwhile to celebrate a major milestone for 11ty core and our official suite of plugins: _we are now npm Access Token-free!_

The `@11ty/*` ecosystem on npm is now fully migrated to [Trusted Publishers](https://docs.npmjs.com/trusted-publishers).

If you’re interested in taking steps to improve your own security footprint, you can read more about the steps we took at [_No more tokens! Locking down npm Publish Workflows_](https://www.zachleat.com/web/npm-security/)

<a href="https://www.zachleat.com/web/npm-security/" style="display: block; max-width: 16em;">{% getScreenshotHtml "No more tokens! Locking down npm Publish Workflows", "https://www.zachleat.com/web/npm-security/" %}</a>

## Dependency Watch

In this same vein, as a project Eleventy has continuously and relentlessly focused on reducing our dependency footprint. You may remember the latest Dependency Watch on our [v3.1.0 core release notes](https://github.com/11ty/eleventy/releases/tag/v3.1.0):

<table>
  <thead>
    <tr>
      <th>Version</th>
      <th>Production Dep Count</th>
      <th>Production Size</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>v3.1.0</td>
      <td>×142</td>
      <td>21.4 MB</td>
    </tr>
    <tr>
      <td>v3.0.0</td>
      <td>×187</td>
      <td>27.4 MB</td>
    </tr>
    <tr>
      <td>v2.0.1</td>
      <td>×215</td>
      <td>36.4 MB</td>
    </tr>
    <tr>
      <td>v1.0.2</td>
      <td>×356</td>
      <td>73.3 MB</td>
    </tr>
  </tbody>
</table>

Very astute observers may also be eyeing the [upcoming 4.0 canaries which include even more improvements to these numbers](https://www.zachleat.com/web/adventures-in-date-parsing/#a-new-challenger-appears)! v4.0.0-alpha.4 is **16.6 MB** with ×131 deps (with more improvements on the way)!
