const pluginNavigation = require('@11ty/eleventy-navigation')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const filters = require('./utils/filters')
const transforms = require('./utils/transforms')
const shortcodes = require('./utils/shortcodes')

module.exports = function (eleventyConfig) {
  // Watch this folder
  eleventyConfig.addWatchTarget('./src/_assets')

  // Delay, wait for webpack rebuild
  eleventyConfig.setWatchThrottleWaitTime(150)

  // Layouts
  eleventyConfig.addLayoutAlias('base', 'base.njk')

  // Pass-through files.
  eleventyConfig.setServerPassthroughCopyBehavior('copy')
  eleventyConfig.addPassthroughCopy({ './src/_assets/public': 'public' })

  // Plugins.
  eleventyConfig.addPlugin(pluginNavigation)
  eleventyConfig.addPlugin(pluginRss)
  eleventyConfig.addPlugin(pluginSyntaxHighlight)

  // Filters
  Object.keys(filters).forEach(name => {
    eleventyConfig.addFilter(name, filters[name])
  })

  // Transforms
  Object.keys(transforms).forEach(name => {
    eleventyConfig.addTransform(name, transforms[name])
  })

  // Shortcodes
  Object.keys(shortcodes).forEach(name => {
    eleventyConfig.addNunjucksAsyncShortcode(name, shortcodes[name])
  })

  // Eleventy config
  return {
    templateFormats: ['md', 'njk'],
    dir: {
      input: 'src',
      output: 'dist',
      includes: '_includes',
      layouts: '_layouts',
      data: '_data',
    },
  }
}
