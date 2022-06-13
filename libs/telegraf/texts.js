const generateText = (data) => {
  return `
<b>Apartment for rent in Serbia 🏠</b>
<b>€${data.price}</b>/month

• <i>📍 Location:</i> <b>${data.address || '---'}</b>
• <i>📐 Size:</i> <b>${data.m2} m2</b>

${data.desc}

<a href="${data.url}">Show more</a>
  `
}

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

module.exports = { getFilterText, generateText }
