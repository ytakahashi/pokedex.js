'use strict'

const { Pokemons } = require('./pokemon')

const pokemons = new Pokemons()

module.exports = class Pokemon {
  byId (id) {
    return JSON.stringify(pokemons.getPokemonById(id))
  }

  byIds (ids) {
    return JSON.stringify(pokemons.getPokemonByIds(ids))
  }

  byName (name) {
    return JSON.stringify(pokemons.getPokemonByName(name))
  }
}
