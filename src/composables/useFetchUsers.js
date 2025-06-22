// src/composables/useFetchUsers.js
import { ref } from 'vue'
import { useAppConfigStore } from '@/stores/appConfig'
import { storeToRefs } from 'pinia'
import { apiFetch } from '@/utils/api' // Dein benutzerdefiniertes apiFetch

export default function useFetchUsers() {
  const appConfigStore = useAppConfigStore()
  const { getBackendUrl, pasetoToken } = storeToRefs(appConfigStore)

  const users = ref([])
  const loadingUsers = ref(false)
  const usersError = ref(null)

  /**
   * Ruft die Liste der Benutzer von der API ab.
   * @returns {Promise<Array>} Ein Promise, das mit dem Array der Benutzer aufgelöst wird.
   */
  const fetchUsers = async () => {
    loadingUsers.value = true
    usersError.value = null
    users.value = [] // Liste vor dem Abruf leeren

    try {
      const url = `${getBackendUrl.value}users` // Der Endpunkt für Benutzer
      const options = {
        headers: {
          Authorization: `Bearer ${pasetoToken.value}`,
        },
      }

      const responseData = await apiFetch(url, options)
      users.value = responseData // Annahme: apiFetch gibt direkt die JSON-Daten zurück
      return responseData
    } catch (err) {
      usersError.value = err.message
      console.error('Fehler beim Laden der Benutzer:', err)
      return [] // Gib ein leeres Array im Fehlerfall zurück
    } finally {
      loadingUsers.value = false
    }
  }

  return {
    users,
    loadingUsers,
    usersError,
    fetchUsers,
  }
}
