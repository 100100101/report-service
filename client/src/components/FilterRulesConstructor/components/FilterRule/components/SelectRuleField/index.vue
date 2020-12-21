<template>
  <div>
    <MultipleField
      v-if="isGroupsRuleType"
      v-bind="{
        schema,
        currentRule,
      }"
    />
    <SingleField
      v-else
      v-bind="{
        schema,
        currentRule,
      }"
    />
  </div>
</template>

<script>
import MultipleField from './components/MultipleField'
import SingleField from './components/SingleField'
export default {
  components: {
    MultipleField,
    SingleField,
  },
  props: {
    schema: {
      type: Object,
      required: true,
    },
    currentRule: {
      type: Object,
      required: true,
    },
    isGroupsRuleType: {
      type: Boolean,
      required: true,
    },
  },
}
</script>
