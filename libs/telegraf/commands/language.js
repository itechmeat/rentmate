const { Markup } = require('telegraf')
const { bot } = require('../bot')
const { getUserLang, updateUserSettings } = require('../user')
const { languageSelector, getLanguageByLang } = require('../options')
const { buildControls } = require('../controls')
const { t } = require('../texts')

const setLanguage = async (ctx) => {
  const lang = await getUserLang(ctx)
  console.log('==>lang', lang)
  
  await ctx.replyWithHTML(`<b>${t(lang, 'chooseLang')}</b>`, Markup.inlineKeyboard(
    buildControls(languageSelector(lang)
      .map(item => Markup.button.callback(`${item.flag} ${item.name}`, `lang_btn_${item.lang}`)), 2),
  ))
  return
}

const listenLanguage = () => {  
  bot.action(languageSelector().map(item => `lang_btn_${item.lang}`), async (ctx) => {
    const lang = ctx.update?.callback_query?.data?.substring(9)
    if (!lang) return
    try {
      const response = await updateUserSettings(
        ctx.update?.callback_query?.from?.username,
        {
          language_code: lang
        }
      )
      if (!response || response.error) {
        ctx.replyWithHTML(t(lang, 'langNotChanged') + ' 😔')
      }
      const newLanguage = getLanguageByLang(lang)
      ctx.replyWithHTML(`${t(newLanguage.lang, 'langChanged')} <b>${newLanguage.flag} ${newLanguage.name}</b> 👍`)
    } catch (error) {
      console.error(error)
    }
  })
}

module.exports = { setLanguage, listenLanguage }
