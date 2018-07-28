# pokemon-ja

Get Pokémon information in Japanese.

## Usage

```Javascript
const PokemonJp = require('./src/index.js')

const pokemon = new PokemonJp()

console.log(pokemon.byId(6))
// {"id":"6","name":"リザードン","type":["ほのお","ひこう"],"abilities":[{"hidden":false,"name":"もうか"},{"hidden":true,"name":"サンパワー"}],"baseStatus":{"H":"78","A":"84","B":"78","C":"109","D":"85","S":"100"},"eggGroups":["怪獣","ドラゴン"]}

console.log(pokemon.byName('ピカチュウ'))
// {"id":"25","name":"ピカチュウ","type":["でんき"],"abilities":[{"hidden":false,"name":"せいでんき"},{"hidden":true,"name":"ひらいしん"}],"baseStatus":{"H":"35","A":"55","B":"40","C":"50","D":"50","S":"90"},"eggGroups":["陸上","妖精"]}
```
