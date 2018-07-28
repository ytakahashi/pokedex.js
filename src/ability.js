class Ability {
  constructor (ability) {
    if (ability.name.indexOf('*') === 0) {
      this.hidden = true
      this.name = ability.name.substr(1)
    } else {
      this.hidden = false
      this.name = ability.name
    }
  }
}

module.exports = Ability
