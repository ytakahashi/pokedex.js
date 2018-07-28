const Status = require('./status')
const Ability = require('./ability')

class Pokemon {
  constructor (pokemon) {
    this.id = pokemon.id
    this.name = pokemon.name
    this.type = pokemon.type
    this.abilities = []
    for (const a of pokemon.abilities) {
      this.abilities.push(new Ability(a))
    }
    this.baseStatus = new Status(pokemon.status)
    this.eggGroups = pokemon.egg_groups
  }
}

class Pokemons {
  constructor () {
    this.pokeMap = new Map()

    const json = require('../resource/pokemon/gen1.json')

    for (const pokemon of json) {
      let p = new Pokemon(pokemon)

      this.pokeMap.set(p.id, p)
    }
  }

  getPokemonById (id) {
    return Array.from(this.pokeMap)
      .map(obj => obj[1])
      .find(obj => String(id) === obj.id)
  }

  getPokemonByIds (ids) {
    return Array.from(this.pokeMap)
      .filter(obj => ids.includes(Number(obj[0])))
      .map(obj => obj[1])
  }

  getPokemonByName (name) {
    for (const value of this.pokeMap.values()) {
      if (value.name === name) {
        return value
      }
    }
  }
}

module.exports = {
  Pokemon: Pokemon,
  Pokemons: Pokemons
}
