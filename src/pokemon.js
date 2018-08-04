const Status = require('./status')
const name = require('./name')
const ability = require('./ability')
const eggGroup = require('./eggGroup')
const pokemonType = require('./type')

const jsons = new Map(
  [
    ['1', require('./resources/gen1.json')],
    ['2', require('./resources/gen2.json')],
    ['3', require('./resources/gen3.json')],
    ['4', require('./resources/gen4.json')],
    ['5', require('./resources/gen5.json')],
    ['6', require('./resources/gen6.json')],
    ['7', require('./resources/gen7.json')]
  ]
)

class Pokemon {
  constructor (pokemon, gen, lang) {
    this.id = pokemon.id
    this.name = name.getName(pokemon.id, lang)
    this.type = pokemonType.getType(pokemon.type, lang)
    this.ability = ability.getAbility(pokemon.abilities, lang)
    this.eggGroup = eggGroup.getEggGroup(pokemon.egg_groups, lang)
    this.baseStatus = new Status(pokemon.status)
    this.generation = gen
  }
}

class Pokemons {
  constructor (lang) {
    this.list = []

    for (const [gen, json] of jsons) {
      for (const pokemon of json) {
        this.list.push(new Pokemon(pokemon, Number(gen), lang))
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
