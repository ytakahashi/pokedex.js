/* eslint no-unused-expressions: 0 */

const expect = require('chai').expect

const { Pokemon } = require('../src/pokemon')

describe('Pokemon class (language: ja)', () => {
  it('returns corrent properties', () => {
    const pikachu = new Pokemon({
      'id': '25',
      'name': 'ピカチュウ',
      'type': ['でんき'],
      'abilities': [
        {
          'name': 'せいでんき'
        },
        {
          'name': '*ひらいしん'
        }
      ],
      'status': {
        'H': '35',
        'A': '55',
        'B': '40',
        'C': '50',
        'D': '50',
        'S': '90'
      },
      'egg_groups': [
        '陸上',
        '妖精'
      ]
    },
    1,
    'ja')

    expect(pikachu.id)
      .to.equal('25')
    expect(pikachu.name)
      .to.equal('ピカチュウ')
    expect(pikachu.type)
      .to.be.an('array')
      .that.has.lengthOf(1)
      .and.that.include('でんき')
    expect(pikachu.baseStats)
      .to.have.all.keys('H', 'A', 'B', 'C', 'D', 'S')
    expect(pikachu.eggGroup)
      .to.be.an('array')
      .that.has.lengthOf(2)
      .and.that.include('陸上')
      .and.that.include('妖精')
  })
})
