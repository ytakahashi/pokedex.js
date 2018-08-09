/* eslint no-unused-expressions: 0 */

const expect = require('chai').expect

const { Pokemon, Pokemons } = require('../src/pokemon')

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
    expect(pikachu.baseStatus)
      .to.have.all.keys('H', 'A', 'B', 'C', 'D', 'S')
    expect(pikachu.eggGroup)
      .to.be.an('array')
      .that.has.lengthOf(2)
      .and.that.include('陸上')
      .and.that.include('妖精')
  })
})

describe('Pokemons class', () => {
  const pokemonValidator = (pokemon) => {
    expect(pokemon.id).to.exist
    expect(pokemon.name).to.exist
    expect(pokemon.type).to.exist
    expect(pokemon.baseStatus).to.exist
    expect(pokemon.eggGroup).to.exist
    return true
  }

  it('returns pokemon array (lang: ja)', () => {
    const pokemons = new Pokemons('ja')
    const allPokemons = pokemons.getAll()
    expect(allPokemons).to.have.length(807)

    expect(allPokemons.every(pokemonValidator)).to.be.true
  })

  it('returns pokemon array (lang: en)', () => {
    const pokemons = new Pokemons('en')
    const allPokemons = pokemons.getAll()
    expect(allPokemons).to.have.length(807)

    expect(allPokemons.every(pokemonValidator)).to.be.true
  })
})
