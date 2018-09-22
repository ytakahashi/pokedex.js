/* eslint no-unused-expressions: 0 */

const expect = require('chai').expect

const Pokedex = require('../src/index')

const { Validator } = require('jsonschema')
const v = new Validator()

const schema = require('../src/resources/schema.json')

const isValidPokemon = (value) => {
  const validateResult = v.validate(value, schema)
  if (validateResult.errors.length === 0) {
    return true
  } else {
    console.log(validateResult)
  }
}

describe('Pokedex class', () => {
  describe('language: foo)', () => {
    it('throws Error', () => {
      expect(() => new Pokedex('foo'))
        .to.throw(Error, 'Language \'foo\' is not supported.')
    })
  })

  describe('language ja)', () => {
    const pokedex = new Pokedex()

    it('returns expected Pokemon (id: 25)', () => {
      const actual = pokedex.getById(25)

      const expected = '[{"id":"25","name":"ピカチュウ","type":["でんき"],"ability":[{"name":"せいでんき","hidden":false},{"name":"ひらいしん","hidden":true}],"eggGroup":["陸上","妖精"],"baseStats":{"H":"35","A":"55","B":"40","C":"50","D":"50","S":"90"},"generation":1}]'

      expect(actual)
        .to.deep.equal(expected)
    })

    it('returns expected Pokemon (name: ピカチュウ)', () => {
      const actual = pokedex.getByName('ピカチュウ')

      const expected = '[{"id":"25","name":"ピカチュウ","type":["でんき"],"ability":[{"name":"せいでんき","hidden":false},{"name":"ひらいしん","hidden":true}],"eggGroup":["陸上","妖精"],"baseStats":{"H":"35","A":"55","B":"40","C":"50","D":"50","S":"90"},"generation":1}]'

      expect(actual)
        .to.deep.equal(expected)
    })

    it('returns expected Pokemon Array (filter by type: でんき, generation: 1)', () => {
      const actual = pokedex
        .ofGeneration(1)
        .withType('でんき')
        .get()

      const isExpected = (pokemon) =>
        isValidPokemon(pokemon) && pokemon.type.includes('でんき') && pokemon.generation === 1

      expect(JSON.parse(actual).every(isExpected)).to.be.true
    })

    it('returns expected Pokemon Array (filter by base stats: 400-500, egg group: 妖精)', () => {
      const actual = pokedex
        .totalBaseStatsGe(400)
        .totalBaseStatsLe(500)
        .belongsToEggGroup('妖精')
        .get()

      const totalBaseStats = (pokemon) => {
        return Number(pokemon.baseStats.H) +
        Number(pokemon.baseStats.A) +
        Number(pokemon.baseStats.B) +
        Number(pokemon.baseStats.C) +
        Number(pokemon.baseStats.D) +
        Number(pokemon.baseStats.S)
      }

      const isExpected = (pokemon) =>
        isValidPokemon(pokemon) && pokemon.eggGroup.includes('妖精') &&
        totalBaseStats(pokemon) >= 400 && totalBaseStats(pokemon) <= 500

      expect(JSON.parse(actual).every(isExpected)).to.be.true
    })

    it('returns undefined for not defined name', () => {
      const actual = pokedex.getById('foo')
      expect(actual)
        .to.deep.equal('[]')
    })

    it('returns undefined for not defined id', () => {
      const actual = pokedex.getById(0)
      expect(actual)
        .to.deep.equal('[]')
    })
  })

  describe('language: en)', () => {
    let pokedex = new Pokedex('en')

    it('returns expected Pokemon (id: 25)', () => {
      const actual = pokedex.getById(25)

      const expected = '[{"id":"25","name":"Pikachu","type":["Electric"],"ability":[{"name":"Static","hidden":false},{"name":"Lightning Rod","hidden":true}],"eggGroup":["Field","Fairy"],"baseStats":{"H":"35","A":"55","B":"40","C":"50","D":"50","S":"90"},"generation":1}]'
      expect(actual)
        .to.deep.equal(expected)
    })

    it('returns expected Pokemon (name: Pikachu)', () => {
      const actual = pokedex.getByName('Pikachu')

      const expected = '[{"id":"25","name":"Pikachu","type":["Electric"],"ability":[{"name":"Static","hidden":false},{"name":"Lightning Rod","hidden":true}],"eggGroup":["Field","Fairy"],"baseStats":{"H":"35","A":"55","B":"40","C":"50","D":"50","S":"90"},"generation":1}]'
      expect(actual)
        .to.deep.equal(expected)
    })

    it('returns expected Pokemon Array (filter by type: Psychic, eggGroup: Field)', () => {
      const actual = pokedex
        .withType('Psychic')
        .belongsToEggGroup('Field')
        .get()

      const isExpected = (pokemon) =>
        isValidPokemon(pokemon) && pokemon.type.includes('Psychic') && pokemon.eggGroup.includes('Field')

      expect(JSON.parse(actual).every(isExpected)).to.be.true
    })

    it('returns expected Pokemon Array (mega)', () => {
      const actual = pokedex
        .canMegaEvolve()
        .get()

      const isExpected = (pokemon) =>
        isValidPokemon(pokemon) && pokemon.megaEvolution !== undefined

      expect(JSON.parse(actual).every(isExpected)).to.be.true
    })
  })
})
