<template>
  <v-select
    :value="currentRule.ids"
    :items="schema.groups"
    :rules="rules"
    item-text="name"
    item-value="id"
    label="Список групп"
    @change="changeFilterRuleIds"
    multiple
  />
</template>

<script>
import mixinForFields from './_mixinForFields'
export default {
  mixins: [mixinForFields],
  data() {
    return {
      rules: [value => !!value.length || 'Выберите группы'],
    }
  },
  methods: {
    changeFilterRuleIds(ids) {
      this.$store.commit('updateFilterRuleOptions', {
        rule: this.currentRule,
        patch: {
          ids,
        },
      })
    },
  },
}
</script>
