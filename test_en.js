const Pokedex = require('./src/index.js')

const pokedex = new Pokedex('ja')

// console.log(pokedex.name('Pikachu').get())

// console.log('\n')

// console.log(pokedex.id(26).get())

// console.log('\n')

// console.log(
//   pokedex
//     .type('Water')
//     .type('Fairy')
//     .get()
// )

// console.log('\n')

// console.log(
//   pokedex
//     .baseStatTotalGe(580)
//     .baseStatTotalLe(600)
//     .generation(2)
//     .get()
// )

// console.log('\n')

console.log(pokedex.name('ピカチュウ').get())

console.log('\n')

console.log(pokedex.id(26).get())

console.log('\n')

console.log(
  pokedex
    .type('みず')
    .type('フェアリー')
    .get()
)

console.log('\n')

console.log(
  pokedex
    .baseStatTotalGe(580)
    .baseStatTotalLe(600)
    .generation(2)
    .get()
)
