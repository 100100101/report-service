<template>
  <v-container fluid>
    <v-data-table
      :headers="headers"
      :items="report.objects"
      :items-per-page="10"
      class="elevation-1"
    />
  </v-container>
</template>

<script>
export default {
  props: {
    report: {
      type: Object,
      required: true,
    },
  },
  computed: {
    headers() {
      return this.report.schema.map(headerItem => ({
        text: headerItem.name,
        value: headerItem.key,
      }))
    },
  },
}
</script>
