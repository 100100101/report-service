export default {
  setFilterRulesConstructorSchema: (state, schema) => {
    state.filterRulesConstructorSchema = schema
  },
  addFilterRule: (state, rule) => {
    state.filterRules.push(rule)
  },
  removeFilterRule: (state, rule) => {
    state.filterRules.splice(state.filterRules.indexOf(rule), 1)
  },
  updateFilterRuleOptions: (state, { rule, patch }) => {
    Object.assign(rule, patch)
  },
  setAdditionalFields: (state, additionalFields) => {
    state.additionalFields = additionalFields
  },
  setFilterRuleTemplate: (state, { currentRule, newRule }) => {
    state.filterRules.splice(state.filterRules.indexOf(currentRule), 1, newRule)
  },
  setReport: (state, report) => {
    state.report = report
  },
}
