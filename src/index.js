'use strict'

const { Pokemons } = require('./pokemon')

module.exports = class Pokedex {
  constructor (lang) {
    if (lang === void 0) {
      this.lang = 'ja'
    } else if (lang === 'ja' | lang === 'en') {
      this.lang = lang
    } else {
      throw new Error(`Language '${lang}' is not supported.`)
    }

    this.pokemons = new Pokemons(this.lang)
    this.poke = this.pokemons.getAll()
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
      this.poke.filter(pokemon => pokemon.eggGroup.includes(eggGroup))
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
    this.poke = this.pokemons.getAll()
    return JSON.stringify(ret)
  }
}
