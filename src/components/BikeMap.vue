<template>
  <div class="relative h-full w-full">
    <div id="bike-map" class="h-full w-full z-0"></div>
    <div v-if="loading">Lade Daten...</div>
    <div v-if="error">Fehler beim Laden der Daten: {{ error.message }}</div>

    <ProblemDetailsModal
      v-if="selectedProblem"
      :problem="selectedProblem"
      @close="selectedProblem = null"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import useFetchProblems from '@/composables/useFetchProblems' // Pfad anpassen!
import ProblemDetailsModal from '@/components/ProblemDetailsModal.vue' // Pfad anpassen!

const { problems, error, loading, fetchProblems } = useFetchProblems()
const map = ref(null)
const selectedProblem = ref(null)

onMounted(async () => {
  await fetchProblems()

  map.value = L.map('bike-map').setView([49.468, 8.475], 13)

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map.value)

  problems.value.forEach((problem) => {
    const marker = L.marker([problem.latitude, problem.longitude])
      .bindPopup(
        `<b>${problem.title}</b> <a href="#" class="problem-link" data-problem-id="${problem.id}">Details anzeigen</a>`,
      )
      .addTo(map.value)

    marker.on('popupopen', () => {
      const problemLink = document.querySelector(
        `.leaflet-popup-content a[data-problem-id="${problem.id}"]`,
      )
      if (problemLink) {
        problemLink.addEventListener('click', (event) => {
          event.preventDefault()
          selectedProblem.value = problem
        })
      }
    })
  })
})
</script>

<style scoped>
#bike-map {
  width: 100%;
  height: 100%;
  z-index: 0; /* wichtig, damit das Modal darüber kommt */
}

.problem-link {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
</style>
