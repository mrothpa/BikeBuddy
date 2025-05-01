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
              class="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
              @click="sortProblems('title')"
            >
              Titel
              <span v-if="sortColumn === 'title'">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span>
              <font-awesome-icon v-else :icon="['fas', 'sort']" />
            </th>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Koordinaten
            </th>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
              @click="sortProblems('category')"
            >
              Kategorie
              <span v-if="sortColumn === 'category'">{{
                sortDirection === 'asc' ? '▲' : '▼'
              }}</span>
              <font-awesome-icon v-else :icon="['fas', 'sort']" />
            </th>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
              @click="sortProblems('status')"
            >
              Status
              <span v-if="sortColumn === 'status'">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span>
              <font-awesome-icon v-else :icon="['fas', 'sort']" />
            </th>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
              @click="sortProblems('created_at')"
            >
              Erstellt am
              <span v-if="sortColumn === 'created_at'">{{
                sortDirection === 'asc' ? '▲' : '▼'
              }}</span>
              <font-awesome-icon v-else :icon="['fas', 'sort']" />
            </th>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Löschen
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="problem in sortedProblems" :key="problem.id">
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <button
                @click="openProblemDetails(problem.id)"
                class="text-regal-blue-500 hover:text-regal-blue-700 font-semibold"
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
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
              {{ formatDate(problem.created_at) }}
            </td>
            <td
              class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right text-regal-blue-500 hover:text-regal-blue-700 cursor-pointer"
              @click="handleDelete"
            >
              Löschen
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
import { onMounted, ref, computed } from 'vue'
import ProblemDetails from '@/components/ProblemDetailsModal.vue' // Pfad anpassen!

const { problems, error, loading, fetchProblems } = useFetchProblems()

const showDetails = ref(false)
const selectedProblemId = ref(null)
const sortColumn = ref(null)
const sortDirection = ref('asc')

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

const sortProblems = (column) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = column
    sortDirection.value = 'asc'
  }
}

const sortedProblems = computed(() => {
  if (!sortColumn.value) {
    return [...problems.value] // Gib eine Kopie des ursprünglichen Arrays zurück
  }

  return [...problems.value].sort((a, b) => {
    const aValue = a[sortColumn.value]
    const bValue = b[sortColumn.value]

    let comparison = 0
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      comparison = aValue.localeCompare(bValue)
    } else if (aValue > bValue) {
      comparison = 1
    } else if (aValue < bValue) {
      comparison = -1
    }

    return sortDirection.value === 'asc' ? comparison : comparison * -1
  })
})

const handleDelete = () => {
  console.log('Deleted')
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
