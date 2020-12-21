<template>
  <ValueIsString
    v-if="ruleValueType === 'string'"
    v-bind="{
      currentRule,
    }"
  />
  <ValueIsNumber
    v-else-if="ruleValueType === 'number'"
    v-bind="{
      currentRule,
    }"
  />
  <ValueIsDate
    v-else-if="ruleValueType === 'date'"
    v-bind="{
      currentRule,
    }"
  />
</template>

<script>
import ValueIsString from './components/ValueIsString'
import ValueIsNumber from './components/ValueIsNumber'
import ValueIsDate from './components/ValueIsDate'
import { mapGetters } from 'vuex'
export default {
  components: {
    ValueIsString,
    ValueIsNumber,
    ValueIsDate,
  },
  props: {
    currentRule: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['filterTypesByKeys']),
    ruleValueType() {
      const filterRuleType = this.currentRule.type
      return filterRuleType && this.filterTypesByKeys[filterRuleType].type
    },
  },
}
</script>
