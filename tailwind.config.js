module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './public/index.html',
      './src/**/*.vue',
      './src/**/*.js',
      './src/**/*.ts'
    ]
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms')
  ],
  darkMode: 'class'
}
