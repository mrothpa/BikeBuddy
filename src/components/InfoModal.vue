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

wir möchten Ihnen die App "BikeBuddy BiG Lindenhof" vorstellen und Ihnen mit ihr, die Möglichkeit geben, Mängel an unseren öffentlichen Radwegen in Echtzeit zu melden.

Ob Schäden im Belag, unklare Markierungen, mangelhafte Beschilderung oder Beleuchtung – all diese Aspekte können Sie direkt über einen Pin im digitalen Stadtplan des Lindenhofs melden. Auch Probleme mit Abstellanlagen für Fahrräder sind wichtig und können berücksichtigt werden.

Durch die Bestätigung dieser Meldungen durch andere Bürger*innen wird die Dringlichkeit deutlich, was uns hilft, die Anliegen effizient an die Kommunalverwaltung weiterzuleiten. So wissen die Verantwortlichen, wo Handlungsbedarf besteht. Darüber hinaus haben wir die Möglichkeit, Sie über die durchgeführten Verbesserungen zu informieren.

Mit der Einführung dieser Web-App leisten wir gemeinsam einen bedeutenden Beitrag zu einem sicheren und umweltfreundlichen Fahrradverkehr und fördern die Mobilität in unserer Region. Lassen Sie uns gemeinsam dafür sorgen, dass der Lindenhof ein noch besserer Ort für Radfahrer wird.

Bitte registrieren Sie sich, bevor Sie mit der App arbeiten.

Herzliche Grüße,
Ihre Bürger-Interessen-Gemeinschaft (BIG) Lindenhof e.V.
`)
</script>

<style scoped>
/* Optional styles */
</style>
