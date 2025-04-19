<template>
  <div class="absolute inset-0 bg-black/30 z-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md mx-4">
      <button @click="closeModal" class="absolute top-3 right-3 text-gray-500 hover:text-black">
        <font-awesome-icon icon="times" />
      </button>

      <div v-if="loadingProblem" class="text-gray-500 italic mt-8">Lade Problem-Details...</div>
      <div v-else-if="error" class="text-red-500 mt-8">{{ error }}</div>
      <div v-else-if="problemDetails" class="mt-8">
        <div class="mb-4">
          <div class="flex justify-between items-start mb-2">
            <div>
              <h2 class="text-xl font-bold text-regal-blue-900">{{ problemDetails?.title }}</h2>
              <p class="text-sm text-gray-600">{{ problemDetails?.category }}</p>
            </div>
            <div
              v-if="problemDetails?.status"
              class="font-semibold text-sm self-start"
              :class="{
                'text-red-500': problemDetails.status === 'offen',
                'text-blue-500': problemDetails.status === 'in Bearbeitung',
                'text-green-500': problemDetails.status === 'erledigt',
              }"
            >
              {{ problemDetails.status }}
            </div>
          </div>
          <p class="text-gray-700 mb-4 max-h-48 overflow-y-auto">
            {{ problemDetails?.description }}
          </p>
          <div>
            <h3 class="text-lg font-semibold mb-2 text-regal-blue-900">Lösungen</h3>
            <div v-if="loadingSolutions" class="text-gray-500 italic">Lade Lösungen...</div>
            <div class="max-h-64 overflow-y-auto" v-if="solutions && solutions.length > 0">
              <div
                v-for="solution in solutions"
                :key="solution.id"
                class="mb-2 border-l-4 border-regal-blue-500 pl-4"
              >
                <p class="text-gray-700">{{ solution.description }}</p>
              </div>
            </div>
            <div v-else class="text-gray-500">Bisher keine Lösungen vorhanden.</div>
          </div>
        </div>
      </div>
      <div v-else class="text-gray-500 mt-8">Problem-Details konnten nicht geladen werden.</div>
    </div>
  </div>
</template>

<script setup>
// import { ref, onMounted } from 'vue'
import useFetchProblemDetails from '@/composables/useFetchProblemDetails' // Pfad anpassen!

const props = defineProps(['problemId'])
const emit = defineEmits(['close'])

// Verwende das Composable, um die Daten abzurufen
const {
  problemDetails,
  solutions,
  error,
  loadingProblem,
  loadingSolutions,
  // fetchProblem, // Optional: Falls du die Daten später erneut abrufen möchtest
  // fetchSolutions, // Optional: Falls du die Lösungen später erneut abrufen möchtest
} = useFetchProblemDetails(props.problemId)

// Optional: Überwache Änderungen der problemId Prop, um die Daten neu zu laden
// watch(() => props.problemId, (newProblemId) => {
//   if (newProblemId) {
//     fetchProblem(newProblemId);
//     fetchSolutions(newProblemId);
//   }
// });

// Funktion zum Schließen des Modals
const closeModal = () => {
  emit('close')
}
</script>
