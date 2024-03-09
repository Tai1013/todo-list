export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: [
      '> 1%',
      'last 5 versions',
      'Chrome >= 60',
      'Firefox >= 60',
      'not Edge < 79',
      'iOS >= 10',
      'Safari >= 10',
      'Android >= 6',
      'not Explorer <= 11'
    ]
  }
}
