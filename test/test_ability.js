const expect = require('chai').expect

const ability = require('../src/ability')
describe('Ability class', () => {
  it('test ability', () => {
    const abilities = [
      {
        name: 'しんりょく'
      },
      {
        name: '*ようりょくそ'
      }
    ]

    const actual = ability.getAbility(abilities)
    expect(actual).to.have.length(2)
  })
})
