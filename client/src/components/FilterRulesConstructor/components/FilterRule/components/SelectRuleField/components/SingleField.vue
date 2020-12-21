<template>
  <v-select
    :value="schemaFieldsByKeys[currentRule.field]"
    :items="filterTypesByKey[currentRule.type]"
    :rules="rules"
    item-text="name"
    item-value="key"
    label="В данных полях"
    @change="changeFilterRuleField"
  />
</template>

<script>
import mixinForFields from './_mixinForFields'
export default {
  mixins: [mixinForFields],
  data() {
    return {
      rules: [value => !!value || 'Выберите поле'],
    }
  },
  methods: {
    changeFilterRuleField(field) {
      this.$store.commit('updateFilterRuleOptions', {
        rule: this.currentRule,
        patch: {
          field,
        },
      })
    },
  },
}
</script>
