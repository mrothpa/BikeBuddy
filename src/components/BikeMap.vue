<template>
  <div id="bike-map"></div>
  <div v-if="loading">Lade Daten...</div>
  <div v-if="error">Fehler beim Laden der Daten: {{ error.message }}</div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import useFetchProblems from '@/composables/useFetchProblems' // Pfad anpassen!

const { problems, error, loading, fetchProblems } = useFetchProblems()
const map = ref(null) // Ref für die Karteninstanz

onMounted(async () => {
  await fetchProblems() // Rufe die Daten ab

  // Initialisiere die Karte
  map.value = L.map('bike-map').setView([49.468, 8.475], 13)

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map.value)

  // Füge die Marker hinzu, nachdem die Daten geladen wurden und die Karte initialisiert ist
  problems.value.forEach((problem) => {
    L.marker([problem.latitude, problem.longitude]).bindPopup(problem.title).addTo(map.value)
  })
})
</script>

<style scoped>
#bike-map {
  width: 100%;
  height: 100%;
}
</style>
