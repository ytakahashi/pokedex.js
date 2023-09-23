import { getEggGroup } from './eggGroup'
import { getName, getFormName } from './name'
import { getType } from './type'
import { getAbility } from './ability'
import { Status } from './status'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const megaPokemonJson = require('./resources/pokemon/mega.json')

type localId = {
  galar?: string
  paldea?: string
}

type PokemonAbility = {
  name: string
  hidden: boolean
  terastallised?: boolean
}

export class Pokemon {
  id: string
  name: string
  formName?: string
  localId?: localId
  type: string[]
  ability: PokemonAbility[]
  eggGroup: string
  baseStats: Status
  megaEvolution?: MegaPokemon[]
  generation: number

  constructor (pokemon: any, gen: number, lang: string) {
    this.id = pokemon.id
    if (pokemon.formId !== undefined) {
      this.formName = getFormName(this.id, pokemon.formId, lang)
    }
    if (pokemon.localId !== undefined) {
      this.localId = {}
      if (pokemon.localId.galar !== undefined) {
        this.localId.galar = pokemon.localId.galar
      }
      if (pokemon.localId.paldea !== undefined) {
        this.localId.paldea = pokemon.localId.paldea
      }
    }

    this.name = getName(pokemon.id, lang)
    this.type = getType(pokemon.type, lang)
    this.ability = getAbility(pokemon.abilities, lang)
    this.eggGroup = getEggGroup(pokemon.egg_groups, lang)
    this.baseStats = new Status(pokemon.status)

    if (pokemon.mega_evolve !== undefined && pokemon.mega_evolve === true) {
      this.megaEvolution = megaPokemonJson[pokemon.id].map(mega => new MegaPokemon(mega, lang))
    }
    if (gen !== null) {
      this.generation = gen
    }
  }

  /**
   * Compares Pokemon name with the specified object for order.
   *
   * @param pokemon pokemon to be compared
   * @return {number} -1, 0, or 1 as this object is less than, equal to, or greater than the specified object.
   */
  compareName = (pokemon: Pokemon): number => {
    if (this.name < pokemon.name) {
      return -1
    }
    if (this.name > pokemon.name) {
      return 1
    }
    if (this.formName === undefined && pokemon.formName === undefined) {
      return 0
    } else if (this.formName === undefined) {
      return -1
    } else if (pokemon.formName === undefined) {
      return 1
    } else if (this.formName < pokemon.formName) {
      return -1
    } else if (this.formName > pokemon.formName) {
      return 1
    } else {
      return 0
    }
  }

  /**
   * Compares Pokemon id with the specified object for order.
   *
   * @param pokemon pokemon to be compared
   * @return {number} a negative integer, zero, or a positive integer as this object is less than, equal to, or greater than the specified object.
   */
  compareId = (pokemon: Pokemon): number => {
    if (this.id !== pokemon.id) {
      return Number(this.id) - Number(pokemon.id)
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
  name: string
  type: string
  ability: PokemonAbility[]
  baseStats: Status

  constructor (pokemon: any, lang: string) {
    this.name = getName(pokemon.id, lang)
    this.type = getType(pokemon.type, lang)
    this.ability = getAbility(pokemon.abilities, lang)
    this.baseStats = new Status(pokemon.status)
  }
}
