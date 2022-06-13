const postsControls = JSON.stringify({
  inline_keyboard: [
    [
      { text: '👍', callback_data: '/show' },
      { text: '👎', callback_data: '/show' },
      { text: 'More ➡️', callback_data: '/show' },
    ]
  ]
})

module.exports = { postsControls }
