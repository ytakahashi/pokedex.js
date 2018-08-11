const jsons = [].concat(
  require('./resources/pokemon/gen1_name.json'),
  require('./resources/pokemon/gen2_name.json'),
  require('./resources/pokemon/gen3_name.json'),
  require('./resources/pokemon/gen4_name.json'),
  require('./resources/pokemon/gen5_name.json'),
  require('./resources/pokemon/gen6_name.json'),
  require('./resources/pokemon/gen7_name.json'),
  require('./resources/pokemon/mega_name.json')
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
