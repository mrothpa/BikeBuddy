<template>
  <div class="absolute inset-0 bg-black/30 z-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md mx-4 overflow-hidden">
      <h2 class="text-xl font-bold mb-4 text-regal-blue-900">Neues Problem Anlegen (Anleitung)</h2>
      <div class="mb-4 overflow-y-auto max-h-96">
        <p class="text-gray-700 leading-relaxed whitespace-pre-line">
          {{ infoTextContent }}
        </p>
      </div>

      <div class="mb-4 flex items-center">
        <input type="checkbox" id="dont-show-again" v-model="toggleButtonInfoText" class="mr-2" />
        <label for="dont-show-again" class="text-gray-700 text-sm">Nicht erneut anzeigen</label>
      </div>

      <div class="flex justify-end">
        <button
          class="bg-regal-blue-500 hover:bg-regal-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          @click="closeModal"
        >
          Schließen
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, ref } from 'vue'
import { useAppConfigStore } from '@/stores/appConfig'
// import { storeToRefs } from 'pinia'

const appConfigStore = useAppConfigStore()
// const { showInfoTextAddProblem } = storeToRefs(appConfigStore)
const toggleButtonInfoText = ref(false)

const emit = defineEmits(['close'])
// const { setShowInfoTextAddProblem } = appConfigStore;

const closeModal = () => {
  if (toggleButtonInfoText.value) {
    appConfigStore.setShowInfoTextAddProblemNot()
  } else {
    appConfigStore.setShowInfoTextAddProblem()
  }
  emit('close')
}

const infoTextContent = ref(`Hallo! Schön, dass du ein neues Problem melden möchtest.

Wenn der angezeigte Standort auf der Karte nicht exakt dem Ort des Problems entspricht, kannst du den Marker ziehen und präzise auf die richtige Stelle platzieren.

Um deine Meldung abzuschicken, drücke bitte auf den blauen Haken unten rechts und fülle anschließend das Formular mit den Details zu deinem Problem aus.

Hinweis zum Standort: Falls der Standort trotz deiner Freigabe nicht korrekt ist, könnte das folgende Ursachen haben:

- Die Funktion "genauer Standort" ist in deinen Browser-Einstellungen deaktiviert.
- GPS ist auf deinem Gerät generell deaktiviert oder die Standortfreigabe für diese App wurde verweigert.
- Es gibt spezifische Einstellungen oder Einschränkungen deines Mobilgeräts.

Du kannst die Karte übrigens mit den üblichen Pinch-to-Zoom-Gesten (auf Touchscreens) oder dem Mausrad vergrößern und verkleinern, um den genauen Ort besser zu sehen.

Viel Erfolg beim Melden deines Problems!
`)
</script>

<style scoped>
/* Optional styles */
</style>
