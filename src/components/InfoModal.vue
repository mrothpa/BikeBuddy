<template>
  <div class="absolute inset-0 bg-black/30 z-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md mx-4 overflow-hidden">
      <h2 class="text-xl font-bold mb-4 text-regal-blue-900">
        Willkommen bei BikeBuddy BiG Lindenhof!
      </h2>
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
// const { showInfoTextAtStart } = storeToRefs(appConfigStore)
const toggleButtonInfoText = ref(false)

const emit = defineEmits(['close'])
// const { setShowInfoTextAtStart } = appConfigStore;

const closeModal = () => {
  if (toggleButtonInfoText.value) {
    appConfigStore.setShowInfoTextAtStartNot()
  } else {
    appConfigStore.setShowInfoTextAtStart()
  }
  emit('close')
}

const infoTextContent = ref(`Liebe Lindenhöfer der Stadt Mannheim,

wir möchten Ihnen die App "BikeBuddy BiG Lindenhof" vorstellen und mit ihr die Möglichkeit
geben, Probleme an unseren öffentlichen Radwegen zu melden und Verbesserungen
vorzuschlagen.

Ob schlechte oder risikoreiche Verkehrsführung wie z.B. fehlende Bordsteinabsenkung oder
scharfe Kurven, mangelhafte Markierung oder Beschilderung, unvorteilhafte Ampelintervalle, oder
unfallträchtiger Straßenbelag - alle diese Aspekte können Sie im Stadtplan Lindenhof markieren
und melden. Auch Probleme mit Abstellmöglichkeit für Fahrräder können gemeldet werden.

Mit Ihren Hinweisen und auch durch die Bestätigung der Meldungen anderer wird der besondere
Handlungsbedarf deutlich, den wir an die Stadtverwaltung weitergeben.

Akute Mängel melden Sie bitte nach wie vor im Mängelmelder der Stadt Mannheim. Den Link
dazu finden Sie im Burger-Menu mit den drei Striche.

Mit der Einführung dieser Web-App möchten wir einen Beitrag zu einem verbesserten
Fahrradverkehr in unserem Stadteil leisten. Lassen Sie uns gemeinsam dafür sorgen, dass der
Lindenhof ein noch besserer Ort für Radfahrer wird.

- Bitte registrieren Sie sich, um mit der App zu arbeiten.

Herzliche Grüße,
Ihre Bürger-Interessen-Gemeinschaft (BIG) Lindenhof e.V.
`)
</script>

<style scoped>
/* Optional styles */
</style>
