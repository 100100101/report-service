<template>
  <v-text-field
    :value="currentRule.value"
    label="Числовое поле"
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
        value => {
          const valueParseInt = parseInt(value, 10)
          return (
            valueParseInt === 0 ||
            (!!valueParseInt &&
              value.length === valueParseInt.toString().length) ||
            'Только цифры'
          )
        },
      ],
    }
  },
}
</script>
