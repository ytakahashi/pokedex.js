const expect = require('chai').expect

const name = require('../src/name')

describe('Name class', () => {
  it('returns corrent name', () => {
    const actual1 = name.getName('12', 'ja')
    expect(actual1).equal('バタフリー')
  })

  it('returns corrent name', () => {
    const actual1 = name.getFormName('19', 'a', 'ja')
    expect(actual1).equal('アローラのすがた')
  })
})
