'use strict'

const axios = require('axios')
const { searchByFilter, searchFilterByData } = require('../../search/filter')

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return { root: true }
  })

  fastify.get('/filter/', async function (request, reply) {
    return await searchByFilter({
      country: 'Serbia',
      city: 2,
      currency: 'Euro',
      type: 'apartment', // apartment, house, room
      priceFrom: 400,
      priceTo: 800,
      areaFrom: 35,
      areaTo: 80,
      isActive: true,
    })
  })

  fastify.get('/data/', async function (request, reply) {
    return await searchFilterByData({
      cityId: 'aa998544-0d0b-4936-a574-3a46c333c1ee',
      price: 350,
      m2: 60,
    })
  })
}
