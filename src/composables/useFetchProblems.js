// src/composables/useFetchProblems.js
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppConfigStore } from '@/stores/appConfig' // Pfad anpassen!

export default function useFetchProblems() {
  const problems = ref([])
  const error = ref(null)
  const loading = ref(false)
  const appConfigStore = useAppConfigStore()
  const { getBackendUrl } = storeToRefs(appConfigStore) // Für reaktiven Zugriff

  const fetchProblems = async () => {
    loading.value = true
    problems.value = []
    error.value = null

    try {
      const response = await fetch(getBackendUrl.value + 'problems')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      problems.value = data.map((problem) => ({
        id: problem.id,
        latitude: problem.latitude,
        longitude: problem.longitude,
        title: problem.title,
      }))
    } catch (e) {
      error.value = e
      console.error('Fehler beim Abrufen der Probleme:', e)
    } finally {
      loading.value = false
    }
  }

  return { problems, error, loading, fetchProblems }
}
