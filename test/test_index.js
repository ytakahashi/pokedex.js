const expect = require('chai').expect
const sinon = require('sinon')

const { Pokemon, Pokemons } = require('../src/pokemon')

const gen1Pokemon = require('./resources/test1.json')
const gen2Pokemon = require('./resources/test2.json')
const gen3Pokemon = require('./resources/test3.json')

const Index = require('../src/index')

describe('pokemon class', () => {
  const test = []
  for (const pokemon of gen1Pokemon) {
    test.push(new Pokemon(pokemon, 1))
  }
  for (const pokemon of gen2Pokemon) {
    test.push(new Pokemon(pokemon, 2))
  }
  for (const pokemon of gen3Pokemon) {
    test.push(new Pokemon(pokemon, 3))
  }

  const stub = sinon.stub(Pokemons.prototype, 'getAll').callsFake(() => test)
  const pokemon = new Index()

  it('returns expected Pokemon (id: 25)', () => {
    const actual = pokemon.getById(25)

    const expected = '{"id":"25","name":"ピカチュウ","type":["でんき"],"abilities":[{"hidden":false,"name":"せいでんき"},{"hidden":true,"name":"ひらいしん"}],"baseStatus":{"H":"35","A":"55","B":"40","C":"50","D":"50","S":"90"},"eggGroups":["陸上","妖精"],"generation":1}'

    expect(actual)
      .to.deep.equal(expected)
  })

  it('returns expected Pokemon (name: ピカチュウ)', () => {
    const actual = pokemon.getByName('ピカチュウ')

    const expected = '{"id":"25","name":"ピカチュウ","type":["でんき"],"abilities":[{"hidden":false,"name":"せいでんき"},{"hidden":true,"name":"ひらいしん"}],"baseStatus":{"H":"35","A":"55","B":"40","C":"50","D":"50","S":"90"},"eggGroups":["陸上","妖精"],"generation":1}'

    expect(actual)
      .to.deep.equal(expected)
  })

  it('returns expected Pokemon Array (filter by type: でんき, generation: 1)', () => {
    const actual = pokemon
      .ofGeneration(1)
      .withType('でんき')
      .get()
    const expected = '[{"id":"25","name":"ピカチュウ","type":["でんき"],"abilities":[{"hidden":false,"name":"せいでんき"},{"hidden":true,"name":"ひらいしん"}],"baseStatus":{"H":"35","A":"55","B":"40","C":"50","D":"50","S":"90"},"eggGroups":["陸上","妖精"],"generation":1}]'

    expect(actual)
      .to.deep.equal(expected)
  })

  it('returns expected Pokemon Array (filter by base status: 400-500, egg group: 妖精)', () => {
    const actual = pokemon
      .totalBaseStatusGe(400)
      .totalBaseStatusLe(500)
      .belongsToEggGroup('妖精')
      .get()
    const expected = '[{"id":"176","name":"トゲチック","type":["フェアリー","ひこう"],"abilities":[{"hidden":false,"name":"はりきり"},{"hidden":false,"name":"てんのめぐみ"},{"hidden":true,"name":"きょううん"}],"baseStatus":{"H":"55","A":"40","B":"85","C":"80","D":"105","S":"40"},"eggGroups":["飛行","妖精"],"generation":2}]'

    expect(actual)
      .to.deep.equal(expected)
  })

  it('returns undefined for not defined name', () => {
    const actual = pokemon.getById('foo')
    expect(actual)
      .to.be.an('undefined')
  })

  it('returns undefined for not defined id', () => {
    const actual = pokemon.getById(0)
    expect(actual)
      .to.be.an('undefined')
  })

  after(() => {
    stub.restore()
  })
})
