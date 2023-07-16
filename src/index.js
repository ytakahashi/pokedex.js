'use strict'

const { Pokemon } = require('./pokemon')

/**
 * Returns list ogf Pokemon.
 *
 * @param {string} lang language
 * @return {Pokemon[]} array of pokemon
 */
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
    require('./resources/pokemon/gen8_LegendsArceus.json').map(p => new Pokemon(p, Number(8), lang)),
    require('./resources/pokemon/gen9.json').map(p => new Pokemon(p, Number(9), lang)),
    require('./resources/pokemon/form_3.json').map(p => new Pokemon(p, Number(3), lang)),
    require('./resources/pokemon/form_4.json').map(p => new Pokemon(p, Number(4), lang)),
    require('./resources/pokemon/form_5.json').map(p => new Pokemon(p, Number(5), lang)),
    require('./resources/pokemon/form_6.json').map(p => new Pokemon(p, Number(6), lang)),
    require('./resources/pokemon/form_7.json').map(p => new Pokemon(p, Number(7), lang)),
    require('./resources/pokemon/form_8.json').map(p => new Pokemon(p, Number(8), lang)),
    require('./resources/pokemon/form_LegendsArceus.json').map(p => new Pokemon(p, Number(8), lang)),
    require('./resources/pokemon/form_9.json').map(p => new Pokemon(p, Number(9), lang))
  )
}

/**
 * A class of a Pokédex.
 */
module.exports = class Pokedex {
  /**
   * Creates a new Pokédex instance of a given language
   *
   * @param {String} [lang=ja] language ('en' or 'ja', defaults to 'ja')
   */
  constructor (lang) {
    if (!lang) {
      this.lang = 'ja'
    } else if (lang === 'ja' || lang === 'en') {
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
   * @param {number|string} id ID of Pokémon
   * @return {Pokedex} this instance
   */
  id (id) {
    this.poke =
      this.poke.filter(pokemon => String(id) === pokemon.id)
    return this
  }

  /**
   * Filters a list of Pokémon with name
   *
   * @param {string} name Name of Pokémon
   * @return {Pokedex} this instance
   */
  name (name) {
    this.poke =
      this.poke.filter(pokemon => name === pokemon.name)
    return this
  }

  /**
   * Filters a list of Pokémon with type
   *
   * @param {string} type Type of Pokémon
   * @return {Pokedex} this instance
   */
  type (type) {
    this.poke =
      this.poke.filter(pokemon => pokemon.type.includes(type))
    return this
  }

  /**
   * Filters a list of Pokémon with egg group
   *
   * @param {string} eggGroup Egg group of Pokémon
   * @return {Pokedex} this instance
   */
  eggGroup (eggGroup) {
    this.poke =
      this.poke.filter(pokemon => pokemon.eggGroup.includes(eggGroup))
    return this
  }

  /**
   * Takes Pokémon whose base stat total matches to given operator and value
   *
   * @param {string} operator an operator to compare with 'value' (one of '>', '>=', '<', '<=', '=')
   * @param {number|string} value value to compare
   * @return {Pokedex} this instance
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
   * @return {Pokedex} this instance
   */
  canMegaEvolve () {
    this.poke =
      this.poke.filter(pokemon => pokemon.megaEvolution !== undefined)
    return this
  }

  /**
   * Filters a list of Pokémon by a generation when the Pokémon was introduced
   *
   * @param {number|string} gen Generation
   * @return {Pokedex} this instance
   */
  generation (gen) {
    this.poke =
      this.poke.filter(pokemon => String(pokemon.generation) === String(gen))
    return this
  }

  /**
   * Takes Pokémon which is listed in the Galar Pokédex
   *
   * @return {Pokedex} this instance
   */
  inGalarPokedex () {
    this.poke =
      this.poke
        .filter(pokemon => pokemon.localId !== undefined && pokemon.localId.galar !== undefined)

    this.poke.forEach(pokemon => delete pokemon.megaEvolution)

    return this
  }

  /**
   * Sorts Pokémon list according to a given sortKey
   *
   * @param {string} sortKey - one of "NationalNumber" or "Lexicographical"
   * @return {Pokedex} this instance
   */
  sort (sortKey) {
    switch (sortKey) {
      case 'Lexicographical':
        this.poke.sort((a, b) => a.compareName(b))
        break
      case 'NationalNumber':
        this.poke.sort((a, b) => a.compareId(b))
        break
      default:
        throw new Error(`Invalid sortKey (${sortKey}).`)
    }
    return this
  }

  /**
   * Returns a list of Pokémon.
   *
   * @return {Pokemon[]} result
   */
  getPokemon () {
    const ret = this.poke
    this.poke = this.allPoke
    return ret
  }

  /**
   * Returns JSON String of a list of Pokémon.
   *
   * @return {string} result
   */
  getPokemonAsJson () {
    const ret = this.poke
    this.poke = this.allPoke
    return JSON.stringify(ret)
  }

  /**
   * Returns JSON String of a list of Pokémon.
   *
   * @return {string} result
   * @deprecated Use {@link getPokemon} or {@link getPokemonAsJson} instead.
   */
  get () {
    const ret = this.poke
    this.poke = this.allPoke
    return JSON.stringify(ret)
  }
}
