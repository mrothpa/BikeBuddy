<template>
  <div id="bike-map"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

onMounted(() => {
  // Initialise Map
  const map = L.map('bike-map').setView([49.468, 8.475], 15) // Mannheim Lindenhof Zoom 15

  // Add Tile-Layer
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map)

  // Add Test-Marker
  const testMarker = L.marker([49.468, 8.475]).addTo(map)
  testMarker.bindPopup('Das ist ein Test-Marker in Lindenhof!').openPopup()
})
</script>

<style scoped>
#bike-map {
  width: 100%;
  height: 100%;
}
</style>
