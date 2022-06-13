const { bot } = require('./bot')
const { postsControls } = require('./controls')
const { generateText } = require('./texts')

const sendPost = async (chatId, message) => {
  let desc = message.desc
  if (desc?.length > 800) {
    desc = desc.slice(0, 800) + ' ...'
  }

  await bot.telegram.sendPhoto(
    chatId,
    message.image,
    {
      caption: generateText({
        category: message.category,
        price: message.price,
        address: message.address,
        m2: message.m2,
        desc,
        url: message.urlPage,
      }),
      parse_mode: 'HTML',
      // reply_markup: postsControls,
    }
  )
}

module.exports = { sendPost }
