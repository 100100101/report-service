<template>
  <v-container fluid>
    <FilterRule
      v-for="(filterRule, index) in filterRules"
      :key="`filterRule_${index}`"
      v-bind="{
        schema,
        filterRule,
      }"
    />

    <v-btn elevation="2" color="primary" @click="addFilterRule">
      <v-icon>mdi-plus</v-icon><span class="mr-2">Добавить фильтр</span>
    </v-btn>

    <AdditionalFieldsChange
      v-bind="{
        schema,
      }"
    />
  </v-container>
</template>

<script>
import FilterRule from './components/FilterRule'
import AdditionalFieldsChange from './components/AdditionalFieldsChange'
import { mapState } from 'vuex'
export default {
  components: {
    FilterRule,
    AdditionalFieldsChange,
  },
  props: {
    schema: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapState({
      filterRules: state => state.filterRules,
    }),
  },

  methods: {
    addFilterRule() {
      this.$store.commit('addFilterRule', {})
    },
  },

  created() {
    console.log('this.schema:', this.schema)
  },
}
</script>
