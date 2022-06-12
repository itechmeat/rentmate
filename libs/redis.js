const redis = require('redis')

const client = redis.createClient()

client.on('error', (err) => console.log('Redis Client Error', err))

const connectToRedis = async () => await client.connect()

const setToRedis = async (key, value) => await client.set(key, value)

const getFromRedis = async (key) => await client.get(key)

module.exports = { connectToRedis, setToRedis, getFromRedis }