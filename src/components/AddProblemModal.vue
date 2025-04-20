<template>
  <div v-if="isOpen" class="absolute inset-0 bg-black/30 z-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md mx-4">
      <button @click="closeModal" class="absolute top-3 right-3 text-gray-500 hover:text-black">
        <font-awesome-icon icon="times" />
      </button>
      <h2 class="text-xl font-bold mb-4 text-regal-blue-900">Neues Problem hinzufügen</h2>

      <div v-if="marker">
        <div class="mb-4">
          <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Titel</label>
          <input
            type="text"
            id="title"
            v-model="form.title"
            placeholder="Kurze Beschreibung des Problems"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div class="mb-4">
          <label for="description" class="block text-gray-700 text-sm font-bold mb-2"
            >Beschreibung</label
          >
          <textarea
            id="description"
            v-model="form.description"
            placeholder="Detailliertere Beschreibung des Problems"
            rows="4"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>

        <div class="mb-4">
          <label for="latitude" class="block text-gray-700 text-sm font-bold mb-2"
            >Breitengrad</label
          >
          <input
            type="text"
            id="latitude"
            :value="marker.getLatLng().lat"
            readonly
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
          />
        </div>

        <div class="mb-4">
          <label for="longitude" class="block text-gray-700 text-sm font-bold mb-2"
            >Längengrad</label
          >
          <input
            type="text"
            id="longitude"
            :value="marker.getLatLng().lng"
            readonly
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
          />
        </div>

        <div class="mb-4">
          <label for="category" class="block text-gray-700 text-sm font-bold mb-2">Kategorie</label>
          <select
            id="category"
            v-model="form.category"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="" disabled>Kategorie auswählen</option>
            <option v-for="cat in availableCategories" :key="cat" :value="cat">{{ cat }}</option>
            <option value="new">Eigene hinzufügen...</option>
          </select>
          <div v-if="form.category === 'new'" class="mt-2">
            <input
              type="text"
              v-model="newCategory"
              placeholder="Neue Kategorie eingeben"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              @click="addCategory"
              class="bg-regal-blue-500 hover:bg-regal-blue-700 text-white font-bold py-2 px-4 rounded mt-2 focus:outline-none focus:shadow-outline"
            >
              Hinzufügen
            </button>
          </div>
        </div>

        <div class="flex justify-end">
          <button
            @click="closeModal"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
          >
            Abbrechen
          </button>
          <button
            @click="submitForm"
            class="bg-regal-blue-500 hover:bg-regal-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Problem hinzufügen
          </button>
        </div>
      </div>
      <div v-else class="text-gray-500">Kein Marker ausgewählt.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  marker: {
    type: Object, // Expect a Leaflet Marker instance
    default: null,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close'])

const form = ref({
  title: '',
  description: '',
  longitude: props.marker ? props.marker.getLatLng().lng : '',
  latitude: props.marker ? props.marker.getLatLng().lat : '',
  category: '',
})

const availableCategories = ref([
  'Schlagloch',
  'Ampel defekt',
  'Baustelle',
  'Fahrradweg blockiert',
  'Unklare Verkehrsführung',
  'Fehlendes Straßenschild',
])
const newCategory = ref('')

const closeModal = () => {
  emit('close')
}

const addCategory = () => {
  if (newCategory.value && !availableCategories.value.includes(newCategory.value)) {
    availableCategories.value.push(newCategory.value)
  }
  form.value.category = newCategory.value
  newCategory.value = ''
}

const submitForm = () => {
  // Hier kommt die Logik zum Absenden des Formulars
  console.log('Formulardaten:', form.value)
  closeModal() // Nur zum Testen, Modal schließen nach "Absenden"
}
</script>
