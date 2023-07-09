/* eslint no-unused-expressions: 0 */

const expect = require('chai').expect

const { Pokemon } = require('../src/pokemon')

const venusaurObj = require('../test_resources/venusaur.json')
const charizardObj = require('../test_resources/charizard.json')
const pikachuObj = require('../test_resources/pikachu.json')
const raichuObj = require('../test_resources/raichu.json')
const alolaRaichuObj = require('../test_resources/alola_raichu.json')
const meouthObj = require('../test_resources/meouth.json')
const alolaMeouthObj = require('../test_resources/alola_meouth.json')
const galarMeouthObj = require('../test_resources/galar_meouth.json')

describe('Pokemon class (language: ja)', () => {
  const language = 'ja'

  describe('constructor', () => {
    it('initializes correct properties for ピカチュウ', () => {
      const pikachu = new Pokemon(pikachuObj, 1, language)

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

    it('initializes correct properties for リザードン', () => {
      const actual = new Pokemon(charizardObj, 1, language)

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

  describe('#compareName', () => {
    const pikachu = new Pokemon(pikachuObj, 1, language)
    const meouth = new Pokemon(meouthObj, null, language)
    const alolaMeouth = new Pokemon(alolaMeouthObj, null, language)
    const galarMeouth = new Pokemon(galarMeouthObj, null, language)

    it('compares same Pokémon', () => {
      const actual = pikachu.compareName(pikachu)
      expect(actual).to.equal(0)
    })
    it('compares different Pokémon', () => {
      const actual = pikachu.compareName(meouth)
      expect(actual).to.equal(1)

      const actual2 = meouth.compareName(pikachu)
      expect(actual2).to.equal(-1)
    })
    it('compares same Pokémon in different region', () => {
      const actual = alolaMeouth.compareName(meouth)
      expect(actual).to.equal(1)

      const actual2 = meouth.compareName(alolaMeouth)
      expect(actual2).to.equal(-1)

      const actual3 = galarMeouth.compareName(alolaMeouth)
      expect(actual3).to.equal(1)

      const actual4 = alolaMeouth.compareName(galarMeouth)
      expect(actual4).to.equal(-1)
    })
  })

  describe('#compareId', () => {
    const pikachu = new Pokemon(pikachuObj, 1, language)
    const raichu = new Pokemon(raichuObj, 1, language)
    const alolaRaichu = new Pokemon(alolaRaichuObj, null, language)

    it('compares same Pokémon', () => {
      const actual = pikachu.compareId(pikachu)
      expect(actual).to.equal(0)
    })
    it('compares different Pokémon', () => {
      const actual = pikachu.compareId(raichu)
      expect(actual).to.equal(-1)
    })
    it('compares same Pokémon in different region', () => {
      const actual = alolaRaichu.compareId(raichu)
      expect(actual).to.equal(1)

      const actual2 = raichu.compareId(alolaRaichu)
      expect(actual2).to.equal(-1)
    })
  })
})

describe('Pokemon class (language: en)', () => {
  const language = 'en'

  describe('constructor', () => {
    it('initializes correct properties for Alola Raichu', () => {
      const actual = new Pokemon(alolaRaichuObj, null, language)

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

    it('initializes correct properties for Venusaur', () => {
      const actual = new Pokemon(venusaurObj, 1, language)

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

  describe('#compareName', () => {
    const pikachu = new Pokemon(pikachuObj, 1, language)
    const meouth = new Pokemon(meouthObj, null, language)
    const alolaMeouth = new Pokemon(alolaMeouthObj, null, language)
    const galarMeouth = new Pokemon(galarMeouthObj, null, language)

    it('compares same Pokémon', () => {
      const actual = pikachu.compareName(pikachu)
      expect(actual).to.equal(0)
    })
    it('compares different Pokémon', () => {
      const actual = pikachu.compareName(meouth)
      expect(actual).to.equal(1)

      const actual2 = meouth.compareName(pikachu)
      expect(actual2).to.equal(-1)
    })
    it('compares same Pokémon in different region', () => {
      const actual = alolaMeouth.compareName(meouth)
      expect(actual).to.equal(1)

      const actual2 = meouth.compareName(alolaMeouth)
      expect(actual2).to.equal(-1)

      const actual3 = galarMeouth.compareName(alolaMeouth)
      expect(actual3).to.equal(1)

      const actual4 = alolaMeouth.compareName(galarMeouth)
      expect(actual4).to.equal(-1)
    })
  })

  describe('#compareId', () => {
    const pikachu = new Pokemon(pikachuObj, 1, language)
    const raichu = new Pokemon(raichuObj, 1, language)
    const alolaRaichu = new Pokemon(alolaRaichuObj, null, language)

    it('compares same Pokémon', () => {
      const actual = pikachu.compareId(pikachu)
      expect(actual).to.equal(0)
    })
    it('compares different Pokémon', () => {
      const actual = pikachu.compareId(raichu)
      expect(actual).to.equal(-1)
    })
    it('compares same Pokémon in different region', () => {
      const actual = alolaRaichu.compareId(raichu)
      expect(actual).to.equal(1)

      const actual2 = raichu.compareId(alolaRaichu)
      expect(actual2).to.equal(-1)
    })
  })
})
