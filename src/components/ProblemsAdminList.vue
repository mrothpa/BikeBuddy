<template>
  <div class="m-6 relative">
    <button
      class="absolute right-2 bg-regal-blue-900 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-regal-blue-700 focus:outline-none focus:ring-2 focus:ring-regal-blue-500 cursor-pointer"
      @click="openFilterModal"
    >
      <font-awesome-icon icon="filter" size="lg" />
    </button>
    <button
      @click="handleDownload"
      :disabled="isDownloading"
      class="absolute right-14 bg-regal-blue-900 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-regal-blue-700 focus:outline-none focus:ring-2 focus:ring-regal-blue-500 cursor-pointer"
    >
      <font-awesome-icon icon="download" size="lg" />
    </button>
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
              class="px-5 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              E-Mail
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
                class="text-regal-blue-500 hover:text-regal-blue-700 font-semibold hover:underline cursor-pointer"
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
            <td
              class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center hover:underline cursor-pointer"
              @click="triggerChangeStatus(problem.id)"
            >
              {{ problem.status || '-' }}
            </td>
            <td
              class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center hover:underline cursor-pointer"
            >
              <a :href="`mailto:${problem.user.email}`">{{ problem.user.email }}</a>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
              {{ formatDate(problem.created_at) }}
            </td>
            <td
              class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right text-regal-blue-500 hover:text-regal-blue-700 cursor-pointer"
              @click="triggerDeleteConfirmation(problem.id)"
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

    <div v-if="showDeleteModal">
      <ConfirmDeleteModal @close="closeDeleteModal" @confirm-delete="handleDeleteConfirmed" />
    </div>

    <div v-if="showChangeStatusModal">
      <ChangeStatusModal
        @close="closeChangeStatusModal"
        @status-1="handleChangeStatus('status-1')"
        @status-2="handleChangeStatus('status-2')"
        @status-3="handleChangeStatus('status-3')"
      />
    </div>

    <div
      v-if="showFilterModal"
      class="absolute inset-0 z-50 flex items-center justify-center bg-black/30"
    >
      <ProblemFilterModal
        :problems="problems"
        @close="closeFilterModal"
        @apply-filters="handleApplyFilters"
      />
    </div>

    <div v-if="deleting">Lösche Eintrag...</div>
    <div v-if="deleteError" class="text-red-500">Fehler beim Löschen: {{ deleteError }}</div>
    <div v-if="deleteSuccess" class="text-green-500">Eintrag erfolgreich gelöscht!</div>

    <div v-if="updatingStatus">Aktualisiere Status...</div>
    <div v-if="updateStatusError" class="text-red-500">
      Fehler Aktualisieren: {{ updateStatusError }}
    </div>
    <div v-if="updateStatusSuccess" class="text-green-500">Status aktualisiert!</div>

    <div>
      <p v-if="isDownloading">Daten werden heruntergeladen...</p>
      <p v-if="downloadError" class="text-red-500">Fehler beim Download: {{ downloadError }}</p>
    </div>
  </div>
</template>

<script setup>
import useFetchProblems from '@/composables/useFetchProblems'
import { onMounted, ref, computed } from 'vue'
import ProblemDetails from '@/components/ProblemDetailsModal.vue' // Pfad anpassen!
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue' // Pfad anpassen!
import ChangeStatusModal from '@/components/ChangeStatusModal.vue' // Pfad anpassen!
import useDeleteProblem from '@/composables/useDeleteProblem'
import useUpdateProblemStatus from '@/composables/useUpdateProblemStatus'
import ProblemFilterModal from '@/components/ProblemFilterModal.vue'
import useDownloadData from '@/composables/useDownloadData'

const { problems, error, loading, fetchProblems } = useFetchProblems()
const { isDownloading, downloadError, downloadCsv } = useDownloadData()

const showFilterModal = ref(false)
const showDetails = ref(false)
const selectedProblemId = ref(null)
const sortColumn = ref(null)
const sortDirection = ref('asc')

// Neue Variable für die aktuell anzuzeigende Liste
const displayedProblems = ref([])

const showDeleteModal = ref(false)
const itemToDeleteId = ref(null)
const { deleting, deleteError, deleteSuccess, deleteProblem } = useDeleteProblem()

const showChangeStatusModal = ref(false)
const itemToChangeStatusId = ref(null)
const { updatingStatus, updateStatusError, updateStatusSuccess, updateProblemStatus } =
  useUpdateProblemStatus()

onMounted(async () => {
  await fetchProblems()
  displayedProblems.value = [...problems.value]
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
  const currentList = [...displayedProblems.value]

  if (!sortColumn.value) {
    return currentList
  }

  return currentList.sort((a, b) => {
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

const openFilterModal = () => {
  showFilterModal.value = true
  // Setze displayedProblems zurück auf alle Probleme, wenn das Modal geschlossen wird
  displayedProblems.value = [...problems.value]
}

const closeFilterModal = () => {
  showFilterModal.value = false
}

const handleApplyFilters = (filters) => {
  const newFilteredProblems = problems.value.filter((problem) => {
    const titleMatch =
      !filters.title || problem.title?.toLowerCase().includes(filters.title.toLowerCase())
    const categoryMatch = !filters.category || problem.category === filters.category
    const statusMatch = !filters.status || problem.status === filters.status
    const createdAtMatch =
      (!filters.createdAtFrom || new Date(problem.created_at) >= new Date(filters.createdAtFrom)) &&
      (!filters.createdAtTo || new Date(problem.created_at) <= new Date(filters.createdAtTo))

    return titleMatch && categoryMatch && statusMatch && createdAtMatch
  })
  displayedProblems.value = newFilteredProblems
  showFilterModal.value = false
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  itemToDeleteId.value = null
}

const triggerDeleteConfirmation = (itemId) => {
  itemToDeleteId.value = itemId
  showDeleteModal.value = true
}

const handleDeleteConfirmed = async () => {
  // console.log('Löschen des Elements mit ID: ', itemToDeleteId.value, ' wird durchgeführt')
  if (itemToDeleteId.value) {
    const success = await deleteProblem(itemToDeleteId.value)
    if (success) {
      await fetchProblems()
      // } else if (deleteError.value) {
      //   console.error('Fehler beim Löschen: ', deleteError.value)
    }
    showDeleteModal.value = false
    itemToDeleteId.value = null
  }
}

const closeChangeStatusModal = () => {
  showChangeStatusModal.value = false
  itemToChangeStatusId.value = null
}

const triggerChangeStatus = (itemId) => {
  showChangeStatusModal.value = true
  itemToChangeStatusId.value = itemId
}

const handleChangeStatus = async (newStatus) => {
  const success = await updateProblemStatus(itemToChangeStatusId.value, newStatus)
  if (success) {
    await fetchProblems()
  }
}

const handleDownload = () => {
  downloadCsv(sortedProblems.value, 'radweg_meldungen.csv')
}
</script>

<style scoped>
/* .cursor-pointer {
  cursor: pointer;
} */
</style>
