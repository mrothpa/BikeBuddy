<template>
  <div class="relative h-full w-full">
    <div id="bike-map" class="h-full w-full z-0"></div>
    <div v-if="loading">Lade Daten...</div>
    <div v-if="error">Fehler beim Laden der Daten: {{ error.message }}</div>

    <ProblemDetailsModal
      v-if="selectedProblemId"
      :problemId="selectedProblemId"
      @close="selectedProblemId = null"
    />

    <button
      v-if="isAuthenticated"
      @click="toggleAddProblem"
      class="fixed bottom-6 right-6 bg-regal-blue-900 text-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-regal-blue-500"
      :class="{ 'animate-pulse': isAddingProblem }"
      style="width: 56px; height: 56px; display: flex; justify-content: center; align-items: center"
    >
      <font-awesome-icon :icon="isAddingProblem ? 'check' : 'plus'" size="lg" />
    </button>

    <AddProblemModal
      :marker="newProblemMarker"
      :isOpen="isAddProblemModalOpen"
      @close="handleCloseAddProblem"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import useFetchProblems from '@/composables/useFetchProblems' // Pfad anpassen!
import ProblemDetailsModal from '@/components/ProblemDetailsModal.vue' // Pfad anpassen!
import { useAppConfigStore } from '@/stores/appConfig'
import { storeToRefs } from 'pinia'
import AddProblemModal from '@/components/AddProblemModal.vue' // Pfad anpassen!

const { problems, error, loading, fetchProblems } = useFetchProblems()
const map = ref(null)
const selectedProblemId = ref(null)
const appConfigStore = useAppConfigStore()
const { isAuthenticated, defaultMapCenter } = storeToRefs(appConfigStore)
const isAddingProblem = ref(false)
const newProblemLocation = ref(null)
const problemMarkers = ref([])
const newProblemMarker = ref(null) // Ref für den neuen Marker
const isAddProblemModalOpen = ref(false)

onMounted(async () => {
  await fetchProblems()
  initMap(defaultMapCenter.value.latitude, defaultMapCenter.value.longitude)
})

const initMap = (latitude, longitude) => {
  map.value = L.map('bike-map').setView([latitude, longitude], defaultMapCenter.value.zoom)
  addTileLayer()
}

const addTileLayer = () => {
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
    problemMarkers.value.push(marker)
    marker.on('popupopen', (event) => {
      const popup = event.popup
      const problemLink = popup
        .getElement()
        .querySelector(`.problem-link[data-problem-id="${problem.id}"]`)
      if (problemLink) {
        problemLink.addEventListener('click', (e) => {
          e.preventDefault()
          selectedProblemId.value = problem.id // Korrigierte Zeile
        })
      }
    })
  })
}

const toggleAddProblem = () => {
  isAddingProblem.value = !isAddingProblem.value
  if (isAddingProblem.value) {
    isAddProblemModalOpen.value = false
    // Standortabfrage und Zentrierung
    const centerMap = (lat, lng) => {
      newProblemLocation.value = { latitude: lat, longitude: lng }
      map.value.setView([lat, lng], 13)
      // Platziere den festen Marker
      newProblemMarker.value = L.marker([lat, lng], { draggable: true }).addTo(map.value)
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          centerMap(position.coords.latitude, position.coords.longitude)
          console.log('Standort abgerufen:', newProblemLocation.value)
        },
        () => {
          centerMap(defaultMapCenter.value.latitude, defaultMapCenter.value.longitude)
          console.log('Standortabfrage abgelehnt oder fehlgeschlagen.')
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 0 },
      )
    } else {
      centerMap(defaultMapCenter.value.latitude, defaultMapCenter.value.longitude)
      console.log('Geolocation wird von diesem Browser nicht unterstützt.')
    }
    // Verstecke die existierenden Marker
    problemMarkers.value.forEach((marker) => {
      map.value.removeLayer(marker)
    })
  } else {
    // Zeige die existierenden Marker wieder an und entferne den neuen Marker
    // problemMarkers.value.forEach((marker) => { // in handleCloseAddProblem
    //   marker.addTo(map.value)
    // })
    // if (newProblemMarker.value) {
    //   map.value.removeLayer(newProblemMarker.value)
    //   newProblemMarker.value = null
    // }
    isAddProblemModalOpen.value = true
  }
}

const handleCloseAddProblem = () => {
  problemMarkers.value.forEach((marker) => {
    marker.addTo(map.value)
  })
  if (newProblemMarker.value) {
    map.value.removeLayer(newProblemMarker.value)
    newProblemMarker.value = null
  }
  isAddProblemModalOpen.value = false
}
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

.animate-pulse {
  animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
</style>
