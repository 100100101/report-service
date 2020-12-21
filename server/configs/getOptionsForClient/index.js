module.exports = function() {
  try {
    const { fields, filterTypes } = this.filter
    if (!fields || !filterTypes) {
      throw '!fields || !filterTypes'
    }
    const filterFieldsForClient = []
    for (const field of fields) {
      const key = field.key
      const name = field.name
      if (!key || !name) {
        throw '!key || !name'
      }
      filterFieldsForClient.push({
        key,
        name,
      })
    }
    return {
      filter: {
        fields: filterFieldsForClient,
        filterTypes,
      },
    }
  } catch (error) {
    console.error(error)
  }
}
