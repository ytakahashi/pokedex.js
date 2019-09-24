const expect = require('chai').expect

const Status = require('../src/status')

describe('Status class', () => {
  it('returns corrent properties', () => {
    const status = new Status(
      {
        H: '35',
        A: '55',
        B: '40',
        C: '50',
        D: '50',
        S: '90'
      }
    )

    expect(status.H).equal('35')
    expect(status.A).equal('55')
    expect(status.B).equal('40')
    expect(status.C).equal('50')
    expect(status.D).equal('50')
    expect(status.S).equal('90')
    expect(status.total).equal(320)
  })
})
