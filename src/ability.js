const abilityMap = new Map(
  [
    ['あくしゅう', 'Stench'],
    ['あめふらし', 'Drizzle'],
    ['かそく', 'Speed Boost'],
    ['カブトアーマー', 'Battle Armor'],
    ['がんじょう', 'Sturdy'],
    ['しめりけ', 'Damp'],
    ['じゅうなん', 'Limber'],
    ['すながくれ', 'Sand Veil'],
    ['せいでんき', 'Static'],
    ['ちくでん', 'Volt Absorb'],
    ['ちょすい', 'Water Absorb'],
    ['どんかん', 'Oblivious'],
    ['ノーてんき', 'Cloud Nine'],
    ['ふくがん', 'Compound Eyes'],
    ['ふみん', 'Insomnia'],
    ['へんしょく', 'Color Change'],
    ['めんえき', 'Immunity'],
    ['もらいび', 'Flash Fire'],
    ['りんぷん', 'Shield Dust'],
    ['マイペース', 'Own Tempo'],
    ['きゅうばん', 'Suction Cups'],
    ['いかく', 'Intimidate'],
    ['かげふみ', 'Shadow Tag'],
    ['さめはだ', 'Rough Skin'],
    ['ふしぎなまもり', 'Wonder Guard'],
    ['ふゆう', 'Levitate'],
    ['ほうし', 'Effect Spore'],
    ['シンクロ', 'Synchronize'],
    ['クリアボディ', 'Clear Body'],
    ['しぜんかいふく', 'Natural Cure'],
    ['ひらいしん', 'Lightning Rod'],
    ['てんのめぐみ', 'Serene Grace'],
    ['すいすい', 'Swift Swim'],
    ['ようりょくそ', 'Chlorophyll'],
    ['はっこう', 'Illuminate'],
    ['トレース', 'Trace'],
    ['ちからもち', 'Huge Power'],
    ['どくのトゲ', 'Poison Point'],
    ['せいしんりょく', 'Inner Focus'],
    ['マグマのよろい', 'Magma Armor'],
    ['みずのベール', 'Water Veil'],
    ['じりょく', 'Magnet Pull'],
    ['ぼうおん', 'Soundproof'],
    ['あめうけざら', 'Rain Dish'],
    ['すなおこし', 'Sand Stream'],
    ['プレッシャー', 'Pressure'],
    ['あついしぼう', 'Thick Fat'],
    ['はやおき', 'Early Bird'],
    ['ほのおのからだ', 'Flame Body'],
    ['にげあし', 'Run Away'],
    ['するどいめ', 'Keen Eye'],
    ['かいりきバサミ', 'Hyper Cutter'],
    ['ものひろい', 'Pickup'],
    ['なまけ', 'Truant'],
    ['はりきり', 'Hustle'],
    ['メロメロボディ', 'Cute Charm'],
    ['プラス', 'Plus'],
    ['マイナス', 'Minus'],
    ['てんきや', 'Forecast'],
    ['ねんちゃく', 'Sticky Hold'],
    ['だっぴ', 'Shed Skin'],
    ['こんじょう', 'Guts'],
    ['ふしぎなうろこ', 'Marvel Scale'],
    ['ヘドロえき', 'Liquid Ooze'],
    ['しんりょく', 'Overgrow'],
    ['もうか', 'Blaze'],
    ['げきりゅう', 'Torrent'],
    ['むしのしらせ', 'Swarm'],
    ['いしあたま', 'Rock Head'],
    ['ひでり', 'Drought'],
    ['ありじごく', 'Arena Trap'],
    ['やるき', 'Vital Spirit'],
    ['しろいけむり', 'White Smoke'],
    ['ヨガパワー', 'Pure Power'],
    ['シェルアーマー', 'Shell Armor'],
    ['シェルアーマー', 'Shell Armor'],
    ['エアロック', 'Air Lock'],
    ['ちどりあし', 'Tangled Feet'],
    ['でんきエンジン', 'Motor Drive'],
    ['とうそうしん', 'Rivalry'],
    ['ふくつのこころ', 'Steadfast'],
    ['ゆきがくれ', 'Snow Cloak'],
    ['くいしんぼう', 'Gluttony'],
    ['いかりのつぼ', 'Anger Point'],
    ['かるわざ', 'Unburden'],
    ['たいねつ', 'Heatproof'],
    ['たんじゅん', 'Simple'],
    ['かんそうはだ', 'Dry Skin'],
    ['ダウンロード', 'Download'],
    ['てつのこぶし', 'Iron Fist'],
    ['ポイズンヒール', 'Poison Heal'],
    ['てきおうりょく', 'Adaptability'],
    ['スキルリンク', 'Skill Link'],
    ['うるおいボディ', 'Hydration'],
    ['サンパワー', 'Solar Power'],
    ['はやあし', 'Quick Feet'],
    ['ノーマルスキン', 'Normalize'],
    ['スナイパー', 'Sniper'],
    ['マジックガード', 'Magic Guard'],
    ['ノーガード', 'No Guard'],
    ['あとだし', 'Stall'],
    ['テクニシャン', 'Technician'],
    ['リーフガード', 'Leaf Guard'],
    ['ぶきよう', 'Klutz'],
    ['かたやぶり', 'Mold Breaker'],
    ['きょううん', 'Super Luck'],
    ['ゆうばく', 'Aftermath'],
    ['きけんよち', 'Anticipation'],
    ['よちむ', 'Forewarn'],
    ['てんねん', 'Unaware'],
    ['いろめがね', 'Tinted Lens'],
    ['フィルター', 'Filter'],
    ['スロースタート', 'Slow Start'],
    ['きもったま', 'Scrappy'],
    ['よびみず', 'Storm Drain'],
    ['アイスボディ', 'Ice Body'],
    ['ハードロック', 'Solid Rock'],
    ['ゆきふらし', 'Snow Warning'],
    ['みつあつめ', 'Honey Gather'],
    ['おみとおし', 'Frisk'],
    ['すてみ', 'Reckless'],
    ['マルチタイプ', 'Multitype'],
    ['フラワーギフト', 'Flower Gift'],
    ['ナイトメア', 'Bad Dreams'],
    ['わるいてぐせ', 'Pickpocket'],
    ['ちからずく', 'Sheer Force'],
    ['あまのじゃく', 'Contrary'],
    ['きんちょうかん', 'Unnerve'],
    ['まけんき', 'Defiant'],
    ['よわき', 'Defeatist'],
    ['のろわれボディ', 'Cursed Body'],
    ['いやしのこころ', 'Healer'],
    ['フレンドガード', 'Friend Guard'],
    ['くだけるよろい', 'Weak Armor'],
    ['ヘヴィメタル', 'Heavy Metal'],
    ['ライトメタル', 'Light Metal'],
    ['マルチスケイル', 'Multiscale'],
    ['どくぼうそう', 'Toxic Boost'],
    ['ねつぼうそう', 'Flare Boost'],
    ['しゅうかく', 'Harvest'],
    ['テレパシー', 'Telepathy'],
    ['ムラっけ', 'Moody'],
    ['ぼうじん', 'Overcoat'],
    ['どくしゅ', 'Poison Touch'],
    ['さいせいりょく', 'Regenerator'],
    ['はとむね', 'Big Pecks'],
    ['すなかき', 'Sand Rush'],
    ['ミラクルスキン', 'Wonder Skin'],
    ['アナライズ', 'Analytic'],
    ['イリュージョン', 'Illusion'],
    ['かわりもの', 'Imposter'],
    ['すりぬけ', 'Infiltrator'],
    ['ミイラ', 'Mummy'],
    ['じしんかじょう', 'Moxie'],
    ['せいぎのこころ', 'Justified'],
    ['びびり', 'Rattled'],
    ['マジックミラー', 'Magic Bounce'],
    ['そうしょく', 'Sap Sipper'],
    ['いたずらごころ', 'Prankster'],
    ['すなのちから', 'Sand Force'],
    ['てつのトゲ', 'Iron Barbs'],
    ['ダルマモード', 'Zen Mode'],
    ['しょうりのほし', 'Victory Star'],
    ['ターボブレイズ', 'Turboblaze'],
    ['テラボルテージ', 'Teravolt'],
    ['アロマベール', 'Aroma Veil'],
    ['フラワーベール', 'Flower Veil'],
    ['ほおぶくろ', 'Cheek Pouch'],
    ['へんげんじざい', 'Protean'],
    ['ファーコート', 'Fur Coat'],
    ['マジシャン', 'Magician'],
    ['ぼうだん', 'Bulletproof'],
    ['かちき', 'Competitive'],
    ['がんじょうあご', 'Strong Jaw'],
    ['フリーズスキン', 'Refrigerate'],
    ['スイートベール', 'Sweet Veil'],
    ['バトルスイッチ', 'Stance Change'],
    ['はやてのつばさ', 'Gale Wings'],
    ['メガランチャー', 'Mega Launcher'],
    ['くさのけがわ', 'Grass Pelt'],
    ['きょうせい', 'Symbiosis'],
    ['かたいツメ', 'Tough Claws'],
    ['フェアリースキン', 'Pixilate'],
    ['ぬめぬめ', 'Gooey'],
    ['スカイスキン', 'Aerilate'],
    ['おやこあい', 'Parental Bond'],
    ['ダークオーラ', 'Dark Aura'],
    ['フェアリーオーラ', 'Fairy Aura'],
    ['オーラブレイク', 'Aura Break'],
    ['はじまりのうみ', 'Primordial Sea'],
    ['おわりのだいち', 'Desolate Land'],
    ['デルタストリーム', 'Delta Stream'],
    ['じきゅうりょく', 'Stamina'],
    ['にげごし', 'Wimp Out'],
    ['ききかいひ', 'Emergency Exit'],
    ['みずがため', 'Water Compaction'],
    ['ひとでなし', 'Merciless'],
    ['リミットシールド', 'Shields Down'],
    ['はりこみ', 'Stakeout'],
    ['すいほう', 'Water Bubble'],
    ['はがねつかい', 'Steelworker'],
    ['ぎゃくじょう', 'Berserk'],
    ['ゆきかき', 'Slush Rush'],
    ['えんかく', 'Long Reach'],
    ['うるおいボイス', 'Liquid Voice'],
    ['ヒーリングシフト', 'Triage'],
    ['エレキスキン', 'Galvanize'],
    ['サーフテール', 'Surge Surfer'],
    ['ぎょぐん', 'Schooling'],
    ['ばけのかわ', 'Disguise'],
    ['きずなへんげ', 'Battle Bond'],
    ['スワームチェンジ', 'Power Construct'],
    ['ふしょく', 'Corrosion'],
    ['ぜったいねむり', 'Comatose'],
    ['じょおうのいげん', 'Queenly Majesty'],
    ['とびだすなかみ', 'Innards Out'],
    ['おどりこ', 'Dancer'],
    ['バッテリー', 'Battery'],
    ['もふもふ', 'Fluffy'],
    ['ビビッドボディ', 'Dazzling'],
    ['ソウルハート', 'Soul-Heart'],
    ['カーリーヘアー', 'Tangling Hair'],
    ['レシーバー', 'Receiver'],
    ['かがくのちから', 'Power of Alchemy'],
    ['ビーストブースト', 'Beast Boost'],
    ['ARシステム', 'RKS System'],
    ['エレキメイカー', 'Electric Surge'],
    ['サイコメイカー', 'Psychic Surge'],
    ['ミストメイカー', 'Misty Surge'],
    ['グラスメイカー', 'Grassy Surge'],
    ['メタルプロテクト', 'Full Metal Body'],
    ['ファントムガード', 'Shadow Shield'],
    ['プリズムアーマー', 'Prism Armor'],
    ['ブレインフォース', 'Neuroforce'],
    ['アイスフェイス', 'Ice Face'],
    ['うのミサイル', 'Gulp Missile'],
    ['かがくへんかガス', 'Neutralizing Gas'],
    ['ぎたい', 'Mimicry'],
    ['こおりのりんぷん', 'Ice Scales'],
    ['ごりむちゅう', 'Gorilla Tactics'],
    ['さまようたましい', 'Wandering Spirit'],
    ['じゅくせい', 'Ripen'],
    ['じょうききかん', 'Steam Engine'],
    ['スクリューおびれ', 'Propeller Tail'],
    ['すじがねいり', 'Stalwart'],
    ['すなはき', 'Sand Rush'],
    ['たまひろい', 'Ball Fetch'],
    ['はがねのせいしん', 'Steely Spirit'],
    ['はらぺこスイッチ', 'Hunger Switch'],
    ['パステルベール', 'Pastel Veil'],
    ['バリアフリー', 'Screen Cleaner'],
    ['パワースポット', 'Power Spot'],
    ['パンクロック', 'Punk Rock'],
    ['ふくつのたて', 'Dauntless Shield'],
    ['ふとうのけん', 'Intrepid Sword'],
    ['ほろびのボディ', 'Perish Body'],
    ['ミラーアーマー', 'Mirror Armor'],
    ['リベロ', 'Libero'],
    ['わたげ', 'Cotton Down'],
    ['クイックドロウ', 'Quick Draw'],
    ['ふかしのこぶし', 'Unseen Fist'],
    ['きみょうなくすり', 'Curious Medicine'],
    ['トランジスタ', 'Transistor'],
    ['りゅうのあぎと', 'Dragon\'s Maw'],
    ['しろのいななき', 'Chilling Neigh'],
    ['くろのいななき', 'Grim Neigh'],
    ['じんばいったい', 'As One'],
    ['いかりのこうら', 'Anger Shell'],
    ['いわはこび', 'Rocky Payload'],
    ['おうごんのからだ', 'Good as Gold'],
    ['かぜのり', 'Wind Rider'],
    ['きょうえん', 'Costar'],
    ['きよめのしお', 'Purifying Salt'],
    ['きれあじ', 'Sharpness'],
    ['きんしのちから', 'Mycelium Might'],
    ['クォークチャージ', 'Quark Drive'],
    ['こだいかっせい', 'Protosynthesis'],
    ['こぼれダネ', 'Seed Sower'],
    ['こんがりボディ', 'Well-Baked Body'],
    ['しれいとう', 'Commander'],
    ['そうだいしょう', 'Supreme Overlord'],
    ['テイルアーマー', 'Armor Tail'],
    ['でんきにかえる', 'Electromorphosis'],
    ['どくげしょう', 'Toxic Debris'],
    ['どしょく', 'Earth Eater'],
    ['とれないにおい', 'Lingering Aroma'],
    ['ねつこうかん', 'Thermal Exchange'],
    ['ハドロンエンジン', 'Hadron Engine'],
    ['ばんけん', 'Guard Dog'],
    ['はんすう', 'Cud Chew'],
    ['ひひいろのこどう', 'Orichalcum Pulse'],
    ['びんじょう', 'Opportunist'],
    ['ふうりょくでんき', 'Wind Power'],
    ['マイティチェンジ', 'Zero to Hero'],
    ['わざわいのうつわ', 'Vessel of Ruin'],
    ['わざわいのおふだ', 'Tablets of Ruin'],
    ['わざわいのたま', 'Beads of Ruin'],
    ['わざわいのつるぎ', 'Sword of Ruin']
  ]
)

const abilityName = (name, lang) => {
  if (lang === 'ja') {
    return name
  } else if (lang === 'en') {
    enName = abilityMap.get(name)
    if (enName === undefined) {
      throw new Error(`Undefined: ${name}`)
    }
    return enName
  }
}

const getAbility = (ability, lang) => {
  const abilities = []
  for (const a of ability) {
    let hidden
    let name
    if (a.name.indexOf('*') === 0) {
      hidden = true
      name = abilityName(a.name.substr(1), lang)
    } else {
      hidden = false
      name = abilityName(a.name, lang)
    }
    abilities.push({ name, hidden })
  }
  return abilities
}

module.exports.getAbility = getAbility
