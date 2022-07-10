const { supabaseClient} = require('../supabase')
const logger = require('../logger')

const getUser = async (username) => {
  return await supabaseClient
    .from('users')
    .select('*')
    .eq('username', username)
}

const handleUser = async (message) => {
  const { from } = message
  if (!from) return

  const foundUser = await getUser(from.username)

  if (foundUser.error || foundUser.body?.[0]) return foundUser?.data?.[0]

  const user = {
    username: from.username,
    firstName: from.first_name,
    lastName: from.last_name,
    clientLang: from.language_code,
    chatId: from.id,
  }

  const result = await supabaseClient
    .from('users')
    .insert(user)

  if (result.error) {
    logger.error(result.error?.message)
    return
  }

  logger.success(`Added new user: ${user.firstName} ${user.lastName} aka ${user.username}`)

  return result?.data?.[0]
}

const updateUserSettings = async (username, options) => {
  console.log('updateUserSettings', username, options)
  if (!username || !options) return
  const foundUser = await getUser(username)
  const response = await supabaseClient
    .from('users')
    .upsert(
      {
        ...foundUser.body[0],
        settings: {
          ...foundUser.body[0].settings,
          ...options,
        }
      }
    )
  return response
}

const getUserLang = async (ctx) => {
  const user = await handleUser(ctx?.message)
  return user?.settings?.language_code ||  user?.clientLang || 'en'
}

module.exports = { handleUser, updateUserSettings, getUserLang }
