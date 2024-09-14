<template>
  <div style="display: inline;"><strong>{{preText}}&nbsp;</strong>
    <textarea
      style="text-align: center;"
      :value="modelValue"
      :placeholder="placeholder"
      @input="updateValue"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: 'TextAreaInput',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '' 
    },
    preText: {
      type: String,
      default: '' 
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
}
</script>

<style scoped>
/* Add any styles specific to this component here */
</style>
