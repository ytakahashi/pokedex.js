
const typeMap = new Map(
  [
    ['ノーマル', 'Normal'],
    ['ほのお', 'Fire'],
    ['みず', 'Water'],
    ['でんき', 'Electric'],
    ['くさ', 'Grass'],
    ['こおり', 'Ice'],
    ['かくとう', 'Fighting'],
    ['どく', 'Poison'],
    ['じめん', 'Ground'],
    ['ひこう', 'Flying'],
    ['エスパー', 'Psychic'],
    ['むし', 'Bug'],
    ['いわ', 'Rock'],
    ['ゴースト', 'Ghost'],
    ['ドラゴン', 'Dragon'],
    ['あく', 'Dark'],
    ['はがね', 'Steel'],
    ['フェアリー', 'Fairy']
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
