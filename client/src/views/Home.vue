<template>
  <FilterRulesConstructor
    v-if="filterRulesConstructorSchema"
    v-bind="{
      schema: filterRulesConstructorSchema,
    }"
  />
  <ContainerProgress v-else />
</template>

<script>
import ContainerProgress from '@/components/ContainerProgress'
import FilterRulesConstructor from '@/components/FilterRulesConstructor'
import { mapState } from 'vuex'
export default {
  name: 'Home',

  components: {
    ContainerProgress,
    FilterRulesConstructor,
  },

  computed: {
    ...mapState({
      filterRulesConstructorSchema: state => state.filterRulesConstructorSchema,
    }),
  },

  created() {
    this.$store.dispatch('getFilterRulesConstructorSchema')
  },
}
</script>
