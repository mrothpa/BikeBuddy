// src/stores/appConfig.js
import { defineStore } from 'pinia'

export const useAppConfigStore = defineStore('appConfig', {
  state: () => ({
    backendUrl: 'http://127.0.0.1:8000/api/',
    pasetoToken: localStorage.getItem('pasetoToken') || null,
    defaultMapCenter: {
      latitude: 49.468,
      longitude: 8.475,
      zoom: 13,
    },
  }),
  getters: {
    getBackendUrl: (state) => state.backendUrl,
    isAuthenticated: (state) => !!state.pasetoToken,
    getPasetoToken: (state) => state.pasetoToken,
    getDefaultMapCenter: (state) => state.defaultMapCenter,
  },
  actions: {
    setBackendUrl(newUrl) {
      this.backendUrl = newUrl
    },
    setPasetoToken(token) {
      this.pasetoToken = token
      localStorage.setItem('pasetoToken', token)
    },
    clearPasetoToken() {
      this.pasetoToken = null
      localStorage.removeItem('pasetoToken')
    },
  },
})
