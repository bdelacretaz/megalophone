module.exports = function (eleventyConfig) {

  const rawResources = [
    "src/_images/**",
    "src/_js/**",
    "src/_css/**",
    "htaccess"
  ];
  rawResources.forEach(path => {
    console.log('IGNORE', path);
    eleventyConfig.ignores.add(path);
    eleventyConfig.addPassthroughCopy(path);
  });

  return {
    dir: {
      input: './src',
      data: '../_data',
      includes: '../_includes'
    }
  }
}

