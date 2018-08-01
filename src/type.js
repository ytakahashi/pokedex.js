
const typeMap = new Map(
  [
    ['ノーマル', 'NORMAL'],
    ['ほのお', 'FIRE'],
    ['みず', 'WATER'],
    ['でんき', 'ELECTRIC'],
    ['くさ', 'GRASS'],
    ['こおり', 'ICE'],
    ['かくとう', 'FIGHTING'],
    ['どく', 'POISON'],
    ['じめん', 'GROUND'],
    ['ひこう', 'FLYING'],
    ['エスパー', 'PSYCHIC'],
    ['むし', 'BUG'],
    ['いわ', 'ROCK'],
    ['ゴースト', 'GHOST'],
    ['ドラゴン', 'DRAGON'],
    ['あく', 'DARK'],
    ['はがね', 'STEEL'],
    ['フェアリー', 'FAIRY']
  ]
)

const getType = (type, lang) => {
  if (lang === 'ja') {
    return type
  } else if (lang === 'en') {
    return type.map(t => typeMap.get(t))
  }
}

module.exports.getType = getType
