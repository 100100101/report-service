<template>
  <v-dialog ref="dialog" v-model="modal" persistent width="290px">
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :value="currentRule.value"
        label="Выберите дату"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      />
    </template>
    <v-date-picker :value="currentRule.value" scrollable @change="setDate">
      <v-spacer />
      <v-btn text color="primary" @click="modal = false">
        Отмена
      </v-btn>
      <v-btn text color="primary" @click="setDate(currentRule.value)">
        OK
      </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
import mixinForFields from './_mixinForFields'
export default {
  mixins: [mixinForFields],
  data() {
    return {
      modal: false,
    }
  },
  methods: {
    setDate(date) {
      this.$refs.dialog.save(date)
      this.changeFilterRuleValue(date)
    },
  },
  created() {
    if (!this.currentRule.value) {
      this.changeFilterRuleValue(new Date().toISOString().substr(0, 10))
    }
  },
}
</script>
