const htmlMin = require('html-minifier')

module.exports = {
  htmlMin: (content, outputPath) => {
    if (outputPath.endsWith('.html') && process.env.ELEVENTY_ENV === 'production') {
      return htmlMin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      })
    }

    return content
  },
}
