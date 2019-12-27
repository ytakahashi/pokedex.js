# Pokedex.js

[![npm version](https://badge.fury.io/js/pokedex.js.svg)](https://badge.fury.io/js/pokedex.js)
[![Actions Status](https://github.com/ytakahashi/pokedex.js/workflows/Node%20CI/badge.svg)](https://github.com/ytakahashi/pokedex.js/actions)
[![CircleCI](https://circleci.com/gh/ytakahashi/pokedex.js.svg?style=shield&circle-token=7cf6f0c8b57b6a06542156647c3e2b9af3cae77e)](https://circleci.com/gh/ytakahashi/pokedex.js)
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

### Example: Get Pokémon with Name/ID

```node.js
const Pokedex = require('pokedex.js')
const pokedex = new Pokedex('en')

console.log(pokedex.name('Pikachu').get())
// [{"id":"25","name":"Pikachu","type":["Electric"],"ability":[{"name":"Static","hidden":false},{"name":"Lightning Rod","hidden":true}],"eggGroup":["Field","Fairy"],"baseStats":{"H":"35","A":"55","B":"40","C":"50","D":"50","S":"90"},"generation":1}]

console.log(pokedex.id(26).get())
// [{"id":"26","name":"Raichu","type":["Electric"],"ability":[{"name":"Static","hidden":false},{"name":"Lightning Rod","hidden":true}],"eggGroup":["Field","Fairy"],"baseStats":{"H":"60","A":"90","B":"55","C":"90","D":"80","S":"110"},"generation":1},{"id":"26","formName":"Alola Form","name":"Raichu","type":["Electric","Psychic"],"ability":[{"name":"Surge Surfer","hidden":false}],"eggGroup":["Field","Fairy"],"baseStats":{"H":"60","A":"85","B":"50","C":"95","D":"85","S":"110"},"generation":7}]

```

### APIs

- `id(id: Number|String)` : Filters list of Pokémon with ID.
- `name(name: String)` : Filters list of Pokémon with name.
- `type(type: String)` : Filters list of Pokémon with type.
- `eggGroup(eggGroop: String)` : Filters list of Pokémon with egg group.
- `baseStatTotal(operatot: String, value: Number|String)` : Takes Pokémon whose base stat total matches to given operation (one of `'>='`, `'>'`, `'<='`, `'<'`, `'='`) and value.
- `canMegaEvolve()` : Takes Pokémon which can Mega Evolve (including Primal Reversion, Ultra Burst).
- `generation(generation: Number|String)` : Filters list of Pokémon by a generation when the Pokémon was introduced.
- `inGalarPokedex()` : Only Pokémon in the Galar Pokédex is returned if this filter is applied.
- `get()`: Returns JSON String of a list of Pokémon which satisfy applied filter method(s). Returned JSON is a list of [Pokémon](./src/resources/schema.json).

Multiple filtering methods can be applied at the same time by chaining methods like examples below.  

### Examples

#### Filter by multiple types

Get Pokémon which have type Water/Fairy

```node.js
console.log(
  pokedex
    .type('Water')
    .type('Fairy')
    .get()
)
// [{"id":"183","name":"Marill","type":["Water","Fairy"],"ability":[{"name":"Thick Fat","hidden":false},{"name":"Huge Power","hidden":false},{"name":"Sap Sipper","hidden":true}],"eggGroup":["Water1","Fairy"],"baseStats":{"H":"70","A":"20","B":"50","C":"20","D":"50","S":"40"},"generation":2},{"id":"184","name":"Azumarill","type":["Water","Fairy"],"ability":[{"name":"Thick Fat","hidden":false},{"name":"Huge Power","hidden":false},{"name":"Sap Sipper","hidden":true}],"eggGroup":["Water1","Fairy"],"baseStats":{"H":"100","A":"50","B":"80","C":"60","D":"80","S":"50"},"generation":2},{"id":"730","name":"Primarina","type":["Water","Fairy"],"ability":[{"name":"Torrent","hidden":false},{"name":"Liquid Voice","hidden":true}],"eggGroup":["Water1","Field"],"baseStats":{"H":"80","A":"74","B":"74","C":"126","D":"116","S":"60"},"generation":7},{"id":"788","name":"Tapu Fini","type":["Water","Fairy"],"ability":[{"name":"Misty Surge","hidden":false},{"name":"Telepathy","hidden":true}],"eggGroup":["Undiscovered"],"baseStats":{"H":"70","A":"75","B":"115","C":"95","D":"130","S":"85"},"generation":7}]
```

#### Filter by base stat total, generation

Get Pokémon whose base stat total is between 580 and 600, and introduced at 2nd generation.

```node.js
console.log(
  pokedex
    .baseStatTotal('>=', 580)
    .baseStatTotal('<=', 600)
    .generation(2)
    .get()
)
// [{"id":"243","name":"Raikou","type":["Electric"],"ability":[{"name":"Pressure","hidden":false},{"name":"Inner Focus","hidden":true}],"eggGroup":["Undiscovered"],"baseStats":{"H":"90","A":"85","B":"75","C":"115","D":"100","S":"115"},"generation":2},{"id":"244","name":"Entei","type":["Fire"],"ability":[{"name":"Pressure","hidden":false},{"name":"Inner Focus","hidden":true}],"eggGroup":["Undiscovered"],"baseStats":{"H":"115","A":"115","B":"85","C":"90","D":"75","S":"100"},"generation":2},{"id":"245","name":"Suicine","type":["Water"],"ability":[{"name":"Pressure","hidden":false},{"name":"Inner Focus","hidden":true}],"eggGroup":["Undiscovered"],"baseStats":{"H":"100","A":"75","B":"115","C":"90","D":"115","S":"85"},"generation":2},{"id":"248","name":"Tyranitar","type":["Rock","Dark"],"ability":[{"name":"Sand Stream","hidden":false},{"name":"Unnerve","hidden":true}],"eggGroup":["Monster"],"baseStats":{"H":"100","A":"134","B":"110","C":"95","D":"100","S":"61"},"megaEvolution":[{"name":"Mega Tyranitar","type":["Rock","Dark"],"ability":[{"name":"Sand Stream","hidden":false}],"baseStats":{"H":"100","A":"164","B":"150","C":"95","D":"120","S":"71"}}],"generation":2},{"id":"251","name":"Celebi","type":["Psychic","Grass"],"ability":[{"name":"Natural Cure","hidden":false}],"eggGroup":["Undiscovered"],"baseStats":{"H":"100","A":"100","B":"100","C":"100","D":"100","S":"100"},"generation":2}]
```

#### New Pokémon in Galar Region

```node.js
console.log(
  pokedex
    .generation(8)
    .get()
)
// [{"id":"810","name":"Grookey","type":["Grass"],"ability":[{"name":"Overgrow","hidden":false},{"name":"Grassy Surge","hidden":true}],"eggGroup":["Field","Grass"],"baseStats":{"H":"50","A":"65","B":"50","C":"40","D":"40","S":"65"},"generation":8},{"id":"811","name":"Thwackey","type":["Grass"],"ability":[{"name":"Overgrow","hidden":false},{"name":"Grassy Surge","hidden":true}],"eggGroup":["Field","Grass"],"baseStats":{"H":"70","A":"85","B":"70","C":"55","D":"60","S":"80"},"generation":8},{"id":"812","name":"Rillaboom","type":["Grass"],"ability":[{"name":"Overgrow","hidden":false},{"name":"Grassy Surge","hidden":true}],"eggGroup":["Field","Grass"],"baseStats":{"H":"100","A":"125","B":"90","C":"60","D":"70","S":"85"},"generation":8},{"id":"813","name":"Scorbunny","type":["Fire"],"ability":[{"name":"Blaze","hidden":false},{"name":"Libero","hidden":true}],"eggGroup":["Field","Human-Like"],"baseStats":{"H":"50","A":"71","B":"40","C":"40","D":"40","S":"69"},"generation":8},{"id":"814","name":"Raboot","type":["Fire"],"ability":[{"name":"Blaze","hidden":false},{"name":"Libero","hidden":true}],"eggGroup":["Field","Human-Like"],"baseStats":{"H":"65","A":"86","B":"60","C":"55","D":"60","S":"94"},"generation":8},{"id":"815","name":"Cinderace","type":["Fire"],"ability":[{"name":"Blaze","hidden":false},{"name":"Libero","hidden":true}],"eggGroup":["Field","Human-Like"],"baseStats":{"H":"80","A":"116","B":"75","C":"65","D":"75","S":"119"},"generation":8},{"id":"816","name":"Sobble","type":["Water"],"ability":[{"name":"Torrent","hidden":false},{"name":"Sniper","hidden":true}],"eggGroup":["Water1","Field"],"baseStats":{"H":"50","A":"40","B":"40","C":"70","D":"40","S":"70"},"generation":8},{"id":"817","name":"Drizzile","type":["Water"],"ability":[{"name":"Torrent","hidden":false},{"name":"Sniper","hidden":true}],"eggGroup":["Water1","Field"],"baseStats":{"H":"65","A":"60","B":"55","C":"95","D":"55","S":"90"},"generation":8},{"id":"818","name":"Inteleon","type":["Water"],"ability":[{"name":"Torrent","hidden":false},{"name":"Sniper","hidden":true}],"eggGroup":["Water1","Field"],"baseStats":{"H":"70","A":"85","B":"65","C":"125","D":"65","S":"120"},"generation":8}, ... snip
```

Everything can be done in Japanese! See [README_ja.md](./README_ja.md).
