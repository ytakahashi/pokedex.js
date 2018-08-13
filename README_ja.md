# Pekedex.js

[:us:](./README.md) :jp:

## 使い方

### 簡単な使い方

名前/ずかん番号を指定してポケモンを取得します。

```node.js
const Pokedex = require('pokedex.js')
const pokedex = new Pokedex('ja')

console.log(pokedex.getByName('ピカチュウ'))
// {"id":"25","name":"ピカチュウ","type":["でんき"],"ability":[{"name":"せいでんき","hidden":false},{"name":"ひらいしん","hidden":true}],"eggGroup":["陸上","妖精"],"baseStats":{"H":"35","A":"55","B":"40","C":"50","D":"50","S":"90"},"generation":1}

console.log(pokedex.getById(25))
// {"id":"25","name":"ピカチュウ","type":["でんき"],"ability":[{"name":"せいでんき","hidden":false},{"name":"ひらいしん","hidden":true}],"eggGroup":["陸上","妖精"],"baseStats":{"H":"35","A":"55","B":"40","C":"50","D":"50","S":"90"},"generation":1}
```

返却される JSON の形式は、[こちら](./src/resources/schema.json)を参照してください。

### フィルタ

#### タイプでフィルタ

水/フェアリータイプのポケモンを取得します。

```node.js
console.log(
  pokedex.withType('みず').withType('フェアリー').get()
)
// [{"id":"183","name":"マリル","type":["みず","フェアリー"],"ability":[{"name":"あついしぼう","hidden":false},{"name":"ちからもち","hidden":false},{"name":"そうしょく","hidden":true}],"eggGroup":["水中1","妖精"],"baseStats":{"H":"70","A":"20","B":"50","C":"20","D":"50","S":"40"},"generation":2},{"id":"184","name":"マリルリ","type":["みず","フェアリー"],"ability":[{"name":"あついしぼう","hidden":false},{"name":"ちからもち","hidden":false},{"name":"そうしょく","hidden":true}],"eggGroup":["水中1","妖精"],"baseStats":{"H":"100","A":"50","B":"80","C":"60","D":"80","S":"50"},"generation":2},{"id":"730","name":"アシレーヌ","type":["みず","フェアリー"],"ability":[{"name":"げきりゅう","hidden":false},{"name":"うるおいボイス","hidden":true}],"eggGroup":["水中1","陸上"],"baseStats":{"H":"80","A":"74","B":"74","C":"126","D":"116","S":"60"},"generation":7},{"id":"788","name":"カプ・レヒレ","type":["みず","フェアリー"],"ability":[{"name":"ミストメイカー","hidden":false},{"name":"テレパシー","hidden":true}],"eggGroup":["タマゴ未発見"],"baseStats":{"H":"70","A":"75","B":"115","C":"95","D":"130","S":"85"},"generation":7}]
```

#### 合計種族値、世代でフィルタ

合計種族値が 580 以上 600 以下、かつ第 2 世代のポケモンを取得します.

```node.js
console.log(
  pokedex
    .totalBaseStatsGe(580)
    .totalBaseStatsLe(600)
    .ofGeneration(2)
    .get()
)
// [{"id":"243","name":"ライコウ","type":["でんき"],"ability":[{"name":"プレッシャー","hidden":false},{"name":"せいしんりょく","hidden":true}],"eggGroup":["タマゴ未発見"],"baseStats":{"H":"90","A":"85","B":"75","C":"115","D":"100","S":"115"},"generation":2},{"id":"244","name":"エンテイ","type":["ほのお"],"ability":[{"name":"プレッシャー","hidden":false},{"name":"せいしんりょく","hidden":true}],"eggGroup":["タマゴ未発見"],"baseStats":{"H":"115","A":"115","B":"85","C":"90","D":"75","S":"100"},"generation":2},{"id":"245","name":"スイクン","type":["みず"],"ability":[{"name":"プレッシャー","hidden":false},{"name":"せいしんりょく","hidden":true}],"eggGroup":["タマゴ未発見"],"baseStats":{"H":"100","A":"75","B":"115","C":"90","D":"115","S":"85"},"generation":2},{"id":"248","name":"バンギラス","type":["いわ","あく"],"ability":[{"name":"すなおこし","hidden":false},{"name":"きんちょうかん","hidden":true}],"eggGroup":["怪獣"],"baseStats":{"H":"100","A":"134","B":"110","C":"95","D":"100","S":"61"},"generation":2,"megaEvolution":[{"name":"メガバンギラス","type":["いわ","あく"],"ability":[{"name":"すなおこし","hidden":false}],"baseStats":{"H":"100","A":"164","B":"150","C":"95","D":"120","S":"71"}}]},{"id":"251","name":"セレビィ","type":["エスパー","くさ"],"ability":[{"name":"しぜんかいふく","hidden":false}],"eggGroup":["タマゴ未発見"],"baseStats":{"H":"100","A":"100","B":"100","C":"100","D":"100","S":"100"},"generation":2}]
```

### 利用可能なフィルタ

- `withType(type: string)` : 指定されたタイプでフィルタします。
- `ofGeneration(generation: number)` : 指定された世代のポケモンでフィルタします。
- `belongsToEggGroup(eggGroop: string)` : 指定されたタマゴグループのポケモンでフィルタします。
- `totalBaseStatsGe(status: number)` : 指定された合計種族値でフィルタします。
- `totalBaseStatsLe(status: number)` : 指定された合計種族値でフィルタします。
- `canMegaEvolve()` : メガシンカ可能なポケモンでフィルタします（ゲンシカイキ、ウルトラバーストも含みます）。

上記例のようにフィルタメソッドの最後に `.get()` を付けることで、条件に合うポケモンのリストを JSON として取得できます。  
返却される JSON は、[ポケモン](./src/resources/schema.json) のリストとなります.
