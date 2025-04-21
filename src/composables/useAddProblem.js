// src/composables/useAddProblem.js
import { ref } from 'vue'
import { useAppConfigStore } from '@/stores/appConfig'
import { storeToRefs } from 'pinia'
import { apiFetch } from '@/utils/api' // Importiere apiFetch

export default function useAddProblem() {
  const appConfigStore = useAppConfigStore()
  const { pasetoToken } = storeToRefs(appConfigStore)

  const loading = ref(false)
  const error = ref(null)
  const success = ref(false)

  const addProblem = async (problemData) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const responseData = await apiFetch(`${appConfigStore.getBackendUrl}problems`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${pasetoToken.value}`,
        },
        body: JSON.stringify(problemData),
      })

      success.value = true
      return responseData
    } catch (err) {
      error.value = err.message
      console.error('Fehler beim Hinzufügen des Problems:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    success,
    addProblem,
  }
}
