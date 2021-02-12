/* eslint no-unused-expressions: 0 */

import { fail } from 'assert'
import { expect } from 'chai'
import Pokedex from '../src/index'

describe('Pokedex class (ts)', () => {
  describe('language ja)', () => {
    const pokedex = new Pokedex()
    it('returns expected Pokemon (id: 25)', () => {
      const actual = pokedex.id(25).getPokemonAsJson()
      const expected = '[{"id":"25","localId":{"galar":"194"},"name":"ピカチュウ","type":["でんき"],"ability":[{"name":"せいでんき","hidden":false},{"name":"ひらいしん","hidden":true}],"eggGroup":["陸上","妖精"],"baseStats":{"H":"35","A":"55","B":"40","C":"50","D":"50","S":"90"},"generation":1}]'

      expect(actual).to.equal(expected)
    })

    it('returns expected Pokemon (name: ピカチュウ)', () => {
      const actual = pokedex.name('ピカチュウ').getPokemon()
      expect(actual).to.have.length(1)
      expect(actual[0].id).to.equal('25')
      if (actual[0].localId.galar === undefined) {
        fail()
      }
      expect(actual[0].localId.galar).to.equal('194')
      expect(actual[0].name).to.equal('ピカチュウ')
      expect(actual[0].type).to.have.length(1)
      expect(actual[0].type[0]).to.equal('でんき')
      expect(actual[0].ability).to.have.length(2)
      expect(actual[0].ability[0]).to.deep.equal({
        name: 'せいでんき',
        hidden: false
      })
      expect(actual[0].ability[1]).to.deep.equal({
        name: 'ひらいしん',
        hidden: true
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

      expect(actual).to.have.length(4)
      expect(actual[0].name).to.equal('クチート')
      expect(actual[1].name).to.equal('クレッフィ')
      expect(actual[2].name).to.equal('ザシアン')
      expect(actual[2].formName).to.equal('けんのおう')
      expect(actual[3].name).to.equal('マギアナ')
    })

    it('sorts by national number', () => {
      const actual = pokedex
        .type('はがね')
        .type('フェアリー')
        .sort('NationalNumber')
        .getPokemon()

      expect(actual).to.have.length(4)
      expect(actual[0].id).to.equal('303')
      expect(actual[1].id).to.equal('707')
      expect(actual[2].id).to.equal('801')
      expect(actual[3].id).to.equal('888')
    })
  })

  describe('language: en)', () => {
    const pokedex = new Pokedex('en')
    it('returns expected Pokemon (id: 25)', () => {
      const actual = pokedex.id(25).getPokemon()
      expect(actual).to.have.length(1)
      expect(actual[0].id).to.equal('25')
      expect(actual[0].name).to.equal('Pikachu')
      expect(actual[0].type).to.have.length(1)
      expect(actual[0].type[0]).to.equal('Electric')
      expect(actual[0].ability).to.have.length(2)
      expect(actual[0].ability[0]).to.deep.equal({
        name: 'Static',
        hidden: false
      })
      expect(actual[0].ability[1]).to.deep.equal({
        name: 'Lightning Rod',
        hidden: true
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
      const expected = '[{"id":"25","localId":{"galar":"194"},"name":"Pikachu","type":["Electric"],"ability":[{"name":"Static","hidden":false},{"name":"Lightning Rod","hidden":true}],"eggGroup":["Field","Fairy"],"baseStats":{"H":"35","A":"55","B":"40","C":"50","D":"50","S":"90"},"generation":1}]'
      expect(actual).to.equal(expected)
    })

    it('sorts lexicographically', () => {
      const actual = JSON.parse(
        pokedex.type('Steel').type('Fairy').sort('Lexicographical').getPokemonAsJson()
      )
      expect(actual).to.have.length(4)
      expect(actual[0].name).to.equal('Klefki')
      expect(actual[1].name).to.equal('Magearna')
      expect(actual[2].name).to.equal('Mawile')
      expect(actual[3].name).to.equal('Zacian')
      expect(actual[3].formName).to.equal('Crowned Sword')
    })

    it('sorts by national number', () => {
      const actual = pokedex
        .type('Steel')
        .type('Fairy')
        .sort('NationalNumber')
        .getPokemon()

      expect(actual).to.have.length(4)
      expect(actual[0].id).to.equal('303')
      expect(actual[1].id).to.equal('707')
      expect(actual[2].id).to.equal('801')
      expect(actual[3].id).to.equal('888')
    })
  })
})
