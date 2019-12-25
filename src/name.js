const jsons = [].concat(
  require('./resources/pokemon/gen1_name.json'),
  require('./resources/pokemon/gen2_name.json'),
  require('./resources/pokemon/gen3_name.json'),
  require('./resources/pokemon/gen4_name.json'),
  require('./resources/pokemon/gen5_name.json'),
  require('./resources/pokemon/gen6_name.json'),
  require('./resources/pokemon/gen7_name.json'),
  require('./resources/pokemon/gen8_name.json'),
  require('./resources/pokemon/mega_name.json')
)
const nameMap = new Map(jsons.map(obj => [obj.id, obj.name]))

const formNameJson = require('../src/resources/pokemon/form_name.json')
const formNameMap = new Map(formNameJson.map(obj => [obj.id.toString(), obj.names]))

const getName = (id, lang) => {
  if (lang === 'ja') {
    return nameMap.get(id).ja
  } else if (lang === 'en') {
    return nameMap.get(id).en
  }
}

const getFormName = (id, formId, lang) => {
  const names = formNameMap.get(id)
  const name = names.find(n => { return n.formId === formId })
  if (lang === 'ja') {
    return name.ja
  } else if (lang === 'en') {
    return name.en
  }
}

module.exports = {
  getName: getName,
  getFormName: getFormName
}
