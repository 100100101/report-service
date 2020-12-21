<template>
  <v-row>
    <v-col cols="9">
      <v-select
        :value="additionalFields"
        :items="fieldsWithoutFilterRule"
        label="Добавить дополнительные поля"
        hint="В результатах отчетра по умолчанию будет поле «Название объекта», а так же все поля к которым применены фильтры"
        item-text="name"
        item-value="key"
        multiple
        persistent-hint
        @change="changeAdditionalField"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    schema: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapState({
      filterRules: state => state.filterRules,
      additionalFields: state => state.additionalFields,
    }),
    fieldsWithoutFilterRule() {
      return this.schema.fields.filter(field => {
        return this.filterRules.every(
          filterRule => filterRule.field !== field.key
        )
      })
    },
  },

  methods: {
    changeAdditionalField(fields) {
      this.$store.commit('setAdditionalFields', fields)
    },
  },
}
</script>
