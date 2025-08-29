// .eleventy.js
module.exports = function (eleventyConfig) {
  // Pass assets through
  eleventyConfig.addPassthroughCopy({ "assets": "assets" });

  // ✅ Add a simple startsWith filter for Nunjucks
  eleventyConfig.addNunjucksFilter("startsWith", (str, prefix) => {
    return (str || "").startsWith(prefix);
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    }
  };
  // Make BUILD_ID available in all templates as build
  return {
    dir: { input: "src", output: "_site", includes: "_includes" },
    // Global data
    dataTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    passthroughFileCopy: true,
    // Eleventy doesn’t have a direct "globalData" block; easiest is add
    // a global data file. But to keep it inline, do this:
  };
};