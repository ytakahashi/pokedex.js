# Pekedex.js

[:us:](./README.md) :jp:

## install

```shell
npm install --save pokedex.js
```

または

```shell
yarn add pokedex.js
```

## 使い方

### 例: 名前/ずかん番号を指定してでポケモンを取得

```node.js
const Pokedex = require('pokedex.js')
const pokedex = new Pokedex('ja')

console.log(pokedex.name('ピカチュウ').get())
// [{"id":"25","localId":{"galar":"194"},"name":"ピカチュウ","type":["でんき"],"ability":[{"name":"せいでんき","hidden":false},{"name":"ひらいしん","hidden":true}],"eggGroup":["陸上","妖精"],"baseStats":{"H":"35","A":"55","B":"40","C":"50","D":"50","S":"90"},"generation":1}]

console.log(pokedex.id(26).get())
// [{"id":"26","localId":{"galar":"195"},"name":"ライチュウ","type":["でんき"],"ability":[{"name":"せいでんき","hidden":false},{"name":"ひらいしん","hidden":true}],"eggGroup":["陸上","妖精"],"baseStats":{"H":"60","A":"90","B":"55","C":"90","D":"80","S":"110"},"generation":1},{"id":"26","formName":"アローラのすがた","name":"ライチュウ","type":["でんき","エスパー"],"ability":[{"name":"サーフテール","hidden":false}],"eggGroup":["陸上","妖精"],"baseStats":{"H":"60","A":"85","B":"50","C":"95","D":"85","S":"110"},"generation":7}]
```

### APIs

- `id(id: Number|String)` : ずかん番号でフィルタします。
- `name(name: String)` : 名前でフィルタします。
- `type(type: String)` : タイプでフィルタします。
- `eggGroup(eggGroop: String)` : タマゴグループでフィルタします。
- `baseStatTotal(operatior: String, value: Number|String)` : 合計種族値が与えられた演算子と数値に合うポケモンのみ取得します。
- `canMegaEvolve()` : メガシンカするポケモン（ゲンシカイキ、ウルトラバースト含む）のみ取得します。
- `generation(generation: Number|String)` : 指定された世代で登場したポケモンのみ取得します。
- `get()`: 指定された条件に合うポケモンのリストを JSON 文字列として返します。返る JSON は[ポケモン](./src/resources/schema.json)の配列となります。

以下の例のように、複数のフィルタを同時に適用することも可能です。

### Examples

#### 複数のタイプでフィルタ

水/フェアリータイプのポケモンを取得します。

```node.js
console.log(
  pokedex
    .type('みず')
    .type('フェアリー')
    .get()
)
// [{"id":"183","name":"マリル","type":["みず","フェアリー"],"ability":[{"name":"あついしぼう","hidden":false},{"name":"ちからもち","hidden":false},{"name":"そうしょく","hidden":true}],"eggGroup":["水中1","妖精"],"baseStats":{"H":"70","A":"20","B":"50","C":"20","D":"50","S":"40"},"generation":2},{"id":"184","name":"マリルリ","type":["みず","フェアリー"],"ability":[{"name":"あついしぼう","hidden":false},{"name":"ちからもち","hidden":false},{"name":"そうしょく","hidden":true}],"eggGroup":["水中1","妖精"],"baseStats":{"H":"100","A":"50","B":"80","C":"60","D":"80","S":"50"},"generation":2},{"id":"730","name":"アシレーヌ","type":["みず","フェアリー"],"ability":[{"name":"げきりゅう","hidden":false},{"name":"うるおいボイス","hidden":true}],"eggGroup":["水中1","陸上"],"baseStats":{"H":"80","A":"74","B":"74","C":"126","D":"116","S":"60"},"generation":7},{"id":"788","name":"カプ・レヒレ","type":["みず","フェアリー"],"ability":[{"name":"ミストメイカー","hidden":false},{"name":"テレパシー","hidden":true}],"eggGroup":["タマゴ未発見"],"baseStats":{"H":"70","A":"75","B":"115","C":"95","D":"130","S":"85"},"generation":7}]
```

#### 合計種族値、世代でフィルタ

合計種族値が 580 以上 600 以下、かつ第 2 世代のポケモンを取得します。

```node.js
console.log(
  pokedex
    .baseStatTotal('>=', 580)
    .baseStatTotal('<=', 600)
    .generation(2)
    .get()
)
// [{"id":"243","name":"ライコウ","type":["でんき"],"ability":[{"name":"プレッシャー","hidden":false},{"name":"せいしんりょく","hidden":true}],"eggGroup":["タマゴ未発見"],"baseStats":{"H":"90","A":"85","B":"75","C":"115","D":"100","S":"115"},"generation":2},{"id":"244","name":"エンテイ","type":["ほのお"],"ability":[{"name":"プレッシャー","hidden":false},{"name":"せいしんりょく","hidden":true}],"eggGroup":["タマゴ未発見"],"baseStats":{"H":"115","A":"115","B":"85","C":"90","D":"75","S":"100"},"generation":2},{"id":"245","name":"スイクン","type":["みず"],"ability":[{"name":"プレッシャー","hidden":false},{"name":"せいしんりょく","hidden":true}],"eggGroup":["タマゴ未発見"],"baseStats":{"H":"100","A":"75","B":"115","C":"90","D":"115","S":"85"},"generation":2},{"id":"248","localId":{"galar":"385"},"name":"バンギラス","type":["いわ","あく"],"ability":[{"name":"すなおこし","hidden":false},{"name":"きんちょうかん","hidden":true}],"eggGroup":["怪獣"],"baseStats":{"H":"100","A":"134","B":"110","C":"95","D":"100","S":"61"},"megaEvolution":[{"name":"メガバンギラス","type":["いわ","あく"],"ability":[{"name":"すなおこし","hidden":false}],"baseStats":{"H":"100","A":"164","B":"150","C":"95","D":"120","S":"71"}}],"generation":2},{"id":"251","name":"セレビィ","type":["エスパー","くさ"],"ability":[{"name":"しぜんかいふく","hidden":false}],"eggGroup":["タマゴ未発見"],"baseStats":{"H":"100","A":"100","B":"100","C":"100","D":"100","S":"100"},"generation":2}]
```

#### ガラル地方のポケモン

ガラル図鑑に含まれるポケモンを取得します。

```node.js
console.log(
  pokedex
    .inGalarPokedex()
    .get()
)
// [{"id":"4","localId":{"galar":"378"},"name":"ヒトカゲ","type":["ほのお"],"ability":[{"name":"もうか","hidden":false},{"name":"サンパワー","hidden":true}],"eggGroup":["怪獣","ドラゴン"],"baseStats":{"H":"39","A":"52","B":"43","C":"60","D":"50","S":"65"},"generation":1},{"id":"5","localId":{"galar":"379"},"name":"リザード","type":["ほのお"],"ability":[{"name":"もうか","hidden":false},{"name":"サンパワー","hidden":true}],"eggGroup":["怪獣","ドラゴン"],"baseStats":{"H":"58","A":"64","B":"58","C":"80","D":"65","S":"80"},"generation":1},{"id":"6","localId":{"galar":"380"},"name":"リザードン","type":["ほのお","ひこう"],"ability":[{"name":"もうか","hidden":false},{"name":"サンパワー","hidden":true}],"eggGroup":["怪獣","ドラゴン"],"baseStats":{"H":"78","A":"84","B":"78","C":"109","D":"85","S":"100"},"generation":1}, ... 以下略
```
