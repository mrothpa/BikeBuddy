// src/composables/useDeleteUser.js
import { ref } from 'vue'
import { useAppConfigStore } from '@/stores/appConfig'
import { storeToRefs } from 'pinia'
import { apiFetch } from '@/utils/api' // Dein benutzerdefiniertes apiFetch

export default function useDeleteUser() {
  const appConfigStore = useAppConfigStore()
  const { getBackendUrl, pasetoToken } = storeToRefs(appConfigStore)

  const isDeleting = ref(false)
  const deleteError = ref(null)
  const deleteSuccess = ref(false) // Um den Erfolg der Löschoperation anzuzeigen

  /**
   * Sendet einen DELETE-Request an die API, um einen Benutzer zu löschen.
   * @param {string} userId - Die ID des zu löschenden Benutzers.
   * @returns {Promise<boolean>} Ein Promise, das true zurückgibt, wenn der Benutzer erfolgreich gelöscht wurde, sonst false.
   */
  const deleteUserById = async (userId) => {
    isDeleting.value = true
    deleteError.value = null
    deleteSuccess.value = false

    if (!userId) {
      deleteError.value = 'Keine Benutzer-ID zum Löschen angegeben.'
      console.error(deleteError.value)
      isDeleting.value = false
      return false
    }

    try {
      const url = `${getBackendUrl.value}users/${userId}`
      const options = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${pasetoToken.value}`,
        },
      }

      // apiFetch sollte hier eine leere Antwort oder einen Erfolgsstatus zurückgeben
      await apiFetch(url, options)

      deleteSuccess.value = true
      return true
    } catch (err) {
      deleteError.value = err.message
      console.error(`Fehler beim Löschen des Benutzers ${userId}:`, err)
      deleteSuccess.value = false
      return false
    } finally {
      isDeleting.value = false
    }
  }

  return {
    isDeleting,
    deleteError,
    deleteSuccess,
    deleteUserById,
  }
}
