// const { text } = require("telegraf/typings/button")
const languageSelector = (lang) => {
  const list = [
    {
      flag: '🇬🇧',
      lang: 'en',
      name: 'English',
    },
    {
      flag: '🇷🇺',
      lang: 'ru',
      name: 'Русский',
    },
    {
      flag: '🇷🇸',
      lang: 'rs',
      name: 'Srpski',
    },
    {
      flag: '🇧🇬',
      lang: 'bg',
      name: 'Български',
    },
  ]

  if (!lang) return list

  const firstLangIndex = list.findIndex(item => item.lang === lang)

  if (firstLangIndex === -1) return list

  const firstLang = list[firstLangIndex]
  list.splice(firstLangIndex, 1)

  return [
    firstLang,
    ...list
  ]
}

module.exports = { languageSelector }
