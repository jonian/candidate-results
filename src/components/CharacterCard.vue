<template>
  <div class="flex flex-col rounded-md overflow-hidden border bg-white dark:bg-gray-800 dark:border-black">
    <div class="relative aspect-w-4 aspect-h-3">
      <img
        :src="data.image"
        :alt="data.name"
        class="absolute inset bg-gray-100 dark:bg-black object-cover object-center" />
    </div>
    <div class="p-4 space-y-4">
      <div class="font-bold space-y-1">
        <h2 class="text-lg">
          {{ data.name }}
        </h2>
        <div class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <span
            :class="statusColor(data.status)"
            class="block w-2 h-2 rounded-full" />
          <span>{{ data.status }} - {{ data.species }} - {{ data.gender }}</span>
        </div>
      </div>
      <div
        v-for="item, index in infoRows"
        :key="index"
        class="flex flex-col space-y-1 text-sm">
        <span class="font-bold text-gray-500 dark:text-gray-400">
          {{ item.label }}
        </span>
        <span>{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharacterCard',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    infoRows() {
      return [
        { label: 'First known location:', value: this.data.origin.name },
        { label: 'Last known location:', value: this.data.location.name }
      ]
    }
  },
  methods: {
    statusColor(status) {
      const mapping = {
        dead: 'bg-red-500',
        alive: 'bg-green-500'
      }

      return mapping[status.toLowerCase()] || 'bg-gray-400'
    }
  }
}
</script>
