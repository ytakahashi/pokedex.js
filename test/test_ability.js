/* eslint no-unused-expressions: 0 */

const expect = require('chai').expect

const Ability = require('../src/ability')
describe('Ability class', () => {
  it('has normal ability', () => {
    const ability = new Ability({
      'name': 'せいでんき'
    })

    expect(ability.name).to.equal('せいでんき')
    expect(ability.hidden).to.be.false
  })

  it('has hidden ability', () => {
    const ability = new Ability({
      'name': '*ひらいしん'
    })

    expect(ability.name).to.equal('ひらいしん')
    expect(ability.hidden).to.be.true
  })
})
