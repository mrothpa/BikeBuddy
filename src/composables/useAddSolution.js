// src/composables/useAddSolution.js
import { ref } from 'vue'
import { useAppConfigStore } from '@/stores/appConfig'
import { storeToRefs } from 'pinia'
import { apiFetch } from '@/utils/api' // Importiere apiFetch

export default function useAddSolution() {
  const appConfigStore = useAppConfigStore()
  const { pasetoToken } = storeToRefs(appConfigStore)

  const loading = ref(false)
  const error = ref(null)
  const success = ref(false)

  const addSolution = async (solutionData) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const responseData = await apiFetch(`${appConfigStore.getBackendUrl}solutions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${pasetoToken.value}`,
        },
        body: JSON.stringify(solutionData),
      })

      success.value = true
      return responseData // Optional: Gib die Antwortdaten zurück
    } catch (err) {
      error.value = err.message
      console.error('Fehler beim Erstellen der Lösung:', err)
      return null // Bei Fehler null zurückgeben
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    success,
    addSolution,
  }
}
