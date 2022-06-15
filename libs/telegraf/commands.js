const { supabaseClient} = require('../supabase')
const { bot } = require('./bot')
const { buildControls } = require('./controls')
const { languageSelector } = require('./options')
const { t } = require('./texts')

const commands = [
  { command: '/start', description: 'Just a start' },
  { command: '/search', description: 'New search' },
  { command: '/edit', description: 'Edit your searches' },
  { command: '/settings', description: 'Edit your settings' },
  { command: '/help', description: 'Show all commands' },
]

const setCommands = () => {
  bot.telegram.setMyCommands(commands)  
}

const callSettings = async  (lang, user) => {
  const { data, error } = await supabaseClient
    .from('users')
    .update({ waiting: 'settings.lang' })
    .eq('id', user.id)

  bot.telegram.sendMessage(
    user.chatId,
    t(lang, 'chooseLang'),
    buildControls(languageSelector(lang).map(item => ({
      text: `${item.flag} ${item.name}`,
      callback_data: `/${item.lang}`,
    })), 2),
  )
}

const handleCommand = (command, lang, user) => {
  switch (command) {
    case '/search':
      console.log('===>search')
      return
    case '/edit':
      console.log('===>edit')
      return
    case '/settings':
      return callSettings(lang, user)
    case '/help':
      console.log('===>help')
      return
    default:
      if (!user?.settings) {
        return callSettings(lang, user)
      }
      console.log('===>start', lang, user)
      return
  }
}

module.exports = { commands, setCommands, handleCommand }
