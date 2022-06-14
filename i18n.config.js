// https://www.npmjs.com/package/i18n
// https://blog.crowdin.com/2022/03/17/node-js-i18n-localization-for-developers/
const { I18n } = require('i18n')
const path = require('path')

const i18n = new I18n({
  locales: ['en', 'ru', 'rs', 'bg'],
  defaultLocale: 'en',
  directory: path.join('./', 'locales'),
  extension: '.js',
})

module.exports = i18n