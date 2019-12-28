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
    require('./resources/pokemon/gen7.json').map(p => new Pokemon(p, Number(7), lang)),
    require('./resources/pokemon/gen8.json').map(p => new Pokemon(p, Number(8), lang)),
    require('./resources/pokemon/form_3.json').map(p => new Pokemon(p, Number(3), lang)),
    require('./resources/pokemon/form_4.json').map(p => new Pokemon(p, Number(4), lang)),
    require('./resources/pokemon/form_5.json').map(p => new Pokemon(p, Number(5), lang)),
    require('./resources/pokemon/form_6.json').map(p => new Pokemon(p, Number(6), lang)),
    require('./resources/pokemon/form_7.json').map(p => new Pokemon(p, Number(7), lang)),
    require('./resources/pokemon/form_8.json').map(p => new Pokemon(p, Number(8), lang))
  )
}

module.exports = class Pokedex {
  constructor (lang) {
    if (lang === undefined) {
      this.lang = 'ja'
    } else if (lang === 'ja' | lang === 'en') {
      this.lang = lang
    } else {
      throw new Error(`Language '${lang}' is not supported.`)
    }

    this.allPoke = getAll(this.lang)
    this.poke = this.allPoke
  }

  /**
   * Filters a list of Pokémon with ID
   *
   * @param {Number|String} id ID of Pokémon
   */
  id (id) {
    this.poke =
      this.poke.filter(pokemon => String(id) === pokemon.id)
    return this
  }

  /**
   * Filters a list of Pokémon with name
   *
   * @param {String} name Name of Pokémon
   */
  name (name) {
    this.poke =
      this.poke.filter(pokemon => name === pokemon.name)
    return this
  }

  /**
   * Filters a list of Pokémon with type
   *
   * @param {String} type Type of Pokémon
   */
  type (type) {
    this.poke =
      this.poke.filter(pokemon => pokemon.type.includes(type))
    return this
  }

  /**
   * Filters a list of Pokémon with egg group
   *
   * @param {String} eggGroup Egg group of Pokémon
   */
  eggGroup (eggGroup) {
    this.poke =
      this.poke.filter(pokemon => pokemon.eggGroup.includes(eggGroup))
    return this
  }

  /**
   * Takes Pokémon whose base stat total matches to given operator and value
   *
   * @param {String} operator
   * @param {Number|String} value
   */
  baseStatTotal (operator, value) {
    switch (operator) {
      case '>':
        this.poke =
          this.poke.filter(pokemon => pokemon.baseStats.total > Number(value))
        break
      case '>=':
        this.poke =
          this.poke.filter(pokemon => pokemon.baseStats.total >= Number(value))
        break
      case '<':
        this.poke =
          this.poke.filter(pokemon => pokemon.baseStats.total < Number(value))
        break
      case '<=':
        this.poke =
          this.poke.filter(pokemon => pokemon.baseStats.total <= Number(value))
        break
      case '=':
        this.poke =
          this.poke.filter(pokemon => pokemon.baseStats.total === Number(value))
        break
      default:
        throw new Error(`Invalid operator (${operator}).`)
    }
    return this
  }

  /**
   * Takes Pokémon which can Mega Evolve (including Primal Reversion, Ultra Burst)
   */
  canMegaEvolve () {
    this.poke =
      this.poke.filter(pokemon => pokemon.megaEvolution !== undefined)
    return this
  }

  /**
   * Filters a list of Pokémon by a generation when the Pokémon was introduced
   *
   * @param {Number|String} gen Generation
   */
  generation (gen) {
    this.poke =
      this.poke.filter(pokemon => String(pokemon.generation) === String(gen))
    return this
  }

  /**
   * Takes Pokémon which is listed in the Galar Pokédex
   */
  inGalarPokedex () {
    this.poke =
      this.poke
        .filter(pokemon => pokemon.localId !== undefined && pokemon.localId.galar !== undefined)

    this.poke.forEach(pokemon => delete pokemon.megaEvolution)

    return this
  }

  /**
   * Returns JSON String of a list of Pokémon
   */
  get () {
    const ret = this.poke
    this.poke = this.allPoke
    return JSON.stringify(ret)
  }
}
