export default {
  filterOptions: state => {
    return {
      filterRules: state.filterRules,
      additionalFields: state.additionalFields,
    }
  },
  filterTypesByKeys: state => {
    return state.filterRulesConstructorSchema.filterTypes.reduce(
      (accumulator, filterType) => {
        accumulator[filterType.key] = filterType
        return accumulator
      },
      {}
    )
  },
  schemaFieldsByKeys: state => {
    return state.filterRulesConstructorSchema.fields.reduce(
      (accumulator, field) => {
        accumulator[field.key] = field
        return accumulator
      },
      {}
    )
  },
  filterTypesByKey: (state, getters) => {
    return state.filterRulesConstructorSchema.filterTypes.reduce(
      (accumulator, filterType) => {
        const availableFields = filterType.availableFields
        if (availableFields) {
          accumulator[filterType.key] = availableFields.map(
            availableField => getters.schemaFieldsByKeys[availableField]
          )
        }
        return accumulator
      },
      {}
    )
  },
}
