# Pekedex.js

[![CircleCI](https://circleci.com/gh/ytakahashi/pokedex.js.svg?style=shield&circle-token=7cf6f0c8b57b6a06542156647c3e2b9af3cae77e)](https://circleci.com/gh/ytakahashi/pokedex.js)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![npm version](https://badge.fury.io/js/pokedex.js.svg)](https://badge.fury.io/js/pokedex.js)
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

Get Pokémons which have total base status between 580 and 600, and added at 1st generation.

```node.js
console.log(
  pokedex
    .totalBaseStatsGe(580)
    .totalBaseStatsLe(600)
    .ofGeneration(1)
    .get()
)
// [{"id":"144","name":"Articuno","type":["Ice","Flying"],"ability":[{"name":"Pressure","hidden":false},{"name":"Snow Cloak","hidden":true}],"eggGroup":["Undiscovered"],"baseStats":{"H":"90","A":"85","B":"100","C":"95","D":"125","S":"85"},"generation":1},{"id":"145","name":"Zapdos","type":["Electric","Flying"],"ability":[{"name":"Pressure","hidden":false},{"name":"Static","hidden":true}],"eggGroup":["Undiscovered"],"baseStats":{"H":"90","A":"90","B":"85","C":"125","D":"90","S":"100"},"generation":1},{"id":"146","name":"Moltres","type":["Fire","Flying"],"ability":[{"name":"Pressure","hidden":false},{"name":"Flame Body","hidden":true}],"eggGroup":["Undiscovered"],"baseStats":{"H":"90","A":"100","B":"90","C":"125","D":"85","S":"90"},"generation":1},{"id":"149","name":"Dragonite","type":["Dragon","Flying"],"ability":[{"name":"Inner Focus","hidden":false},{"name":"Multiscale","hidden":true}],"eggGroup":["Water1","Dragon"],"baseStats":{"H":"91","A":"134","B":"95","C":"100","D":"100","S":"80"},"generation":1},{"id":"151","name":"Mew","type":["Psychic"],"ability":[{"name":"Synchronize","hidden":false}],"eggGroup":["Undiscovered"],"baseStats":{"H":"100","A":"100","B":"100","C":"100","D":"100","S":"100"},"generation":1}]
```

### Available filters

- `withType(type: string)` : filters Pokemon list by given type
- `ofGeneration(generation: number)` : extract Pokemon list of given generation
- `belongsToEggGroup(eggGroop: string)` : extract Pokemons that belong to a given egg group
- `totalBaseStatsGe(status: number)` : filters Pokemon list by given total base stats
- `totalBaseStatsLe(status: number)` : filters Pokemon list by given total base stats

Multiple filters can be applied at the same time by chaining methods like examples above.

Everything can be done in Japanese! See [README_ja.md](./README_ja.md).
