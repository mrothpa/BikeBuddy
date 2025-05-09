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
      @problem-added="handleProblemAdded"
    />

    <InfoModal v-if="showInfoText" @close="closeInfoModal" />
    <InfoModalAddProblem
      v-if="showInfoTextAddProblemLokal && isAddingProblem"
      @close="closeInfoModalAddProblem"
    />
  </div>

  <div
    v-if="isAddingProblem"
    class="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-75 rounded-full shadow-lg py-2 px-4 text-gray-800 font-semibold"
  >
    Marker ggf. verschieben und bestätigen
  </div>
  <div
    v-else-if="isAuthenticated"
    class="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-75 rounded-full shadow-lg py-2 px-4 text-gray-800 font-semibold"
  >
    Problem melden über "+"
  </div>
  <div
    v-else
    class="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-75 rounded-full shadow-lg py-2 px-4 text-gray-800 font-semibold"
  >
    Bitte anmelden
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
import InfoModal from '@/components/InfoModal.vue' // Pfad anpassen!
import InfoModalAddProblem from '@/components/InfoModalAddProblem.vue' // Pfad anpassen!
import customMarkerIcon from '@/assets/leaflet/marker-icon.png'
import customMarkerShadow from '@/assets/leaflet/marker-shadow.png'

const customIcon = L.icon({
  iconUrl: customMarkerIcon,
  shadowUrl: customMarkerShadow, // Optional
  iconSize: [25, 41], // Größe deines Icons
  iconAnchor: [12, 41], // Punkt des Icons, der auf die Koordinate zeigt
  popupAnchor: [1, -34], // Punkt, von dem aus das Popup geöffnet wird
  shadowSize: [41, 41], // Optional
})

const { problems, error, loading, fetchProblems } = useFetchProblems()
const map = ref(null)
const selectedProblemId = ref(null)
const appConfigStore = useAppConfigStore()
const { isAuthenticated, defaultMapCenter, showInfoTextAtStart, showInfoTextAddProblem } =
  storeToRefs(appConfigStore)
const showInfoText = ref(true)
const showInfoTextAddProblemLokal = ref(null)
const isAddingProblem = ref(false)
const newProblemLocation = ref(null)
const problemMarkers = ref([])
const newProblemMarker = ref(null) // Ref für den neuen Marker
const isAddProblemModalOpen = ref(false)

onMounted(async () => {
  if (!showInfoTextAtStart.value || showInfoTextAtStart.value === 'false') {
    showInfoText.value = false
  }
  if (
    (showInfoTextAddProblem.value || showInfoTextAddProblem.value === 'true') &&
    showInfoTextAddProblem.value !== 'false'
  ) {
    showInfoTextAddProblemLokal.value = true
  } else {
    showInfoTextAddProblemLokal.value = false
  }
  await fetchProblems()
  // console.log('Problems: ', problems.value)
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
    const marker = L.marker([problem.latitude, problem.longitude], { icon: customIcon })
      .bindPopup(
        `<b>${problem.category}</b> <a href="#" class="problem-link" data-problem-id="${problem.id}">Details anzeigen</a>`, // title
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
      newProblemMarker.value = L.marker([lat, lng], { draggable: true, icon: customIcon }).addTo(
        map.value,
      )
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          centerMap(position.coords.latitude, position.coords.longitude)
          // console.log('Standort abgerufen:', newProblemLocation.value)
        },
        () => {
          centerMap(defaultMapCenter.value.latitude, defaultMapCenter.value.longitude)
          // console.log('Standortabfrage abgelehnt oder fehlgeschlagen.')
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
      )
    } else {
      centerMap(defaultMapCenter.value.latitude, defaultMapCenter.value.longitude)
      // console.log('Geolocation wird von diesem Browser nicht unterstützt.')
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

const handleProblemAdded = async () => {
  window.location.reload()
}

const closeInfoModal = () => {
  showInfoText.value = false
}

const closeInfoModalAddProblem = () => {
  showInfoTextAddProblemLokal.value = false
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
