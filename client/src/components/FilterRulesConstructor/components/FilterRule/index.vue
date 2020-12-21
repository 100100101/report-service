<template>
  <v-row>
    <v-col cols="3">
      <SelectRuleType
        v-bind="{
          schema,
          currentRule: filterRule,
        }"
      />
    </v-col>

    <v-col v-if="!isGroupsRuleType" cols="3">
      <SetRuleValue
        v-bind="{
          currentRule: filterRule,
        }"
      />
    </v-col>

    <v-col :cols="isGroupsRuleType ? 6 : 3">
      <SelectRuleField
        v-bind="{
          schema,
          currentRule: filterRule,
          isGroupsRuleType,
        }"
      />
    </v-col>

    <v-col cols="3" align-self="center">
      <v-btn icon color="pink" @click="removeFilterRule(filterRule)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import SelectRuleType from './components/SelectRuleType'
import SetRuleValue from './components/SetRuleValue'
import SelectRuleField from './components/SelectRuleField'
import { mapGetters } from 'vuex'
export default {
  components: {
    SelectRuleType,
    SetRuleValue,
    SelectRuleField,
  },
  props: {
    schema: {
      type: Object,
      required: true,
    },
    filterRule: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters(['filterTypesByKeys']),
    isGroupsRuleType() {
      const filterRuleType = this.filterRule.type
      return (
        !!filterRuleType &&
        this.filterTypesByKeys[filterRuleType].type === 'groups'
      )
    },
  },
  methods: {
    removeFilterRule(filterRule) {
      this.$store.commit('removeFilterRule', filterRule)
    },
  },
}
</script>
