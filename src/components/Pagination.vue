<template>
  <div class="flex justify-between space-x-8">
    <button
      :class="buttonClass(this.hasPrev)"
      :disabled="!this.hasPrev"
      @click="onPrevClick">
      Previous
    </button>
    <button
      :class="buttonClass(this.hasNext)"
      :disabled="!this.hasNext"
      @click="onNextClick">
      Next
    </button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    value: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      default: 0
    }
  },
  computed: {
    hasPrev() {
      return this.value > 1
    },
    hasNext() {
      return this.value < this.totalPages
    }
  },
  methods: {
    buttonClass(active) {
      const classes = [
        'px-6',
        'py-2',
        'rounded-md',
        'border',
        'outline-none',
        'bg-white',
        'dark:bg-gray-800',
        'dark:border-black',
      ]

      if (!active) {
        classes.push(
          'cursor-not-allowed',
          'opacity-50'
        )
      }

      return classes
    },
    emitValue(value) {
      this.$emit('input', value)
      this.$emit('change', value)
    },
    onPrevClick() {
      if (this.hasPrev) {
        this.emitValue(this.value - 1)
      }
    },
    onNextClick() {
      if (this.hasNext) {
        this.emitValue(this.value + 1)
      }
    }
  }
}
</script>
