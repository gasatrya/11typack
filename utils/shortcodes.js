const Image = require('@11ty/eleventy-img')

module.exports = {
  image: async (src, alt, size, formats, loading = 'lazy', className = 'img-fluid', sizes) => {
    const metadata = await Image(src, {
      widths: size,
      outputDir: './dist/img/',
      formats: formats,
    })

    const imageAttributes = {
      alt,
      sizes,
      class: className,
      loading: loading,
      decoding: 'async',
    }

    return Image.generateHTML(metadata, imageAttributes)
  },
}
