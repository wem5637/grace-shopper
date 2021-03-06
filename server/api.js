'use strict'

const api = module.exports = require('express').Router()

api
  .get('/heartbeat', (req, res) => res.send({ok: true}))
  .use('/auth', require('./auth'))
  .use('/users', require('./users'))
  .use('/cart', require('./cart'))
  .use('/homes', require('./homes'))
  .use('/transactions', require('./transactions'))
  .use('/availability', require('./availability'))

// No routes matched? 404.
api.use((req, res) => res.status(404).end())
