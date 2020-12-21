const Joi = require('joi')
const filterRulesConstructorSchema = global.$appConfig.filter
module.exports = (() => {
  const allowFields = filterRulesConstructorSchema.fields.map(
    field => field.key
  )

  const filterOptionsSchema = Joi.object({
    additionalFields: Joi.array().items(Joi.allow(...allowFields)),
    filterRules: Joi.array().items(
      Joi.object({
        field: Joi.allow(...allowFields),
        ids: Joi.array().items(Joi.number()),
        type: Joi.string().required(),
        value: Joi.string().allow(''),
      })
    ),
  })

  return async filterOptions => {
    let validatedFilterOptions = null
    try {
      validatedFilterOptions = await filterOptionsSchema.validateAsync(
        filterOptions
      )
    } catch (error) {
      console.error(error)
      return
    }
    return validatedFilterOptions
  }
})()
