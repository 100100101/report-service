const filterRulesConstructorSchema = global.$appConfig.filter
const schemaFields = filterRulesConstructorSchema.fields

const schemaFieldsByKeys = schemaFields.reduce((accumulator, field) => {
  const fieldKey = field.key
  accumulator[fieldKey] = {
    ...field,
    path: fieldKey.split('.'),
  }
  return accumulator
}, {})

module.exports = (objects, requiredFieldKeys) => {
  /*TODO try catch undefined*/
  const requiredFieldKeysLength = requiredFieldKeys.length
  const reportSchema = []
  const reportObjects = []

  for (const schemaField of schemaFields) {
    if (requiredFieldKeysLength === reportSchema.length) {
      continue
    }
    if (requiredFieldKeys.includes(schemaField.key)) {
      reportSchema.push(schemaField)
    }
  }

  for (const object of objects) {
    const prepareObject = {}
    for (const requiredFieldKey of requiredFieldKeys) {
      /*TODO undefined*/
      const requiredFieldPath = schemaFieldsByKeys[requiredFieldKey].path

      prepareObject[requiredFieldKey] =
        object[requiredFieldPath[0]][requiredFieldPath[1]]
    }
    reportObjects.push(prepareObject)
  }

  return {
    schema: reportSchema,
    objects: reportObjects,
  }
}
