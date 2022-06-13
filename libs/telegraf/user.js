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

  // @TODO: make user changeable
  if (foundUser.error || foundUser.body[0]) return

  const user = {
    username: from.username,
    firstName: from.first_name,
    lastName: from.last_name,
    lang: from.language_code || 'en',
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
}

module.exports = { handleUser }
