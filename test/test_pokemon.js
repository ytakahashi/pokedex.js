const expect = require('chai').expect

const { Pokemon, Pokemons } = require('../src/pokemon')

describe('Pokemon class', () => {
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
    })

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
    expect(pikachu.eggGroups)
      .to.be.an('array')
      .that.has.lengthOf(2)
      .and.that.include('陸上')
      .and.that.include('妖精')
  })
})

describe('Pokemons class', () => {
  const pokemons = new Pokemons()

  it('returns expected Pokemon (id)', () => {
    const actual = pokemons.getPokemonById(25)

    const expected = new Pokemon({
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
    })

    expect(actual)
      .to.deep.equal(expected)
  })

  it('returns expected Pokemon (name)', () => {
    const actual = pokemons.getPokemonByName('ピカチュウ')

    const expected = new Pokemon({
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
    })

    expect(actual)
      .to.deep.equal(expected)
  })

  it('returns undefined for not defined id', () => {
    const actual = pokemons.getPokemonById(0)
    expect(actual)
      .to.be.an('undefined')
  })

  it('returns pokemon array', () => {
    expect(pokemons.getPokemonByIds([1, 10, 100]))
      .to.have.length(3)
  })

  // it('throws error for undefined id', () => {
  //   expect(() => pokemons.getPokemonById('0'))
  //     .to.throw(ReferenceError, 'Not defined id (0)')
  // })
})
