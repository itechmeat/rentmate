const { bot } = require('./bot')

const setComands = () => {
  bot.telegram.setMyCommands([
    { command: '/start', description: 'Just a start' },
    { command: '/search', description: 'New search' },
    { command: '/edit', description: 'Edit your searches' },
    { command: '/help', description: 'Show all commands' },
  ])  
}

module.exports = { setComands }
