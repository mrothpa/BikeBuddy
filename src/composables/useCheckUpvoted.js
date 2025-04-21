// src/composables/useCheckUpvoted.js
import { ref } from 'vue'
import { useAppConfigStore } from '@/stores/appConfig'
import { storeToRefs } from 'pinia'
import { apiFetch } from '@/utils/api' // Importiere apiFetch

export default function useCheckUpvoted() {
  const appConfigStore = useAppConfigStore()
  const { pasetoToken } = storeToRefs(appConfigStore)

  const isUpvoted = ref(false)
  const loading = ref(false)
  const error = ref(null)

  const checkUpvoted = async (problemId) => {
    if (!problemId) {
      console.warn('Problem-ID fehlt für die Überprüfung des Upvote-Status.')
      return
    }

    loading.value = true
    error.value = null

    try {
      const responseData = await apiFetch(
        `${appConfigStore.getBackendUrl}problems/${problemId}/upvoted`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${pasetoToken.value}`,
          },
        },
      )

      isUpvoted.value = responseData ? responseData.upvoted : false // Behandle den Fall, dass apiFetch null zurückgibt
    } catch (err) {
      error.value = err.message
      console.error('Fehler beim Überprüfen des Upvote-Status:', err)
      isUpvoted.value = false // Setze auf false im Fehlerfall
    } finally {
      loading.value = false
    }
  }

  return {
    isUpvoted,
    loading,
    error,
    checkUpvoted,
  }
}
