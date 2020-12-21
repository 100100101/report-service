export default {
  props: {
    currentRule: {
      type: Object,
      required: true,
    },
  },
  methods: {
    changeFilterRuleValue(value) {
      this.$store.commit('updateFilterRuleOptions', {
        rule: this.currentRule,
        patch: {
          value,
        },
      })
    },
  },
}
