<template>
  <div class="flex flex-col space-y-8">
    <div class="flex flex-col items-stretch space-y-4 sm:items-center sm:space-y-0 sm:space-x-8 sm:flex-row">
      <h1 class="font-bold text-2xl flex-grow">
        {{ title }}
      </h1>
      <div class="flex flex-col items-center space-y-2 sm:space-y-0 sm:space-x-4 sm:flex-row">
        <SearchInput
          v-model="filters.name"
          placeholder="Search by name..."
          class="w-full sm:w-auto"
          @change="onFiltersChange" />
        <SelectInput
          v-model="filters.gender"
          :options="genderOptions"
          :style="{ minWidth: '12rem' }"
          class="w-full sm:w-auto"
          @change="onFiltersChange" />
      </div>
    </div>
    <Alert
      v-if="loading"
      text="Loading..." />
    <Alert
      v-else-if="error"
      :text="error"
      type="error" />
    <template v-else>
      <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        <CharacterCard
          v-for="item in results"
          :key="item.id"
          :data="item" />
      </div>
      <Pagination
        v-model="page"
        :total-pages="info.pages"
        @change="fetch" />
    </template>
  </div>
</template>

<script>
import Alert from '@/components/Alert'
import SearchInput from '@/components/SearchInput'
import SelectInput from '@/components/SelectInput'
import CharacterCard from '@/components/CharacterCard'
import Pagination from '@/components/Pagination'

export default {
  name: 'Home',
  components: {
    Alert,
    SearchInput,
    SelectInput,
    CharacterCard,
    Pagination
  },
  watch: {
    filters: {
      deep: true,
      handler(value) {
        const { name, gender, ...query } = { ...this.$route.query, ...value }

        if (name)   query['name'] = name
        if (gender) query['gender'] = gender

        this.$router.replace({ query })
      }
    }
  },
  data() {
    return {
      title: 'Characters',
      page: 1,
      filters: {
        name: this.$route.query.name,
        gender: this.$route.query.gender
      },
      genderOptions: [
        { value: null, label: 'All Genders' },
        { value: 'unknown', label: 'Unknown Gender' },
        { value: 'genderless', label: 'Genderless' },
        { value: 'female', label: 'Female' },
        { value: 'male', label: 'Male' }
      ],
      loading: false,
      error: null,
      results: null,
      info: {}
    }
  },
  computed: {
    searchParams() {
      return {
        page: this.page,
        ...this.filters
      }
    }
  },
  methods: {
    async fetch() {
      this.info    = {}
      this.error   = null
      this.loading = true

      await this.$api.get('character', this.searchParams, {
        onSuccess: ({ results, info }) => {
          this.info    = info
          this.results = results
          this.loading = false
        },
        onError: (error) => {
          this.error   = error
          this.loading = false
        }
      })
    },
    onFiltersChange() {
      this.page = 1
      this.fetch()
    }
  },
  async created() {
    await this.fetch()
  }
}
</script>
