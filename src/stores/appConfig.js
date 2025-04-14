// src/stores/appConfig.js
import { defineStore } from 'pinia'

export const useAppConfigStore = defineStore('appConfig', {
  state: () => ({
    backendUrl: 'http://127.0.0.1:8000/api/',
  }),
  getters: {
    getBackendUrl: (state) => state.backendUrl,
  },
  actions: {
    setBackendUrl(newUrl) {
      this.backendUrl = newUrl
    },
  },
})
