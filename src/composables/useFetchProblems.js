// src/composables/useFetchProblems.js
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppConfigStore } from '@/stores/appConfig' // Pfad anpassen!
// import { apiFetch } from '@/utils/api'; // Importiere apiFetch für Admin-Anfrage

export default function useFetchProblems() {
  const problems = ref([])
  const error = ref(null)
  const loading = ref(false)
  const appConfigStore = useAppConfigStore()
  const { user_role, pasetoToken } = storeToRefs(appConfigStore)

  const fetchProblems = async () => {
    loading.value = true
    problems.value = []
    error.value = null

    try {
      let response = null
      if (user_role.value === 'admin') {
        response = await fetch(appConfigStore.getBackendUrl + 'admin/problems', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${pasetoToken.value}`,
          },
        })
      } else {
        response = await fetch(appConfigStore.getBackendUrl + 'problems', { method: 'GET' })
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()

      if (user_role.value === 'admin') {
        problems.value = data.map((problem) => ({
          id: problem.id,
          created_at: problem.created_at,
          user: problem.user,
          latitude: problem.latitude,
          longitude: problem.longitude,
          // title: problem.title, // title
          status: problem.status,
          category: problem.category,
          description: problem.description,
          upvotes_int: problem.upvotes_int || 0,
        }))
      } else {
        problems.value = data.map((problem) => ({
          id: problem.id,
          latitude: problem.latitude,
          longitude: problem.longitude,
          // title: problem.title, // title
          status: problem.status,
          category: problem.category,
          created_at: problem.created_at,
          upvotes_int: problem.upvotes_int,
        }))
      }
    } catch (e) {
      error.value = e + '(Bitte neu anmelden und erneut versuchen.)'
      console.error('Fehler beim Abrufen der Probleme:', e)
    } finally {
      loading.value = false
    }
  }

  return { problems, error, loading, fetchProblems }
}
