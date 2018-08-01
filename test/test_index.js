const expect = require('chai').expect
const sinon = require('sinon')

const { Pokemon, Pokemons } = require('../src/pokemon')

const gen1Pokemon = require('./resources/test1.json')
const gen2Pokemon = require('./resources/test2.json')
const gen3Pokemon = require('./resources/test3.json')

const Pokedex = require('../src/index')

describe('Pokedex class', () => {
  let stub

  describe('language: foo)', () => {
    it('throws Error', () => {
      expect(() => new Pokedex('foo'))
        .to.throw(Error, 'Language \'foo\' is not supported.')
    })
  })

  describe('language ja)', () => {
    let pokedex

    before(() => {
      const lang = 'ja'
      const testPokemon = [].concat(
        gen1Pokemon.map(pokemon => new Pokemon(pokemon, 1, lang)),
        gen2Pokemon.map(pokemon => new Pokemon(pokemon, 2, lang)),
        gen3Pokemon.map(pokemon => new Pokemon(pokemon, 3, lang))
      )

      stub = sinon.stub(Pokemons.prototype, 'getAll').callsFake(() => testPokemon)
      pokedex = new Pokedex()
    })

    it('returns expected Pokemon (id: 25)', () => {
      const actual = pokedex.getById(25)

      const expected = '{"id":"25","name":"ピカチュウ","type":["でんき"],"ability":[{"name":"せいでんき","hidden":false},{"name":"ひらいしん","hidden":true}],"eggGroup":["陸上","妖精"],"baseStatus":{"H":"35","A":"55","B":"40","C":"50","D":"50","S":"90"},"generation":1}'

      expect(actual)
        .to.deep.equal(expected)
    })

    it('returns expected Pokemon (name: ピカチュウ)', () => {
      const actual = pokedex.getByName('ピカチュウ')

      const expected = '{"id":"25","name":"ピカチュウ","type":["でんき"],"ability":[{"name":"せいでんき","hidden":false},{"name":"ひらいしん","hidden":true}],"eggGroup":["陸上","妖精"],"baseStatus":{"H":"35","A":"55","B":"40","C":"50","D":"50","S":"90"},"generation":1}'

      expect(actual)
        .to.deep.equal(expected)
    })

    it('returns expected Pokemon Array (filter by type: でんき, generation: 1)', () => {
      const actual = pokedex
        .ofGeneration(1)
        .withType('でんき')
        .get()
      const expected = '[{"id":"25","name":"ピカチュウ","type":["でんき"],"ability":[{"name":"せいでんき","hidden":false},{"name":"ひらいしん","hidden":true}],"eggGroup":["陸上","妖精"],"baseStatus":{"H":"35","A":"55","B":"40","C":"50","D":"50","S":"90"},"generation":1}]'

      expect(actual)
        .to.deep.equal(expected)
    })

    it('returns expected Pokemon Array (filter by base status: 400-500, egg group: 妖精)', () => {
      const actual = pokedex
        .totalBaseStatusGe(400)
        .totalBaseStatusLe(500)
        .belongsToEggGroup('妖精')
        .get()
      const expected = '[{"id":"176","name":"トゲチック","type":["フェアリー","ひこう"],"ability":[{"name":"はりきり","hidden":false},{"name":"てんのめぐみ","hidden":false},{"name":"きょううん","hidden":true}],"eggGroup":["飛行","妖精"],"baseStatus":{"H":"55","A":"40","B":"85","C":"80","D":"105","S":"40"},"generation":2}]'

      expect(actual)
        .to.deep.equal(expected)
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

    after(() => {
      stub.restore()
    })
  })

  describe('language: en)', () => {
    let pokedex

    before(() => {
      const lang = 'en'
      const testPokemon = [].concat(
        gen1Pokemon.map(pokemon => new Pokemon(pokemon, 1, lang)),
        gen2Pokemon.map(pokemon => new Pokemon(pokemon, 2, lang)),
        gen3Pokemon.map(pokemon => new Pokemon(pokemon, 3, lang))
      )

      stub = sinon.stub(Pokemons.prototype, 'getAll').callsFake(() => testPokemon)

      pokedex = new Pokedex('en')
    })

    it('returns expected Pokemon (id: 25)', () => {
      const actual = pokedex.getById(25)

      const expected = '{"id":"25","name":"pikachu","type":["Electric"],"ability":[{"name":"Static","hidden":false},{"name":"Lightning Rod","hidden":true}],"eggGroup":["Field","Fairy"],"baseStatus":{"H":"35","A":"55","B":"40","C":"50","D":"50","S":"90"},"generation":1}'
      expect(actual)
        .to.deep.equal(expected)
    })
  })

  after(() => {
    stub.restore()
  })
})
