import { ref } from 'vue'
import { useAppConfigStore } from '@/stores/appConfig'
import { storeToRefs } from 'pinia'
import { apiFetch } from '@/utils/api' // Unser eigens definiertes Fetch

export default function useDeleteProblem() {
  const appConfigStore = useAppConfigStore()
  const { getBackendUrl, pasetoToken } = storeToRefs(appConfigStore)

  const deleting = ref(false)
  const deleteError = ref(null)
  const deleteSuccess = ref(false)

  const deleteProblem = async (uuid) => {
    if (!uuid) {
      console.warn('Problem-UUID fehlt für die Löschung.')
      return false
    }

    deleting.value = true
    deleteError.value = null
    deleteSuccess.value = false

    try {
      const url = `${getBackendUrl.value}problems/${uuid}`
      const headers = {
        Authorization: `Bearer ${pasetoToken.value}`,
      }
      const options = {
        method: 'DELETE',
        headers: headers,
      }

      await apiFetch(url, options)

      deleteSuccess.value = true
      return true
    } catch (err) {
      deleteError.value = err.message
      console.error('Fehler beim Löschen des Problems:', err)
      return false
    } finally {
      deleting.value = false
    }
  }

  return {
    deleting,
    deleteError,
    deleteSuccess,
    deleteProblem,
  }
}
