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
    ...mapGetters([
      'filterTypesByKeys',
      'schemaFieldsByKeys',
      'filterTypesByKey',
    ]),
  },
}
