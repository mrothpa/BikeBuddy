import { ref } from 'vue'

export default function useFetchProblems() {
  const problems = ref([])
  const error = ref(null)
  const loading = ref(false)

  const fetchProblems = async () => {
    loading.value = true
    problems.value = []
    error.value = null

    try {
      const response = await fetch('http://127.0.0.1:8000/api/problems')
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
