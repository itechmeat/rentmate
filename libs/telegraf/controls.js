const buildControls = (controls, rows) => {
  const result = []
  if (!rows) {
    result.push(controls)
  } else {
    for (let i = 0; i < controls.length; i = i + rows) {
      const addition = controls.slice(i, i + rows)
      if (addition?.length) {
        result.push(addition)
      }
    }
  }
  
  return result
}

const postsControls = JSON.stringify({
  inline_keyboard: [
    [
      { text: '👍', callback_data: '/show' },
      { text: '👎', callback_data: '/show' },
      { text: 'More ➡️', callback_data: '/show' },
    ]
  ]
})

module.exports = { buildControls, postsControls }
