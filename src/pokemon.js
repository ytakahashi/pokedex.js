const Status = require('./status')
const name = require('./name')
const ability = require('./ability')
const eggGroup = require('./eggGroup')
const pokemonType = require('./type')

const megaPokemonJson = require('../src/resources/pokemon/mega.json')

class Pokemon {
  constructor (pokemon, gen, lang) {
    this.id = pokemon.id
    if (pokemon.formId !== undefined) {
      this.formName = name.getFormName(this.id, pokemon.formId, lang)
    }
    if (pokemon.localId !== undefined) {
      this.localId = {}
      if (pokemon.localId.galar !== undefined) {
        this.localId.galar = pokemon.localId.galar
      }
    }

    this.name = name.getName(pokemon.id, lang)
    this.type = pokemonType.getType(pokemon.type, lang)
    this.ability = ability.getAbility(pokemon.abilities, lang)
    this.eggGroup = eggGroup.getEggGroup(pokemon.egg_groups, lang)
    this.baseStats = new Status(pokemon.status)

    if (pokemon.mega_evolve) {
      this.megaEvolution = megaPokemonJson[pokemon.id].map(mega => new MegaPokemon(mega, lang))
    }
    if (gen !== null) {
      this.generation = gen
    }
  }

  compareName (pokemon) {
    if (this.name < pokemon.name) {
      return -1
    }
    if (this.name > pokemon.name) {
      return 1
    }
    if (this.formName === undefined && pokemon.formName !== undefined) {
      return -1
    }
    if (pokemon.formName === undefined && this.formName !== undefined) {
      return 1
    }
    if (this.formName < pokemon.formName) {
      return -1
    }
    if (this.formName > pokemon.formName) {
      return 1
    }
    return 0
  }

  compareId (pokemon) {
    if (this.id !== pokemon.id) {
      return this.id - pokemon.id
    }
    if (this.formName === undefined && pokemon.formName !== undefined) {
      return -1
    }
    if (pokemon.formName === undefined && this.formName !== undefined) {
      return 1
    }
    return 0
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
