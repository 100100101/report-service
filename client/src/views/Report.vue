<template>
  <ReportTable
    v-if="report"
    v-bind="{
      report,
    }"
  />
  <ContainerProgress v-else />
</template>

<script>
import ContainerProgress from '@/components/ContainerProgress'
import ReportTable from '@/components/ReportTable'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'App',

  components: {
    ContainerProgress,
    ReportTable,
  },

  computed: {
    ...mapGetters(['filterOptions']),
    ...mapState({
      report: state => state.report,
    }),
  },

  async created() {
    this.axiosCancelTokenSource = await this.$store.dispatch(
      'getFilteredObjects',
      this.filterOptions
    )
  },

  beforeDestroy() {
    if (this.axiosCancelTokenSource) {
      this.axiosCancelTokenSource.cancel()
    }
    this.$store.commit('setReport', null)
  },
}
</script>
