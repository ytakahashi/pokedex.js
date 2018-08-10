/* eslint no-unused-expressions: 0 */

const expect = require('chai').expect

const Pokedex = require('../src/index')

var Validator = require('jsonschema').Validator
var v = new Validator()

const schema = require('../src/resources/schema.json')

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

      const expected = '{"id":"25","name":"ピカチュウ","type":["でんき"],"ability":[{"name":"せいでんき","hidden":false},{"name":"ひらいしん","hidden":true}],"eggGroup":["陸上","妖精"],"baseStats":{"H":"35","A":"55","B":"40","C":"50","D":"50","S":"90"},"generation":1}'

      expect(actual)
        .to.deep.equal(expected)
    })

    it('returns expected Pokemon (name: ピカチュウ)', () => {
      const actual = pokedex.getByName('ピカチュウ')

      const expected = '{"id":"25","name":"ピカチュウ","type":["でんき"],"ability":[{"name":"せいでんき","hidden":false},{"name":"ひらいしん","hidden":true}],"eggGroup":["陸上","妖精"],"baseStats":{"H":"35","A":"55","B":"40","C":"50","D":"50","S":"90"},"generation":1}'

      expect(actual)
        .to.deep.equal(expected)
    })

    const isValidPokemons = (value) => {
      const validateResult = v.validate(value, schema)
      if (validateResult.errors.length === 0) {
        return true
      } else {
        console.log(validateResult)
      }
    }

    it('returns expected Pokemon Array (filter by type: でんき, generation: 1)', () => {
      const actual = pokedex
        .ofGeneration(1)
        .withType('でんき')
        .get()

      expect(JSON.parse(actual).every(isValidPokemons)).to.be.true
    })

    it('returns expected Pokemon Array (filter by base status: 400-500, egg group: 妖精)', () => {
      const actual = pokedex
        .totalBaseStatsGe(400)
        .totalBaseStatsLe(500)
        .belongsToEggGroup('妖精')
        .get()

      expect(JSON.parse(actual).every(isValidPokemons)).to.be.true
    })

    it('returns undefined for not defined name', () => {
      const actual = pokedex.getById('foo')
      expect(actual)
        .to.be.an('undefined')
    })

    it('returns undefined for not defined id', () => {
      const actual = pokedex.getById(0)
      expect(actual)
        .to.be.an('undefined')
    })
  })

  describe('language: en)', () => {
    let pokedex = new Pokedex('en')

    it('returns expected Pokemon (id: 25)', () => {
      const actual = pokedex.getById(25)

      const expected = '{"id":"25","name":"Pikachu","type":["Electric"],"ability":[{"name":"Static","hidden":false},{"name":"Lightning Rod","hidden":true}],"eggGroup":["Field","Fairy"],"baseStats":{"H":"35","A":"55","B":"40","C":"50","D":"50","S":"90"},"generation":1}'
      expect(actual)
        .to.deep.equal(expected)
    })
  })
})
