const jsons = [].concat(
  require('./resources/gen1_name.json'),
  require('./resources/gen2_name.json'),
  require('./resources/gen3_name.json')
)

const nameMap = new Map(jsons.map(obj => [obj.id, obj.name]))

const getName = (id, lang) => {
  if (lang === 'ja') {
    return nameMap.get(id).jp
  } else if (lang === 'en') {
    return nameMap.get(id).en
  }
}

module.exports.getName = getName
