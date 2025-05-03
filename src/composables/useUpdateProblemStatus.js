// src/composables/useUpdateProblemStatus.js
import { ref } from 'vue'
import { useAppConfigStore } from '@/stores/appConfig'
import { storeToRefs } from 'pinia'
import { apiFetch } from '@/utils/api' // Unser eigens definiertes Fetch

export default function useUpdateProblemStatus() {
  const appConfigStore = useAppConfigStore()
  const { getBackendUrl, pasetoToken } = storeToRefs(appConfigStore)

  const updatingStatus = ref(false)
  const updateStatusError = ref(null)
  const updateStatusSuccess = ref(false)

  const updateProblemStatus = async (id, newStatus) => {
    if (!id) {
      console.warn('Problem-ID fehlt für die Status-Aktualisierung.')
      return false
    }
    if (!newStatus) {
      console.warn('Neuer Status fehlt für die Status-Aktualisierung.')
      return false
    }

    updatingStatus.value = true
    updateStatusError.value = null
    updateStatusSuccess.value = false

    let backendStatus
    switch (newStatus) {
      case 'status-1':
        backendStatus = 'offen'
        break
      case 'status-2':
        backendStatus = 'in Bearbeitung'
        break
      case 'status-3':
        backendStatus = 'erledigt'
        break
      default:
        console.warn(`Ungültiger Status übergeben: ${newStatus}`)
        updatingStatus.value = false
        return false
    }

    try {
      const url = `${getBackendUrl.value}problems/${id}`
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${pasetoToken.value}`,
      }
      const body = JSON.stringify({ status: backendStatus })
      const options = {
        method: 'PATCH',
        headers: headers,
        body: body,
      }

      await apiFetch(url, options)

      updateStatusSuccess.value = true
      return true
    } catch (err) {
      updateStatusError.value = err.message
      console.error('Fehler beim Aktualisieren des Problem-Status:', err)
      return false
    } finally {
      updatingStatus.value = false
    }
  }

  return {
    updatingStatus,
    updateStatusError,
    updateStatusSuccess,
    updateProblemStatus,
  }
}
