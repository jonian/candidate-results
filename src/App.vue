<template>
  <Layout id="app">
    <router-view/>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout'

export default {
  name: 'App',
  components: {
    Layout
  }
}
</script>
