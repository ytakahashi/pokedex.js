const Pokedex = require('./src/index.js')

const pokedexJp = new Pokedex()
const pokedexEn = new Pokedex('en')

console.log(pokedexEn.getByName('Pikachu'))

console.log('\n')

console.log(pokedexEn.getById(26))

console.log('\n')

console.log(
  pokedexEn.withType('Water').withType('Fairy').get()
)

console.log('\n')

console.log(
  pokedexEn
    .totalBaseStatsGe(580)
    .totalBaseStatsLe(600)
    .ofGeneration(2)
    .get()
)

console.log('\n')

console.log(pokedexJp.getByName('ピカチュウ'))

console.log('\n')

console.log(pokedexJp.getById(26))

console.log('\n')

console.log(
  pokedexJp.withType('みず').withType('フェアリー').get()
)

console.log('\n')

console.log(
  pokedexJp
    .totalBaseStatsGe(580)
    .totalBaseStatsLe(600)
    .ofGeneration(2)
    .get()
)
