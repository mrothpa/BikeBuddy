import { ref } from 'vue'
import { useAppConfigStore } from '@/stores/appConfig'

export default function useFetchProblemDetails(problemId) {
  const appConfigStore = useAppConfigStore()
  const problemDetails = ref(null)
  const solutions = ref([])
  const error = ref(null)
  const loadingProblem = ref(false)
  const loadingSolutions = ref(false)
  // console.log(problemId)

  const fetchProblem = async () => {
    loadingProblem.value = true
    error.value = null
    problemDetails.value = null

    try {
      const response = await fetch(`${appConfigStore.getBackendUrl}problems/${problemId}`)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
          errorData.message || `Fehler beim Laden der Problem-Details: ${response.status}`,
        )
      }
      problemDetails.value = await response.json()
    } catch (err) {
      error.value = err.message
      console.error('Fehler beim Laden der Problem-Details:', err)
    } finally {
      loadingProblem.value = false
    }
  }

  const fetchSolutions = async () => {
    loadingSolutions.value = true
    error.value = null
    solutions.value = []

    try {
      const response = await fetch(`${appConfigStore.getBackendUrl}problems/${problemId}/solutions`)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `Fehler beim Laden der Lösungen: ${response.status}`)
      }
      solutions.value = await response.json()
    } catch (err) {
      error.value = err.message
      console.error('Fehler beim Laden der Lösungen:', err)
    } finally {
      loadingSolutions.value = false
    }
  }

  // Sofortiges Abrufen der Daten, wenn das Composable verwendet wird
  fetchProblem()
  fetchSolutions()

  return {
    problemDetails,
    solutions,
    error,
    loadingProblem,
    loadingSolutions,
    fetchProblem, // Optional: Falls du die Daten später erneut abrufen möchtest
    fetchSolutions, // Optional: Falls du die Lösungen später erneut abrufen möchtest
  }
}
