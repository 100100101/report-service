<template>
  <v-text-field
    :value="currentRule.value"
    label="Что ищем"
    :rules="rules"
    @input="changeFilterRuleValue"
  />
</template>

<script>
import mixinForFields from './_mixinForFields'
export default {
  mixins: [mixinForFields],
  data() {
    return {
      rules: [
        value => !!value || 'Обязательное поле',
        // value => (value && value.length >= 3) || 'Минимально 3 символа',
      ],
    }
  },
}
</script>
