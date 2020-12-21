<template>
  <v-select
    :items="schema.filterTypes"
    :value="filterTypesByKeys[currentRule.type]"
    item-text="name"
    item-value="key"
    label="Тип фильтра"
    return-object
    @change="changeFilterRuleType"
  />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    schema: {
      type: Object,
      required: true,
    },
    currentRule: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters(['filterTypesByKeys']),
  },

  methods: {
    changeFilterRuleType(rule) {
      const filterTypeKey = rule.key
      if (this.currentRule.type !== rule.type) {
        this.setFilterRuleTemplate(rule)
        return
      }
      this.$store.commit('updateFilterRuleOptions', {
        rule: this.currentRule,
        patch: {
          type: filterTypeKey,
        },
      })
    },
    setFilterRuleTemplate(rule) {
      const template = {
        type: (rule && rule.key) || this.schema.filterTypes[0].key,
      }

      if (this.filterTypesByKeys[template.type].type === 'groups') {
        template.ids = []
      } else {
        template.value = ''
        template.field = ''
      }

      this.$store.commit('setFilterRuleTemplate', {
        currentRule: this.currentRule,
        newRule: template,
      })
    },
  },

  created() {
    if (!this.currentRule.type) {
      this.setFilterRuleTemplate()
    }
  },
}
</script>
