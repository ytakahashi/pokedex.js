const eggGroupMap = new Map(
  [
    ['怪獣', 'Monster'],
    ['ドラゴン', 'Dragon'],
    ['鉱物', 'Mineral'],
    ['植物', 'Grass'],
    ['人型', 'Human-Like'],
    ['水中1', 'Water1'],
    ['水中2', 'Water2'],
    ['水中3', 'Water3'],
    ['虫', 'Bug'],
    ['飛行', 'Flying'],
    ['不定形', 'Amorphous'],
    ['妖精', 'Fairy'],
    ['陸上', 'Field'],
    ['メタモン', 'Ditto'],
    ['タマゴ未発見', 'Undiscovered']
  ]
)

const getEggGroup = (group, lang) => {
  if (lang === 'ja') {
    return group
  } else if (lang === 'en') {
    return group.map(g => eggGroupMap.get(g))
  }
}

module.exports.getEggGroup = getEggGroup
