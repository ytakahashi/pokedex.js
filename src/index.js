'use strict'

const { Pokemon } = require('./pokemon')

const getAll = (lang) => {
  return [].concat(
    require('./resources/pokemon/gen1.json').map(p => new Pokemon(p, Number(1), lang)),
    require('./resources/pokemon/gen2.json').map(p => new Pokemon(p, Number(2), lang)),
    require('./resources/pokemon/gen3.json').map(p => new Pokemon(p, Number(3), lang)),
    require('./resources/pokemon/gen4.json').map(p => new Pokemon(p, Number(4), lang)),
    require('./resources/pokemon/gen5.json').map(p => new Pokemon(p, Number(5), lang)),
    require('./resources/pokemon/gen6.json').map(p => new Pokemon(p, Number(6), lang)),
    require('./resources/pokemon/gen7.json').map(p => new Pokemon(p, Number(7), lang))
  )
}

module.exports = class Pokedex {
  constructor (lang) {
    if (lang === void 0) {
      this.lang = 'ja'
    } else if (lang === 'ja' | lang === 'en') {
      this.lang = lang
    } else {
      throw new Error(`Language '${lang}' is not supported.`)
    }

    this.allPoke = getAll(this.lang)
    this.poke = this.allPoke
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

  totalBaseStatsGe (value) {
    this.poke =
      this.poke.filter(pokemon => pokemon.baseStats.total >= Number(value))
    return this
  }

  totalBaseStatsLe (value) {
    this.poke =
      this.poke.filter(pokemon => pokemon.baseStats.total <= Number(value))
    return this
  }

  canMegaEvolve () {
    this.poke =
      this.poke.filter(pokemon => pokemon.megaEvolution !== undefined)
    return this
  }

  get () {
    const ret = this.poke
    this.poke = this.allPoke
    return JSON.stringify(ret)
  }
}
