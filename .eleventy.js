// .eleventy.js
const pluginRss = require("@11ty/eleventy-plugin-rss");
module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  // Pass assets through
  eleventyConfig.addPassthroughCopy({ "assets": "assets" });

  // ✅ Add a simple startsWith filter for Nunjucks
  eleventyConfig.addNunjucksFilter("startsWith", (str, prefix) => {
    return (str || "").startsWith(prefix);
  });

  // ✅ Add site metadata (for canonical, etc.)
  eleventyConfig.addGlobalData("site", {
    url: "https://bitcurrents.net",
    name: "BitCurrents"
  });

  // ✅ Ensure BrowserSync doesn’t rewrite canonical links in dev
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, bs) {
        bs.addMiddleware("*", (req, res) => {
          res.writeHead(302, { location: "https://bitcurrents.net" + req.url });
          res.end();
        });
      }
    }
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    },
    dataTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    passthroughFileCopy: true
  };
};