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

const bst = (pokemon) => {
  return Number(pokemon.baseStats.H) +
    Number(pokemon.baseStats.A) +
    Number(pokemon.baseStats.B) +
    Number(pokemon.baseStats.C) +
    Number(pokemon.baseStats.D) +
    Number(pokemon.baseStats.S)
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
      const actual = pokedex.id(25).get()
      const expected = '[{"id":"25","name":"ピカチュウ","type":["でんき"],"ability":[{"name":"せいでんき","hidden":false},{"name":"ひらいしん","hidden":true}],"eggGroup":["陸上","妖精"],"baseStats":{"H":"35","A":"55","B":"40","C":"50","D":"50","S":"90"},"generation":1}]'

      expect(actual).to.deep.equal(expected)
    })

    it('returns expected Pokemon (name: ピカチュウ)', () => {
      const actual = pokedex.name('ピカチュウ').get()
      const expected = '[{"id":"25","name":"ピカチュウ","type":["でんき"],"ability":[{"name":"せいでんき","hidden":false},{"name":"ひらいしん","hidden":true}],"eggGroup":["陸上","妖精"],"baseStats":{"H":"35","A":"55","B":"40","C":"50","D":"50","S":"90"},"generation":1}]'

      expect(actual).to.deep.equal(expected)
    })

    it('returns expected Pokemon Array (filter by type: でんき, generation: 1)', () => {
      const actual = pokedex.generation(1).type('でんき').get()
      const isExpected = (pokemon) =>
        isValidPokemon(pokemon) && pokemon.type.includes('でんき') && pokemon.generation === 1

      expect(JSON.parse(actual).every(isExpected)).to.be.true
    })

    it('returns expected Pokemon Array (filter by base stats: 400-500, egg group: 妖精)', () => {
      const actual = pokedex
        .baseStatTotalGe(400)
        .baseStatTotalLe(500)
        .eggGroup('妖精')
        .get()

      const isExpected = (pokemon) => isValidPokemon(pokemon) &&
        pokemon.eggGroup.includes('妖精') &&
        bst(pokemon) >= 400 &&
        bst(pokemon) <= 500

      expect(JSON.parse(actual).every(isExpected)).to.be.true
    })

    it('can return Pokemon with expected base stat', () => {
      const bstIn200and210Closed = JSON.parse(
        pokedex
          .baseStatTotal('>=', 200)
          .baseStatTotal('<=', '210')
          .get()
      )
      const isExpected = (pokemon) => isValidPokemon(pokemon) &&
        bst(pokemon) >= 200 && bst(pokemon) <= 210
      expect(bstIn200and210Closed.every(isExpected)).to.be.true

      const bstIn200and210 = JSON.parse(
        pokedex
          .baseStatTotal('>', '200')
          .baseStatTotal('<', 210)
          .get()
      )
      const isExpected2 = (pokemon) => isValidPokemon(pokemon) &&
        bst(pokemon) >= 200 && bst(pokemon) <= 210
      expect(bstIn200and210.every(isExpected2)).to.be.true

      const bst200 = JSON.parse(pokedex.baseStatTotal('=', 200).get())
      const isExpected3 = (pokemon) => isValidPokemon(pokemon) && bst(pokemon) === 200
      expect(bst200.every(isExpected3)).to.be.true

      const bst210 = JSON.parse(pokedex.baseStatTotal('=', '210').get())
      const isExpected4 = (pokemon) => isValidPokemon(pokemon) && bst(pokemon) === 210
      expect(bst210.every(isExpected4)).to.be.true

      expect(bst200.length + bstIn200and210.length + bst210.length)
        .to.equal(bstIn200and210Closed.length)
    })

    it('returns empty array for not defined name', () => {
      const actual = pokedex.name('foo').get()
      expect(actual).to.deep.equal('[]')
    })

    it('returns empty array for not defined id', () => {
      const actual = pokedex.id(0).get()
      expect(actual).to.deep.equal('[]')
    })
  })

  describe('language: en)', () => {
    let pokedex = new Pokedex('en')

    it('returns expected Pokemon (id: 25)', () => {
      const actual = pokedex.id(25).get()
      const expected = '[{"id":"25","name":"Pikachu","type":["Electric"],"ability":[{"name":"Static","hidden":false},{"name":"Lightning Rod","hidden":true}],"eggGroup":["Field","Fairy"],"baseStats":{"H":"35","A":"55","B":"40","C":"50","D":"50","S":"90"},"generation":1}]'
      expect(actual).to.deep.equal(expected)
    })

    it('returns expected Pokemon (name: Pikachu)', () => {
      const actual = pokedex.name('Pikachu').get()
      const expected = '[{"id":"25","name":"Pikachu","type":["Electric"],"ability":[{"name":"Static","hidden":false},{"name":"Lightning Rod","hidden":true}],"eggGroup":["Field","Fairy"],"baseStats":{"H":"35","A":"55","B":"40","C":"50","D":"50","S":"90"},"generation":1}]'
      expect(actual).to.deep.equal(expected)
    })

    it('returns expected Pokemon Array (filter by type: Psychic, eggGroup: Field)', () => {
      const actual = pokedex.type('Psychic').eggGroup('Field').get()
      const isExpected = (pokemon) =>
        isValidPokemon(pokemon) && pokemon.type.includes('Psychic') && pokemon.eggGroup.includes('Field')

      expect(JSON.parse(actual).every(isExpected)).to.be.true
    })

    it('returns expected Pokemon Array (mega)', () => {
      const actual = pokedex.canMegaEvolve().get()
      const isExpected = (pokemon) => isValidPokemon(pokemon) && pokemon.megaEvolution !== undefined

      expect(JSON.parse(actual).every(isExpected)).to.be.true
    })

    it('throws exception for undefined operator of base stat total', () => {
      expect(() => pokedex.baseStatTotal('a', 100))
        .to.throw('Invalid operator (a).')
    })
  })
})

describe('Pokedex class (deprecated methods)', () => {
  describe('language ja)', () => {
    const pokedex = new Pokedex()

    it('returns expected Pokemon (id: 25)', () => {
      const actual = pokedex.getById(25)
      const expected = '[{"id":"25","name":"ピカチュウ","type":["でんき"],"ability":[{"name":"せいでんき","hidden":false},{"name":"ひらいしん","hidden":true}],"eggGroup":["陸上","妖精"],"baseStats":{"H":"35","A":"55","B":"40","C":"50","D":"50","S":"90"},"generation":1}]'

      expect(actual).to.deep.equal(expected)
    })

    it('returns expected Pokemon (name: ピカチュウ)', () => {
      const actual = pokedex.getByName('ピカチュウ')
      const expected = '[{"id":"25","name":"ピカチュウ","type":["でんき"],"ability":[{"name":"せいでんき","hidden":false},{"name":"ひらいしん","hidden":true}],"eggGroup":["陸上","妖精"],"baseStats":{"H":"35","A":"55","B":"40","C":"50","D":"50","S":"90"},"generation":1}]'

      expect(actual).to.deep.equal(expected)
    })

    it('returns expected Pokemon Array (filter by type: でんき, generation: 1)', () => {
      const actual = pokedex.ofGeneration(1).withType('でんき').get()

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

      const bst = (pokemon) => {
        return Number(pokemon.baseStats.H) +
          Number(pokemon.baseStats.A) +
          Number(pokemon.baseStats.B) +
          Number(pokemon.baseStats.C) +
          Number(pokemon.baseStats.D) +
          Number(pokemon.baseStats.S)
      }

      const isExpected = (pokemon) => isValidPokemon(pokemon) &&
        pokemon.eggGroup.includes('妖精') &&
        bst(pokemon) >= 400 &&
        bst(pokemon) <= 500

      expect(JSON.parse(actual).every(isExpected)).to.be.true
    })

    it('returns undefined for not defined name', () => {
      const actual = pokedex.getByName('foo')
      expect(actual).to.deep.equal('[]')
    })

    it('returns undefined for not defined id', () => {
      const actual = pokedex.getById(0)
      expect(actual).to.deep.equal('[]')
    })
  })

  describe('language: en)', () => {
    let pokedex = new Pokedex('en')

    it('returns expected Pokemon (id: 25)', () => {
      const actual = pokedex.getById(25)
      const expected = '[{"id":"25","name":"Pikachu","type":["Electric"],"ability":[{"name":"Static","hidden":false},{"name":"Lightning Rod","hidden":true}],"eggGroup":["Field","Fairy"],"baseStats":{"H":"35","A":"55","B":"40","C":"50","D":"50","S":"90"},"generation":1}]'
      expect(actual).to.deep.equal(expected)
    })

    it('returns expected Pokemon (name: Pikachu)', () => {
      const actual = pokedex.getByName('Pikachu')
      const expected = '[{"id":"25","name":"Pikachu","type":["Electric"],"ability":[{"name":"Static","hidden":false},{"name":"Lightning Rod","hidden":true}],"eggGroup":["Field","Fairy"],"baseStats":{"H":"35","A":"55","B":"40","C":"50","D":"50","S":"90"},"generation":1}]'
      expect(actual).to.deep.equal(expected)
    })

    it('returns expected Pokemon Array (filter by type: Psychic, eggGroup: Field)', () => {
      const actual = pokedex.withType('Psychic').belongsToEggGroup('Field').get()
      const isExpected = (pokemon) =>
        isValidPokemon(pokemon) && pokemon.type.includes('Psychic') && pokemon.eggGroup.includes('Field')

      expect(JSON.parse(actual).every(isExpected)).to.be.true
    })

    it('returns expected Pokemon Array (mega)', () => {
      const actual = pokedex.canMegaEvolve().get()
      const isExpected = (pokemon) => isValidPokemon(pokemon) && pokemon.megaEvolution !== undefined

      expect(JSON.parse(actual).every(isExpected)).to.be.true
    })
  })
})
