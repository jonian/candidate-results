import ky from 'ky'

export default {
  install(Vue) {
    const clearParams = object => {
      return Object.entries(object).reduce((params, [key, value]) => {
        if (value != null && value !== '') params[key] = value
        return params
      }, {})
    }

    Vue.prototype.$api = {
      request(path, options) {
        return ky(path, {
          prefixUrl: 'https://rickandmortyapi.com/api',
          ...options
        })
      },
      async get(path, params, { onSuccess, onError }) {
        try {
          const response = await this.request(path, {
            method: 'GET',
            searchParams: clearParams(params)
          })

          const result = await response.json()
          onSuccess && onSuccess.call(null, result)
        } catch (e) {
          onError && onError.call(null, e.message)
        }
      }
    }
  }
}
