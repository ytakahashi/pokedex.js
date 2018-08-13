const Status = require('./status')
const name = require('./name')
const ability = require('./ability')
const eggGroup = require('./eggGroup')
const pokemonType = require('./type')

const megaPokemonJson = require('../src/resources/pokemon/mega.json')

class Pokemon {
  constructor (pokemon, gen, lang) {
    this.id = pokemon.id
    this.name = name.getName(pokemon.id, lang)
    this.type = pokemonType.getType(pokemon.type, lang)
    this.ability = ability.getAbility(pokemon.abilities, lang)
    this.eggGroup = eggGroup.getEggGroup(pokemon.egg_groups, lang)
    this.baseStats = new Status(pokemon.status)
    this.generation = gen
    if (pokemon.mega_evolve) {
      this.megaEvolution = megaPokemonJson[pokemon.id].map(mega => new MegaPokemon(mega, lang))
    }
  }
}

class MegaPokemon {
  constructor (pokemon, lang) {
    this.name = name.getName(pokemon.id, lang)
    this.type = pokemonType.getType(pokemon.type, lang)
    this.ability = ability.getAbility(pokemon.abilities, lang)
    this.baseStats = new Status(pokemon.status)
  }
}

module.exports = {
  Pokemon: Pokemon
}
