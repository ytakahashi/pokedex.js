# Pekedex.js

[![npm version](https://badge.fury.io/js/pokedex.js.svg)](https://badge.fury.io/js/pokedex.js)
[![CircleCI](https://circleci.com/gh/ytakahashi/pokedex.js.svg?style=shield&circle-token=7cf6f0c8b57b6a06542156647c3e2b9af3cae77e)](https://circleci.com/gh/ytakahashi/pokedex.js)
[![codecov](https://codecov.io/gh/ytakahashi/pokedex.js/branch/master/graph/badge.svg)](https://codecov.io/gh/ytakahashi/pokedex.js)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A library to get Pokémon information.

:us: [:jp:](./README_ja.md)

## install

```shell
npm install --save pokedex.js
```

or

```shell
yarn add pokedex.js
```

## Usage

### simple usage

```node.js
const Pokedex = require('pokedex.js')
const pokedex = new Pokedex('en')

console.log(pokedex.getByName('Pikachu'))
// {"id":"25","name":"Pikachu","type":["Electric"],"ability":[{"name":"Static","hidden":false},{"name":"Lightning Rod","hidden":true}],"eggGroup":["Field","Fairy"],"baseStats":{"H":"35","A":"55","B":"40","C":"50","D":"50","S":"90"},"generation":1}

console.log(pokedex.getById(25))
// {"id":"25","name":"Pikachu","type":["Electric"],"ability":[{"name":"Static","hidden":false},{"name":"Lightning Rod","hidden":true}],"eggGroup":["Field","Fairy"],"baseStats":{"H":"35","A":"55","B":"40","C":"50","D":"50","S":"90"},"generation":1}

```

These return Pokemon JSON ([schema](./src/resources/schema.json)).

### With filtering

#### filter by type

Get Pokémons which have type Water/Fairy

```node.js
console.log(
  pokedex.withType('Water').withType('Fairy').get()
)
// [{"id":"183","name":"Marill","type":["Water","Fairy"],"ability":[{"name":"Thick Fat","hidden":false},{"name":"Huge Power","hidden":false},{"name":"Sap Sipper","hidden":true}],"eggGroup":["Water1","Fairy"],"baseStats":{"H":"70","A":"20","B":"50","C":"20","D":"50","S":"40"},"generation":2},{"id":"184","name":"Azumarill","type":["Water","Fairy"],"ability":[{"name":"Thick Fat","hidden":false},{"name":"Huge Power","hidden":false},{"name":"Sap Sipper","hidden":true}],"eggGroup":["Water1","Fairy"],"baseStats":{"H":"100","A":"50","B":"80","C":"60","D":"80","S":"50"},"generation":2},{"id":"730","name":"Primarina","type":["Water","Fairy"],"ability":[{"name":"Torrent","hidden":false},{"name":"Liquid Voice","hidden":true}],"eggGroup":["Water1","Field"],"baseStats":{"H":"80","A":"74","B":"74","C":"126","D":"116","S":"60"},"generation":7},{"id":"788","name":"Tapu Fini","type":["Water","Fairy"],"ability":[{"name":"Misty Surge","hidden":false},{"name":"Telepathy","hidden":true}],"eggGroup":["Undiscovered"],"baseStats":{"H":"70","A":"75","B":"115","C":"95","D":"130","S":"85"},"generation":7}]
```

#### filter by total base status, generation

Get Pokémons which have total base stat between 580 and 600, and added at 2nd generation.

```node.js
console.log(
  pokedex
    .totalBaseStatsGe(580)
    .totalBaseStatsLe(600)
    .ofGeneration(2)
    .get()
)
// [{"id":"243","name":"Raikou","type":["Electric"],"ability":[{"name":"Pressure","hidden":false},{"name":"Inner Focus","hidden":true}],"eggGroup":["Undiscovered"],"baseStats":{"H":"90","A":"85","B":"75","C":"115","D":"100","S":"115"},"generation":2},{"id":"244","name":"Entei","type":["Fire"],"ability":[{"name":"Pressure","hidden":false},{"name":"Inner Focus","hidden":true}],"eggGroup":["Undiscovered"],"baseStats":{"H":"115","A":"115","B":"85","C":"90","D":"75","S":"100"},"generation":2},{"id":"245","name":"Suicine","type":["Water"],"ability":[{"name":"Pressure","hidden":false},{"name":"Inner Focus","hidden":true}],"eggGroup":["Undiscovered"],"baseStats":{"H":"100","A":"75","B":"115","C":"90","D":"115","S":"85"},"generation":2},{"id":"248","name":"Tyranitar","type":["Rock","Dark"],"ability":[{"name":"Sand Stream","hidden":false},{"name":"Unnerve","hidden":true}],"eggGroup":["Monster"],"baseStats":{"H":"100","A":"134","B":"110","C":"95","D":"100","S":"61"},"generation":2,"megaEvolution":[{"name":"Mega Tyranitar","type":["Rock","Dark"],"ability":[{"name":"Sand Stream","hidden":false}],"baseStats":{"H":"100","A":"164","B":"150","C":"95","D":"120","S":"71"}}]},{"id":"251","name":"Celebi","type":["Psychic","Grass"],"ability":[{"name":"Natural Cure","hidden":false}],"eggGroup":["Undiscovered"],"baseStats":{"H":"100","A":"100","B":"100","C":"100","D":"100","S":"100"},"generation":2}]
```

### Available filters

- `withType(type: string)` : filters Pokémon list that have a specified type
- `ofGeneration(generation: number)` : filters Pokémon that was introduced in a given generation
- `belongsToEggGroup(eggGroop: string)` : filters Pokémon that belong to a given egg group
- `totalBaseStatsGe(status: number)` : filters Pokémon whose base stat total is higher than specified value
- `totalBaseStatsLe(status: number)` : filters Pokémon whose base stat total is lower than specified value
- `canMegaEvolve()` : filters Pokémon that are capable of Mega Evolution (including Primal Reversion, Ultra Burst)

Multiple filters can be applied at the same time by chaining methods like examples above.  
By adding `.get()` after filter methods, you can get JSON array of Pokemons which satisfy filters.  
Returned JSON is a list of ([Pokemon](./src/resources/schema.json)).

Everything can be done in Japanese! See [README_ja.md](./README_ja.md).
