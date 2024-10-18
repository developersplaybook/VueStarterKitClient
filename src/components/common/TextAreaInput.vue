<template>
    <textarea
    spellcheck="false"
    :style="{
        'text-align': 'center',
        'border': hasError ? '2px solid red' : '1px solid black',
        'background-color': hasError ? '#ffe6e6' : 'white'
      }"
      :value="modelValue"
      :placeholder="placeholder"
      @input="updateValue"
    ></textarea>
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
    hasError: {
      type: Boolean,
      default: false 
    },
    textChanged: {
      type: Function,
      required: false
    }
  },
  methods: {
    updateValue(event) {
      const newValue = event.target.value;
      this.$emit('textChanged', newValue); // Emit the textChanged event
    }
  }
}
</script>

<style scoped>
/* Add any styles specific to this component here */
</style>
