<template>
  <div class="flex relative">
    <span class="absolute pointer-events-none flex items-center px-3 inset-y-0 opacity-50">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        class="h-4">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </span>
    <input
      v-bind="$attrs"
      :value="value"
      class="w-full h-10 pl-9 outline-none rounded-md bg-white border hover:border-green-500 focus:border-green-500 dark:bg-gray-800 dark:border-black dark:hover:border-green-500 dark:focus:border-green-500"
      @input="onInput"
      @change="onChange" />
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number],
      default: null
    }
  },
  methods: {
    onInput({ target }) {
      const value = target.value == '' ? null : target.value
      this.$emit('input', value)
    },
    onChange() {
      this.$emit('change', this.value)
    }
  }
}
</script>
