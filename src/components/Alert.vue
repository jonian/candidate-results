<template>
  <div
    :class="typeClass"
    class="flex px-4 py-3 border rounded-md">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    type: {
      type: String,
      default: 'info'
    },
    text: {
      type: String,
      required: true
    }
  },
  computed: {
    typeClass() {
      const mapping = {
        info: 'border-blue-500 bg-blue-100 text-blue-900 dark:bg-blue-500 dark:text-white',
        success: 'border-green-500 bg-green-100 text-green-900 dark:bg-green-500 dark:text-white',
        warning: 'border-orange-500 bg-orange-100 text-orange-900 dark:bg-orange-500 dark:text-white',
        error: 'border-red-500 bg-red-100 text-red-900 dark:bg-red-500 dark:text-white'
      }

      return mapping[this.type] || mapping.info
    }
  }
}
</script>
