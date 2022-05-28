const examplePost = `
<b>Apartment for rent in Novi Sad 🏠</b>
<b>€2,000</b>/month <i>(€16/sqm)</i>

• <i>📍 Location:</i> <b>South Backa District</b>
• <i>📐 Size:</i> <b>122 m2</b>
• <i>🛏 Bedrooms:</i> <b>3</b>
• <i>🛁 Bathrooms:</i> <b>1</b>

Moj otac izdaje dvosoban stan (60m2) na Bul.Oslobodjenja 37, 5 ti sprat od 10( ima lift) na duzi vremenski period, nije pet friendly. Slobodan od 1.06

<a href="https://codebeautify.org/markdown-editor">Show more</a>
`

const generateText = (data) => {
  return `
<b>Apartment for rent in Serbia 🏠</b>
<b>€${data.price}</b>/month

• <i>📍 Location:</i> <b>${data.address}</b>
• <i>📐 Size:</i> <b>${data.m2} m2</b>

${data.desc}

<a href="${data.url}">Show more</a>
  `
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

const getFilterText = (rentFilter) => {
  let type = 'something'
  if (rentFilter.type) {
    const article = rentFilter.type === 'Apartment' ? 'an' : 'a'
    type = `${article} ${rentFilter.type}`
  }

  let area = rentFilter.areaFrom
  if (rentFilter.areaTo) {
    area = `${area} - ${rentFilter.areaTo}`
  }
  if (area) {
    area = `${area} m2`
  }

  let price = rentFilter.priceFrom
  if (rentFilter.priceTo) {
    price = `${price} - ${rentFilter.priceTo}`
  }
  if (price && rentFilter.currency) {
    price = `${price} ${rentFilter.currency}`
  }

  const result = `<b>So, you'd like to rent ${type} in ${rentFilter.city}, ${rentFilter.country}:</b>

  • <i>📐 Size:</i> <b>${area || 'any'}</b>
  • <i>💰 Price:</i> <b>${price || 'any'}</b>
  `

  return result
}

module.exports = { examplePost, postsControls, getFilterText, generateText }
