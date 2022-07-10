// const { text } = require("telegraf/typings/button")
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

const languageSelector = (lang) => {
  if (!lang) return list

  const firstLangIndex = list.findIndex(item => item.lang === lang)

  if (firstLangIndex === -1) return list

  const firstLang = list[firstLangIndex]
  const newList = [...list]
  newList.splice(firstLangIndex, 1)

  return [
    firstLang,
    ...newList
  ]
}

const getLanguageByLang = (lang) => {
  const result = list.find(item => item.lang === lang)
  return result
}

module.exports = { languageSelector, getLanguageByLang }
