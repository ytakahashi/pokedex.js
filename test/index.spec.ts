/* eslint no-unused-expressions: 0 */

import { fail } from 'assert'
import { expect } from 'chai'
import { Validator } from 'jsonschema'
import Pokedex from '../src/index'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const schema = require('../src/resources/schema.json')
const v = new Validator()
const isValidPokemon = (value): boolean => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const validateResult = v.validate(value, schema)
  if (validateResult.errors.length === 0) {
    return true
  } else {
    console.log(JSON.stringify(value))
    console.log(JSON.stringify(validateResult.errors))
    return false
  }
}

describe('Pokedex class (ts)', () => {
  describe('language ja)', () => {
    const pokedex = new Pokedex()
    it('returns expected Pokemon (id: 25)', () => {
      const actual = pokedex.id(25).getPokemonAsJson()
      const expected =
        '[{"id":"25","localId":{"galar":"194","paldea":"74"},"name":"ピカチュウ","type":["でんき"],"ability":[{"name":"せいでんき","hidden":false},{"name":"ひらいしん","hidden":true}],"eggGroup":["陸上","妖精"],"baseStats":{"H":"35","A":"55","B":"40","C":"50","D":"50","S":"90"},"generation":1}]'

      expect(actual).to.equal(expected)
    })

    it('returns expected Pokemon (name: ピカチュウ)', () => {
      const actual = pokedex.name('ピカチュウ').getPokemon()
      expect(actual).to.have.length(1)
      expect(actual[0].id).to.equal('25')
      if (actual[0].localId === undefined) {
        fail()
      }
      expect(actual[0].localId.galar).to.equal('194')
      expect(actual[0].localId.paldea).to.equal('74')
      expect(actual[0].name).to.equal('ピカチュウ')
      expect(actual[0].type).to.have.length(1)
      expect(actual[0].type[0]).to.equal('でんき')
      expect(actual[0].ability).to.have.length(2)
      expect(actual[0].ability[0]).to.deep.equal({
        name: 'せいでんき',
        hidden: false,
        terastallised: undefined
      })
      expect(actual[0].ability[1]).to.deep.equal({
        name: 'ひらいしん',
        hidden: true,
        terastallised: undefined
      })
      expect(actual[0].eggGroup).to.have.length(2)
      expect(actual[0].eggGroup).to.contain('陸上', '妖精')
      expect(actual[0].baseStats.H).to.equal('35')
      expect(actual[0].baseStats.A).to.equal('55')
      expect(actual[0].baseStats.B).to.equal('40')
      expect(actual[0].baseStats.C).to.equal('50')
      expect(actual[0].baseStats.D).to.equal('50')
      expect(actual[0].baseStats.S).to.equal('90')
      expect(actual[0].baseStats.total).to.equal(320)
      expect(actual[0].generation).to.equal(1)
    })

    it('sorts lexicographically', () => {
      const actual = pokedex
        .type('はがね')
        .type('フェアリー')
        .sort('Lexicographical')
        .getPokemon()

      expect(actual).to.have.length(7)
      expect(actual[0].name).to.equal('カヌチャン')
      expect(actual[1].name).to.equal('クチート')
      expect(actual[2].name).to.equal('クレッフィ')
      expect(actual[3].name).to.equal('ザシアン')
      expect(actual[3].formName).to.equal('けんのおう')
      expect(actual[4].name).to.equal('デカヌチャン')
      expect(actual[5].name).to.equal('ナカヌチャン')
      expect(actual[6].name).to.equal('マギアナ')
    })

    it('sorts by national number', () => {
      const actual = pokedex
        .type('はがね')
        .type('フェアリー')
        .sort('NationalNumber')
        .getPokemon()

      expect(actual).to.have.length(7)
      expect(actual[0].id).to.equal('303')
      expect(actual[1].id).to.equal('707')
      expect(actual[2].id).to.equal('801')
      expect(actual[3].id).to.equal('888')
      expect(actual[4].id).to.equal('957')
      expect(actual[5].id).to.equal('958')
      expect(actual[6].id).to.equal('959')
    })
  })

  describe('language: en)', () => {
    const pokedex = new Pokedex('en')
    it('returns expected Pokemon (id: 25)', () => {
      const actual = pokedex.id(25).getPokemon()
      expect(actual).to.have.length(1)
      expect(actual[0].id).to.equal('25')
      if (actual[0].localId === undefined) {
        fail()
      }
      expect(actual[0].localId.galar).to.equal('194')
      expect(actual[0].localId.paldea).to.equal('74')
      expect(actual[0].name).to.equal('Pikachu')
      expect(actual[0].type).to.have.length(1)
      expect(actual[0].type[0]).to.equal('Electric')
      expect(actual[0].ability).to.have.length(2)
      expect(actual[0].ability[0]).to.deep.equal({
        name: 'Static',
        hidden: false,
        terastallised: undefined
      })
      expect(actual[0].ability[1]).to.deep.equal({
        name: 'Lightning Rod',
        hidden: true,
        terastallised: undefined
      })
      expect(actual[0].eggGroup).to.have.length(2)
      expect(actual[0].eggGroup).to.contain('Field', 'Fairy')
      expect(actual[0].baseStats.H).to.equal('35')
      expect(actual[0].baseStats.A).to.equal('55')
      expect(actual[0].baseStats.B).to.equal('40')
      expect(actual[0].baseStats.C).to.equal('50')
      expect(actual[0].baseStats.D).to.equal('50')
      expect(actual[0].baseStats.S).to.equal('90')
      expect(actual[0].baseStats.total).to.equal(320)
      expect(actual[0].generation).to.equal(1)
    })

    it('returns expected Pokemon (name: Pikachu)', () => {
      const actual = pokedex.id(25).getPokemonAsJson()
      const expected =
        '[{"id":"25","localId":{"galar":"194","paldea":"74"},"name":"Pikachu","type":["Electric"],"ability":[{"name":"Static","hidden":false},{"name":"Lightning Rod","hidden":true}],"eggGroup":["Field","Fairy"],"baseStats":{"H":"35","A":"55","B":"40","C":"50","D":"50","S":"90"},"generation":1}]'
      expect(actual).to.equal(expected)
    })

    it('sorts lexicographically', () => {
      const actual = pokedex
        .type('Steel')
        .type('Fairy')
        .sort('Lexicographical')
        .getPokemon()

      expect(actual).to.have.length(7)
      expect(actual[0].name).to.equal('Klefki')
      expect(actual[1].name).to.equal('Magearna')
      expect(actual[2].name).to.equal('Mawile')
      expect(actual[3].name).to.equal('Tinkatink')
      expect(actual[4].name).to.equal('Tinkaton')
      expect(actual[5].name).to.equal('Tinkatuff')
      expect(actual[6].name).to.equal('Zacian')
      expect(actual[6].formName).to.equal('Crowned Sword')
    })

    it('sorts by national number', () => {
      const actual = pokedex
        .type('Steel')
        .type('Fairy')
        .sort('NationalNumber')
        .getPokemon()

      expect(actual).to.have.length(7)
      expect(actual[0].id).to.equal('303')
      expect(actual[1].id).to.equal('707')
      expect(actual[2].id).to.equal('801')
      expect(actual[3].id).to.equal('888')
      expect(actual[4].id).to.equal('957')
      expect(actual[5].id).to.equal('958')
      expect(actual[6].id).to.equal('959')
    })
  })

  describe('common', () => {
    const pokedex = new Pokedex()
    const formCountMap = {
      19: 2,
      20: 2,
      26: 2,
      27: 2,
      28: 2,
      37: 2,
      38: 2,
      50: 2,
      51: 2,
      52: 3,
      53: 2,
      58: 2,
      59: 2,
      74: 2,
      75: 2,
      76: 2,
      77: 2,
      78: 2,
      79: 2,
      80: 2,
      83: 2,
      88: 2,
      89: 2,
      100: 2,
      101: 2,
      103: 2,
      105: 2,
      110: 2,
      122: 2,
      128: 4,
      144: 2,
      145: 2,
      146: 2,
      157: 2,
      194: 2,
      199: 2,
      211: 2,
      215: 2,
      222: 2,
      263: 2,
      264: 2,
      386: 4,
      413: 3,
      479: 6,
      483: 2,
      484: 2,
      487: 2,
      492: 2,
      503: 2,
      549: 2,
      550: 3,
      554: 2,
      555: 4,
      562: 2,
      570: 2,
      571: 2,
      618: 2,
      628: 2,
      641: 2,
      642: 2,
      645: 2,
      646: 3,
      647: 2,
      648: 2,
      678: 2,
      681: 2,
      705: 2,
      706: 2,
      710: 4,
      711: 4,
      713: 2,
      718: 3,
      720: 2,
      724: 2,
      741: 4,
      745: 3,
      746: 2,
      774: 2,
      800: 3,
      849: 2,
      875: 2,
      876: 2,
      888: 2,
      889: 2,
      890: 2,
      892: 2,
      898: 3,
      901: 2,
      902: 2,
      905: 2,
      916: 2,
      964: 2,
      1017: 4,
      1024: 3
    }

    it('returns all Pokemon', () => {
      const totalCount = 1025

      const all = pokedex.getPokemon()
      expect(all.every((pokemon) => isValidPokemon(pokemon))).to.equal(true)
      const allIds = all.map(p => p.id)
      const unique = new Set(allIds)
      expect(unique).to.have.length(totalCount)

      for (let i = 1; i <= totalCount; i++) {
        const actual = pokedex.id(i).getPokemon()
        const actualLength = actual.length
        const expectedLength = formCountMap[String(i)] ?? 1
        expect(actualLength).to.equal(expectedLength, `id: ${i}`)
      }
    })
  })
})
