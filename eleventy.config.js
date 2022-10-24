const pluginNavigation = require('@11ty/eleventy-navigation')
const pluginPurgeCss = require('eleventy-plugin-purgecss')
const filters = require('./utils/filters')
const transforms = require('./utils/transforms')

module.exports = function (eleventyConfig) {
  // Watch this folder
  eleventyConfig.addWatchTarget('./src/_assets')

  // Delay, wait for webpack rebuild
  eleventyConfig.setWatchThrottleWaitTime(100)

  // Layouts
  eleventyConfig.addLayoutAlias('base', 'base.njk')

  // Pass-through files.
  eleventyConfig.setServerPassthroughCopyBehavior('copy')
  eleventyConfig.addPassthroughCopy({ './src/_assets/public': 'public' })
  eleventyConfig.addPassthroughCopy({ './src/_assets/fonts': 'fonts' })

  // Plugins.
  eleventyConfig.addPlugin(pluginNavigation)
  if (process.env.ELEVENTY_ENV === 'production') {
    eleventyConfig.addPlugin(pluginPurgeCss)
  }

  // Filters
  Object.keys(filters).forEach(name => {
    eleventyConfig.addFilter(name, filters[name])
  })

  // Filters
  Object.keys(transforms).forEach(name => {
    eleventyConfig.addTransform(name, transforms[name])
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
