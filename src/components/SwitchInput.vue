<template>
  <div class="flex flex-no-wrap items-center cursor-default select-none space-x-2">
    <span
      v-if="text"
      class="text-sm text-gray-700 dark:text-gray-400">
      {{ text }}
    </span>
    <span
      :class="wrapperClass"
      class="flex block w-10 cursor-pointer rounded-full"
      @click="onClick">
      <span
        :class="knobClass"
        class="transition duration-100 transform block w-5 h-5 rounded-full border-2 bg-white dark:bg-gray-900" />
    </span>
  </div>
</template>

<script>
export default {
  name: 'SwitchInput',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: null
    }
  },
  computed: {
    wrapperClass() {
      return this.value
        ? ['bg-green-500']
        : ['bg-gray-300', 'dark:bg-gray-800']
    },
    knobClass() {
      return this.value
        ? ['border-green-500', 'translate-x-full']
        : ['border-gray-300', 'dark:border-gray-800', 'translate-x-0']
    }
  },
  methods: {
    onClick() {
      const value = !this.value

      this.$emit('input', value)
      this.$emit('change', value)
    }
  }
}
</script>
