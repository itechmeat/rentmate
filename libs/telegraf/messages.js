// const { text } = require("telegraf/typings/button")
const { languageSelector } = require('./options')
const { t } = require('./texts')
const { commands, handleCommand } = require('./commands')

const handleMessage = (message, user) => {
  if (!message) return
  const lang = user?.clientLang || languageSelector()[0].lang
  const text = message.text
  if (!text) return
  console.log('translates', t(lang, 'start'))

  const commandsNames = commands.map(command => command.command)
  if (commandsNames.includes(text)) {
    handleCommand(text, lang, user)
    return
  }
}

module.exports = { handleMessage }
