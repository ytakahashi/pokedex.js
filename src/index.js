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
    require('./resources/pokemon/form_3.json').map(p => new Pokemon(p, Number(3), lang)),
    require('./resources/pokemon/form_4.json').map(p => new Pokemon(p, Number(4), lang)),
    require('./resources/pokemon/form_5.json').map(p => new Pokemon(p, Number(5), lang)),
    require('./resources/pokemon/form_6.json').map(p => new Pokemon(p, Number(6), lang)),
    require('./resources/pokemon/form_7.json').map(p => new Pokemon(p, Number(7), lang))
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

  /**
   * Filters a list of Pokémons with ID
   * @param {Number|String} id ID of Pokémon
   */
  id (id) {
    this.poke =
      this.poke.filter(pokemon => String(id) === pokemon.id)
    return this
  }

  /**
   * Filters a list of Pokémons with name
   * @param {String} name Name of Pokémon
   */
  name (name) {
    this.poke =
      this.poke.filter(pokemon => name === pokemon.name)
    return this
  }

  /**
   * Filters a list of Pokémons with type
   * @param {String} type Type of Pokémon
   */
  type (type) {
    this.poke =
      this.poke.filter(pokemon => pokemon.type.includes(type))
    return this
  }

  /**
   * Filters a list of Pokémons with egg group
   * @param {String} eggGroup Egg group of Pokémon
   */
  eggGroup (eggGroup) {
    this.poke =
      this.poke.filter(pokemon => pokemon.eggGroup.includes(eggGroup))
    return this
  }

  /**
   * Takes Pokémons whose base stat total is a given value and over
   * @param {Number|String} value
   */
  baseStatTotalGe (value) {
    this.poke =
      this.poke.filter(pokemon => pokemon.baseStats.total >= Number(value))
    return this
  }

  /**
   * Takes Pokémons whose base stat total is a given value or under
   * @param {Number|String} value
   */
  baseStatTotalLe (value) {
    this.poke =
      this.poke.filter(pokemon => pokemon.baseStats.total <= Number(value))
    return this
  }

  /**
   * Takes Pokémons which can Mega Evolve (including Primal Reversion, Ultra Burst)
   */
  canMegaEvolve () {
    this.poke =
      this.poke.filter(pokemon => pokemon.megaEvolution !== undefined)
    return this
  }

  /**
   * Filters a list of Pokémons by a generation when the Pokémons was introduced
   * @param {Number|String} gen Generation
   */
  generation (gen) {
    this.poke =
      this.poke.filter(pokemon => String(pokemon.generation) === String(gen))
    return this
  }

  /**
   * Returns JSON String of a list of Pokémons
   */
  get () {
    const ret = this.poke
    this.poke = this.allPoke
    return JSON.stringify(ret)
  }

  /**
   * @deprecated use '.id' and '.get' instead
   * @param {Number|String} id ID of Pokémon
   * @see {@link id}
   * @see {@link get}
   */
  getById (id) {
    return JSON.stringify(
      this.poke.filter(pokemon => String(id) === pokemon.id)
    )
  }

  /**
   * @deprecated use '.name' and '.get' instead
   * @param {String} name Name of Pokémon
   * @see {@link name}
   * @see {@link get}
   */
  getByName (name) {
    return JSON.stringify(
      this.poke.filter(pokemon => name === pokemon.name)
    )
  }

  /**
   * @deprecated use '.type' instead
   * @param {String} type Type of Pokémon
   * @see {@link type}
   */
  withType (type) {
    this.poke =
      this.poke.filter(pokemon => pokemon.type.includes(type))
    return this
  }

  /**
   * @deprecated use '.generation' instead
   * @param {Number|String} gen Generation
   * @see {@link generation}
   */
  ofGeneration (gen) {
    this.poke =
      this.poke.filter(pokemon => String(pokemon.generation) === String(gen))
    return this
  }

  /**
   * @deprecated use '.eggGroup' instead
   * @param {String} eggGroup Egg group of Pokémon
   * @see {@link eggGroup}
   */
  belongsToEggGroup (eggGroup) {
    this.poke =
      this.poke.filter(pokemon => pokemon.eggGroup.includes(eggGroup))
    return this
  }

  /**
   * @deprecated use '.baseStatTotalGe' instead
   * @param {Number|String} value
   */
  totalBaseStatsGe (value) {
    this.poke =
      this.poke.filter(pokemon => pokemon.baseStats.total >= Number(value))
    return this
  }

  /**
   * @deprecated use '.baseStatTotalLe' instead
   * @param {Number|String} value
   */
  totalBaseStatsLe (value) {
    this.poke =
      this.poke.filter(pokemon => pokemon.baseStats.total <= Number(value))
    return this
  }
}
