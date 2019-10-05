const express = require('express')
const Request = require('request')
const pokemonsRouter = require('./pokemons/router')
const app = express()

app.use(express.json())
app.use(pokemonsRouter)

app.get('/', (req, res) => res.send({ message : "Hello world"}))


module.exports = app