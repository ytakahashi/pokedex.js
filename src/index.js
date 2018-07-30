'use strict'

const { Pokemons } = require('./pokemon')

const pokemons = new Pokemons()

module.exports = class Pokemon {
  constructor () {
    this.poke = pokemons.getAll()
  }

  getById (id) {
    return JSON.stringify(
      this.poke.find(pokemon => String(id) === pokemon.id)
    )
  }

  getByName (name) {
    return JSON.stringify(
      this.poke.find(pokemon => name === pokemon.name)
    )
  }

  withType (type) {
    this.poke =
      this.poke.filter(pokemon => pokemon.type.includes(type))
    return this
  }

  ofGeneration (gen) {
    this.poke =
      this.poke.filter(pokemon => String(pokemon.generation) === String(gen))
    return this
  }

  belongsToEggGroup (eggGroup) {
    this.poke =
      this.poke.filter(pokemon => pokemon.eggGroups.includes(eggGroup))
    return this
  }

  totalBaseStatusGe (value) {
    this.poke =
      this.poke.filter(pokemon => pokemon.baseStatus.total >= Number(value))
    return this
  }

  totalBaseStatusLe (value) {
    this.poke =
      this.poke.filter(pokemon => pokemon.baseStatus.total <= Number(value))
    return this
  }

  get () {
    const ret = this.poke
    this.poke = pokemons.getAll()
    return JSON.stringify(ret)
  }
}
