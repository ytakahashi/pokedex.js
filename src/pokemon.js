const Status = require('./status')
const Ability = require('./ability')

const jsons = new Map(
  [
    ['1', require('./resources/gen1.json')],
    ['2', require('./resources/gen2.json')],
    ['3', require('./resources/gen3.json')]
  ]
)

class Pokemon {
  constructor (pokemon, gen) {
    this.id = pokemon.id
    this.name = pokemon.name
    this.type = pokemon.type
    this.abilities = []
    for (const a of pokemon.abilities) {
      this.abilities.push(new Ability(a))
    }
    this.baseStatus = new Status(pokemon.status)
    this.eggGroups = pokemon.egg_groups
    this.generation = gen
  }
}

class Pokemons {
  constructor () {
    this.list = []

    for (const [gen, json] of jsons) {
      for (const pokemon of json) {
        this.list.push(new Pokemon(pokemon, Number(gen)))
      }
    }
  }

  getAll () {
    return this.list
  }
}

module.exports = {
  Pokemon: Pokemon,
  Pokemons: Pokemons
}
