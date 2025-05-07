// src/stores/appConfig.js
import { defineStore } from 'pinia'

export const useAppConfigStore = defineStore('appConfig', {
  state: () => ({
    // backendUrl: 'http://127.0.0.1:8000/api/',
    backendUrl: 'http://scal.red/api/',
    pasetoToken: localStorage.getItem('pasetoToken') || null,
    defaultMapCenter: {
      latitude: 49.468,
      longitude: 8.475,
      zoom: 13,
    },
    user_role: localStorage.getItem('user_role') || null,
    showMap: true,
    showInfoTextAtStart: localStorage.getItem('infoText') || true,
  }),
  getters: {
    getBackendUrl: (state) => state.backendUrl,
    isAuthenticated: (state) => !!state.pasetoToken,
    getPasetoToken: (state) => state.pasetoToken,
    getDefaultMapCenter: (state) => state.defaultMapCenter,
    getUserRole: (state) => state.user_role,
    getShowMap: (state) => state.showMap,
    getShowInfoTextAtStart: (state) => state.showInfoTextAtStart,
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
    setUserRole(new_role) {
      this.user_role = new_role
      localStorage.setItem('user_role', new_role)
    },
    clearUserRole() {
      this.user_role = null
      localStorage.removeItem('user_role')
    },
    setShowMap() {
      this.showMap = !this.showMap
    },
    setShowMapDefault() {
      this.showMap = true
    },
    setShowInfoTextAtStart() {
      localStorage.setItem('infoText', true)
      this.showInfoTextAtStart = true
    },
    setShowInfoTextAtStartNot() {
      localStorage.setItem('infoText', false)
      this.showInfoTextAtStart = false
    },
  },
})
