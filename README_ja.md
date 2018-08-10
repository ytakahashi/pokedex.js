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

返却される JSON の形式は、[Pokemon JSON schema](./src/resources/schema.json)を参照してください。

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

合計種族値が 580 以上 600 以下、かつ第 1 世代のポケモンを取得します.

```node.js
console.log(
  pokedex
    .totalBaseStatsGe(580)
    .totalBaseStatsLe(600)
    .ofGeneration(1)
    .get()
)
// [{"id":"144","name":"フリーザー","type":["こおり","ひこう"],"ability":[{"name":"プレッシャー","hidden":false},{"name":"ゆきがくれ","hidden":true}],"eggGroup":["タマゴ未発見"],"baseStats":{"H":"90","A":"85","B":"100","C":"95","D":"125","S":"85"},"generation":1},{"id":"145","name":"サンダー","type":["でんき","ひこう"],"ability":[{"name":"プレッシャー","hidden":false},{"name":"せいでんき","hidden":true}],"eggGroup":["タマゴ未発見"],"baseStats":{"H":"90","A":"90","B":"85","C":"125","D":"90","S":"100"},"generation":1},{"id":"146","name":"ファイヤー","type":["ほのお","ひこう"],"ability":[{"name":"プレッシャー","hidden":false},{"name":"ほのおのからだ","hidden":true}],"eggGroup":["タマゴ未発見"],"baseStats":{"H":"90","A":"100","B":"90","C":"125","D":"85","S":"90"},"generation":1},{"id":"149","name":"カイリュー","type":["ドラゴン","ひこう"],"ability":[{"name":"せいしんりょく","hidden":false},{"name":"マルチスケイル","hidden":true}],"eggGroup":["水中1","ドラゴン"],"baseStats":{"H":"91","A":"134","B":"95","C":"100","D":"100","S":"80"},"generation":1},{"id":"151","name":"ミュウ","type":["エスパー"],"ability":[{"name":"シンクロ","hidden":false}],"eggGroup":["タマゴ未発見"],"baseStats":{"H":"100","A":"100","B":"100","C":"100","D":"100","S":"100"},"generation":1}]
```

### 利用可能なフィルタ

- `withType(type: string)` : 指定されたタイプでフィルタします。
- `ofGeneration(generation: number)` : 指定された世代のポケモンでフィルタします。
- `belongsToEggGroup(eggGroop: string)` : 指定されたタマゴグループのポケモンでフィルタします。
- `totalBaseStatsGe(status: number)` : 指定された合計種族値でフィルタします。
- `totalBaseStatsLe(status: number)` : 指定された合計種族値でフィルタします。

上記例のようにフィルタメソッドの最後に `.get()` を付けることで、条件に合うポケモンのリストを JSON として取得できます。
