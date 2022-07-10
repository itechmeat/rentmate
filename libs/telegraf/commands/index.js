const { bot } = require('../bot')
const { setLanguage, listenLanguage } = require('./language')
const { t } = require('../texts')

const commands = [
  { command: '/start', description: 'Just a start' },
  { command: '/search', description: 'New search' },
  { command: '/settings', description: 'Edit your settings' },
  { command: '/help', description: 'Show all commands' },
]

const setMenuCommands = () => {
  bot.telegram.setMyCommands(commands)
}

const setOtherCommands = () => {
  try {
    bot.start(async (ctx) => {
      await setLanguage(ctx)
      return
    })
    bot.command('settings', async (ctx) => {
      await setLanguage(ctx)
      return
    })
  } catch (error) {
    console.error(error)
  }
}

listenLanguage()

module.exports = { commands, setMenuCommands, setOtherCommands }
