<template>
  <div :class="{ dark }">
    <div class="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 dark:text-white">
      <header class="p-4">
        <div class="container mx-auto flex items-center justify-between">
          <div class="flex items-center space-x-2 font-bold">
            <Logo class="h-7" />
            <span>{{ appName }}</span>
          </div>
          <SwitchInput
            v-model="dark"
            text="Dark Mode"
            @change="onDarkChange" />
        </div>
      </header>
      <main class="flex-grow p-4">
        <div class="container mx-auto">
          <slot />
        </div>
      </main>
      <footer class="p-4 text-sm text-gray-500">
        <div class="container mx-auto flex justify-between">
          <span>{{ appName }}</span>
          <span>{{ copyright }}</span>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import Logo from '@/components/Logo'
import SwitchInput from '@/components/SwitchInput'

export default {
  name: 'Layout',
  components: {
    Logo,
    SwitchInput
  },
  data() {
    return {
      appName: 'Rick & Morty',
      copyright: 'Roadcube Test',
      dark: false
    }
  },
  methods: {
    onDarkChange(value) {
      localStorage.setItem('darkMode', value)
    }
  },
  mounted() {
    this.dark = localStorage.getItem('darkMode') === 'true'
  }
}
</script>
