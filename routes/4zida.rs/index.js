'use strict'

const axios = require('axios')

const locations = [
  {
    id: 2,
    slug: 'beograd',
    name: 'Belgrad'
  },
  {
    id: 600,
    slug: 'novi-sad',
    name: 'Novi Sad'
  },
  {
    id: 4845,
    slug: 'nis',
    name: 'Nis'
  },
  {
    id: 7857,
    slug: 'subotica',
    name: 'Subotica'
  },
  {
    id: 2290,
    slug: 'kragujevac',
    name: 'Kragujevac'
  },
  {
    id: 7978,
    slug: 'zrenjanin',
    name: 'Zrenjanin'
  },
  {
    id: 7925,
    slug: 'krusevac',
    name: 'Kruševac'
  },
  {
    id: 7981,
    slug: 'pancevo',
    name: 'Pančevo'
  },
]

module.exports = async function (fastify, opts) {
  const getCityLink = (city) => {
    return `https://api.4zida.rs/v6/search/apartments?for=rent&sort=createdAtDesc&page=1&placeIds%5B%5D=${city}`
  }

  fastify.get('/', async function (request, reply) {    
    const { data } = await axios.get(getCityLink(1))  
    return data
  })

  for (let location of locations) {
    fastify.get(`/${location.slug}`, async function (request, reply) {
      const { data } = await axios.get(getCityLink(location.id))  
      return data
    })
  }
}
