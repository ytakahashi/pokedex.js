const Status = require('./status')
const name = require('./name')
const ability = require('./ability')
const eggGroup = require('./eggGroup')
const pokemonType = require('./type')

class Pokemon {
  constructor (pokemon, gen, lang) {
    this.id = pokemon.id
    this.name = name.getName(pokemon.id, lang)
    this.type = pokemonType.getType(pokemon.type, lang)
    this.ability = ability.getAbility(pokemon.abilities, lang)
    this.eggGroup = eggGroup.getEggGroup(pokemon.egg_groups, lang)
    this.baseStats = new Status(pokemon.status)
    this.generation = gen
  }
}

module.exports = {
  Pokemon: Pokemon
}
