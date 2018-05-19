module.exports = {
  plugins: [
    require('precss'),
    require('postcss-import'),
    require('postcss-nested'),
    require('autoprefixer')({ browsers: ['last 3 versions', '> 1%'] }),
    require('cssnano')
  ],
};