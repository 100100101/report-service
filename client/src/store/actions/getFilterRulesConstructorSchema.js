import axios from 'axios'
export default async function({ commit }) {
  const filterRulesConstructorSchemaResponse = await axios
    .get('getFilterRulesConstructorSchema')
    .catch(error => console.error(error))

  if (!filterRulesConstructorSchemaResponse) {
    return
  }
  const filterRulesConstructorSchemaData =
    filterRulesConstructorSchemaResponse.data

  if (
    !filterRulesConstructorSchemaData ||
    Object.prototype.toString.call(filterRulesConstructorSchemaData) !==
      '[object Object]'
  ) {
    console.error('!filterRulesConstructorSchemaData or not an object')
    return
  }
  commit('setFilterRulesConstructorSchema', filterRulesConstructorSchemaData)
}
