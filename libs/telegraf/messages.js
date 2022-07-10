// const { text } = require("telegraf/typings/button")
const { languageSelector } = require('./options')
const { t } = require('./texts')

const handleMessage = (ctx, user) => {
  // console.log('message', message, user)
  if (!ctx?.message) return
  const lang = user?.clientLang || languageSelector()[0].lang
  const text = ctx.message.text
  if (!text) return
  console.log('translates', t(lang, 'start'))
}

module.exports = { handleMessage }
