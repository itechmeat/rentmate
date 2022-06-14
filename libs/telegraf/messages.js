// const { text } = require("telegraf/typings/button")
const { t } = require('./texts')

const languageSelector = [
  {
    flag: '🇬🇧',
    lang: 'en',
    name: 'English',
  },
  {
    flag: '🇷🇺',
    lang: 'ru',
    name: 'Russian',
  },
  {
    flag: '🇷🇸',
    lang: 'rs',
    name: 'Serbian',
  },
  {
    flag: '🇧🇬',
    lang: 'bg',
    name: 'Bulgarian',
  },
]

const handleMessage = (message, user) => {
  const lang = user?.lang || languageSelector[0].lang
  console.log('translates', t(lang, 'start'))
}

module.exports = { handleMessage }
