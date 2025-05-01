<template>
  <div class="m-6 relative">
    <h1 class="text-2xl font-bold mb-4 text-regal-blue-900">Übersicht der Meldungen</h1>

    <div v-if="loading" class="mb-4">Lade Meldungen...</div>
    <div v-if="error" class="text-red-500 mb-4">Fehler beim Laden der Meldungen: {{ error }}</div>

    <div v-if="problems.length > 0" class="overflow-x-auto">
      <table class="min-w-full leading-normal shadow-md rounded-lg">
        <thead class="bg-gray-100">
          <tr>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Titel
            </th>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Koordinaten
            </th>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Kategorie
            </th>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Erstellt am
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="problem in problems" :key="problem.id">
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <button
                @click="openProblemDetails(problem.id)"
                class="text-regal-blue-500 hover:text-regal-blue-700 font-semibold cursor-pointer hover:underline"
              >
                {{ problem.title }}
              </button>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
              ({{ problem.latitude.toFixed(5) }}, {{ problem.longitude.toFixed(5) }})
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
              {{ problem.category || '-' }}
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
              {{ problem.status || '-' }}
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
              {{ formatDate(problem.created_at) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="!loading && !error">Keine Meldungen vorhanden.</div>

    <div
      v-if="showDetails"
      class="absolute inset-0 z-50 flex items-center justify-center bg-black/30"
    >
      <ProblemDetails :problemId="selectedProblemId" @close="closeProblemDetails" />
    </div>
  </div>
</template>

<script setup>
import useFetchProblems from '@/composables/useFetchProblems'
import { onMounted, ref } from 'vue'
import ProblemDetails from '@/components/ProblemDetailsModal.vue' // Pfad anpassen!

const { problems, error, loading, fetchProblems } = useFetchProblems()

const showDetails = ref(false)
const selectedProblemId = ref(null)

onMounted(async () => {
  fetchProblems()
})

const formatDate = (dateTimeString) => {
  if (!dateTimeString) return '-'
  const date = new Date(dateTimeString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${day}.${month}.${year}`
}

const openProblemDetails = (id) => {
  selectedProblemId.value = id
  showDetails.value = true
}

const closeProblemDetails = () => {
  selectedProblemId.value = null
  showDetails.value = false
}
</script>

<style scoped>
/* Optional: Füge hier spezifische Stile hinzu, falls nötig */
</style>
