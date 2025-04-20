// src/composables/useAddProblem.js
import { ref } from 'vue'
import { useAppConfigStore } from '@/stores/appConfig'
import { storeToRefs } from 'pinia'

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
      const response = await fetch(`${appConfigStore.getBackendUrl}problems`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${pasetoToken.value}`,
        },
        body: JSON.stringify(problemData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
          errorData.message || `Fehler beim Hinzufügen des Problems: ${response.status}`,
        )
      }

      const responseData = await response.json()
      success.value = true
      return responseData // Optional: Gib die Antwortdaten zurück
    } catch (err) {
      error.value = err.message
      console.error('Fehler beim Hinzufügen des Problems:', err)
      return null // Bei Fehler null zurückgeben
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
