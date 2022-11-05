module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.ELEVENTY_ENV === 'production' ? { cssnano: {} } : {}),
  },
}
