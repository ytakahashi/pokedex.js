/* eslint no-unused-expressions: 0 */

const expect = require('chai').expect

const { Pokemon } = require('../src/pokemon')

describe('Pokemon class (language: ja)', () => {
  it('returns corrent properties for ピカチュウ', () => {
    const pikachu = new Pokemon({
      id: '25',
      localId: {
        galar: '194'
      },
      name: 'ピカチュウ',
      type: ['でんき'],
      abilities: [
        {
          name: 'せいでんき'
        },
        {
          name: '*ひらいしん'
        }
      ],
      status: {
        H: '35',
        A: '55',
        B: '40',
        C: '50',
        D: '50',
        S: '90'
      },
      egg_groups: [
        '陸上',
        '妖精'
      ]
    },
    1,
    'ja')

    expect(pikachu.id)
      .to.equal('25')
    expect(pikachu.localId.galar)
      .to.equal('194')
    expect(pikachu.name)
      .to.equal('ピカチュウ')
    expect(pikachu.formName)
      .to.be.undefined
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
    expect(pikachu.megaEvolution)
      .to.be.undefined
  })

  it('returns corrent properties for Alola Raichu', () => {
    const actual = new Pokemon({
      id: '26',
      formId: 'a',
      name: 'ライチュウ',
      type: [
        'でんき',
        'エスパー'
      ],
      abilities: [
        {
          name: 'サーフテール'
        }
      ],
      status: {
        H: '60',
        A: '85',
        B: '50',
        C: '95',
        D: '85',
        S: '110'
      },
      egg_groups: [
        '陸上',
        '妖精'
      ]
    },
    null,
    'en')

    expect(actual.id)
      .to.equal('26')
    expect(actual.localId)
      .to.be.undefined
    expect(actual.name)
      .to.equal('Raichu')
    expect(actual.formName)
      .to.equal('Alola Form')
    expect(actual.type)
      .to.be.an('array')
      .that.has.lengthOf(2)
      .and.that.include('Electric')
      .and.that.include('Psychic')
    expect(actual.baseStats)
      .to.have.all.keys('H', 'A', 'B', 'C', 'D', 'S')
    expect(actual.eggGroup)
      .to.be.an('array')
      .that.has.lengthOf(2)
      .and.that.include('Field')
      .and.that.include('Fairy')
    expect(actual.megaEvolution)
      .to.be.undefined
    expect(actual.generation)
      .to.be.undefined
  })

  it('returns corrent properties for リザードン', () => {
    const actual = new Pokemon({
      id: '6',
      localId: {
        galar: '380'
      },
      name: 'リザードン',
      type: [
        'ほのお',
        'ひこう'
      ],
      abilities: [
        {
          name: 'もうか'
        },
        {
          name: '*サンパワー'
        }
      ],
      status: {
        H: '78',
        A: '84',
        B: '78',
        C: '109',
        D: '85',
        S: '100'
      },
      egg_groups: [
        '怪獣',
        'ドラゴン'
      ],
      mega_evolve: true
    },
    1,
    'ja')

    expect(actual.id)
      .to.equal('6')
    expect(actual.localId.galar)
      .to.equal('380')
    expect(actual.name)
      .to.equal('リザードン')
    expect(actual.formName)
      .to.be.undefined
    expect(actual.type)
      .to.be.an('array')
      .that.has.lengthOf(2)
      .and.that.include('ほのお')
      .and.that.include('ひこう')
    expect(actual.baseStats)
      .to.have.all.keys('H', 'A', 'B', 'C', 'D', 'S')
    expect(actual.eggGroup)
      .to.be.an('array')
      .that.has.lengthOf(2)
      .and.that.include('怪獣')
      .and.that.include('ドラゴン')
    expect(actual.megaEvolution)
      .to.be.an('array')
      .that.has.lengthOf(2)
    expect(actual.megaEvolution[0])
      .to.have.all.keys('name', 'ability', 'type', 'baseStats')
    expect(actual.megaEvolution[1])
      .to.have.all.keys('name', 'ability', 'type', 'baseStats')
  })
})

describe('Pokemon class (language: en)', () => {
  it('returns corrent properties for Venusaur', () => {
    const actual = new Pokemon({
      id: '3',
      name: 'フシギバナ',
      type: [
        'くさ',
        'どく'
      ],
      abilities: [
        {
          name: 'しんりょく'
        },
        {
          name: '*ようりょくそ'
        }
      ],
      status: {
        H: '80',
        A: '82',
        B: '83',
        C: '100',
        D: '100',
        S: '80'
      },
      egg_groups: [
        '怪獣',
        '植物'
      ],
      mega_evolve: true
    },
    1,
    'en')

    expect(actual.id)
      .to.equal('3')
    expect(actual.localId)
      .to.be.undefined
    expect(actual.name)
      .to.equal('Venusaur')
    expect(actual.formName)
      .to.be.undefined
    expect(actual.type)
      .to.be.an('array')
      .that.has.lengthOf(2)
      .and.that.include('Grass')
      .and.that.include('Poison')
    expect(actual.baseStats)
      .to.have.all.keys('H', 'A', 'B', 'C', 'D', 'S')
    expect(actual.eggGroup)
      .to.be.an('array')
      .that.has.lengthOf(2)
      .and.that.include('Monster')
      .and.that.include('Grass')
    expect(actual.megaEvolution)
      .to.be.an('array')
      .that.has.lengthOf(1)
    expect(actual.megaEvolution[0])
      .to.have.all.keys('name', 'ability', 'type', 'baseStats')
  })
})
