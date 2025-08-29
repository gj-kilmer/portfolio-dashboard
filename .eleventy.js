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
};