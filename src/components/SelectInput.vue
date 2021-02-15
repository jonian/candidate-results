<template>
  <div class="relative cursor-pointer max-w-full">
    <div
      :class="inputClass"
      class="flex justify-between items-center h-10 px-3 space-x-4 border rounded-md bg-white dark:bg-gray-800 dark:border-black"
      @click="open = !open">
      <span>{{ active.label }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        class="h-4 opacity-50">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
      </svg>
    </div>
    <div
      v-if="open"
      class="absolute w-full mt-1 py-1 border rounded-md z-50 bg-white dark:bg-gray-800 dark:border-black">
      <div
        v-for="option in options"
        :key="option.value"
        :class="activeClass(option)"
        class="px-3 py-2"
        @click="onClick(option)">
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectInput',
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    options: {
      type: Array,
      default: null
    },
    placeholder: {
      type: String,
      default: 'Select'
    }
  },
  data() {
    return {
      open: false
    }
  },
  computed: {
    active() {
      const empty  = { label: this.placeholder }
      const active = this.options.find(opt => opt.value === this.value)

      return active || empty
    },
    inputClass() {
      return this.open
        ? ['border-green-500', 'dark:border-green-500']
        : ['hover:border-green-500', 'dark:hover:border-green-500']
    }
  },
  methods: {
    activeClass({ value }) {
      return this.active.value === value
        ? ['text-white', 'bg-green-500']
        : ['hover:bg-gray-300', 'hover:bg-opacity-10', 'dark:hover:bg-black', 'dark:hover:bg-opacity-20']
    },
    onClick({ value }) {
      if (value !== this.value) {
        this.$emit('input', value)
        this.$emit('change', value)
      }

      this.open = false
    },
    outsideClick({ target }) {
      if (!this.$el.isSameNode(target) && !this.$el.contains(target)) {
        this.open = false
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.outsideClick)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.outsideClick)
  }
}
</script>
