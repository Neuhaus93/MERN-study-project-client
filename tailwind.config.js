module.exports = {
  purge: ['./src/**/*.js', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      textColor: ['disabled'],
      opacity: ['disabled'],
      backgroundColor: ['disabled'],
      cursor: ['disabled', 'hover'],
    },
  },
  plugins: [],
};
