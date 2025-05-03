<template>
  <div v-if="isOpen" class="absolute inset-0 bg-black/30 z-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md mx-4">
      <button @click="closeModal" class="absolute top-3 right-3 text-gray-500 hover:text-black">
        <font-awesome-icon icon="times" />
      </button>
      <h2 class="text-xl font-bold mb-4 text-regal-blue-900">Neues Problem melden</h2>

      <div v-if="marker">
        <div class="mb-4">
          <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Titel (*)</label>
          <input
            type="text"
            id="title"
            v-model="form.title"
            placeholder="Kurze Beschreibung des Problems"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p v-if="titleError" class="text-red-500 text-xs italic">{{ titleError }}</p>
        </div>

        <div class="mb-4">
          <label for="description" class="block text-gray-700 text-sm font-bold mb-2"
            >Beschreibung (*)</label
          >
          <textarea
            id="description"
            v-model="form.description"
            placeholder="Detailliertere Beschreibung des Problems"
            rows="4"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
          <p v-if="descriptionError" class="text-red-500 text-xs italic">{{ descriptionError }}</p>
        </div>

        <div class="mb-4">
          <label for="category" class="block text-gray-700 text-sm font-bold mb-2"
            >Kategorie (*)</label
          >
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
          </div>
        </div>

        <!-- <div class="mb-4">
          <label for="latitude" class="block text-gray-700 text-sm font-bold mb-2"
            >Breitengrad</label
          >
          <input
            type="text"
            id="latitude"
            :value="latitude"
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
            :value="longitude"
            readonly
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
          />
        </div> -->
        <div>
          <label for="solution" class="block text-gray-700 text-sm font-bold mb-2"
            >Lösungsidee</label
          >
          <textarea
            id="solution"
            v-model="formSolution.description"
            placeholder="Detailliertere Lösungsidee des Problems"
            rows="4"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
          <p v-if="errorSolution" class="text-red-500 text-xs italic">{{ errorSolution }}</p>
          <p v-if="successSolution" class="text-green-500 text-xs">
            Lösung erfolgreich eingereicht!
          </p>
          <p v-if="loadingSolution" class="text-gray-500 text-xs italic">
            Lösung wird eingereicht...
          </p>
        </div>

        <div class="flex justify-end">
          <button
            @click="closeModal"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            :disabled="loading"
          >
            Abbrechen
          </button>
          <button
            @click="submitForm"
            class="bg-regal-blue-500 hover:bg-regal-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            :disabled="loading"
          >
            <font-awesome-icon v-if="loading" icon="spinner" spin />
            <span v-else>Problem melden</span>
          </button>
        </div>

        <div v-if="error" class="text-red-500 mt-4">{{ error }}</div>
        <div v-if="success" class="text-green-500 mt-4">Problem erfolgreich gemeldet!</div>
      </div>
      <div v-else class="text-gray-500">Kein Marker ausgewählt.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue'
import useAddProblem from '@/composables/useAddProblem' // Pfad anpassen!
import useAddSolution from '@/composables/useAddSolution'

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

const emit = defineEmits(['close', 'problem-added'])

const { loading, error, success, addProblem } = useAddProblem()
const { loadingSolution, errorSolution, successSolution, addSolution } = useAddSolution()

const form = ref({
  title: '',
  description: '',
  category: '',
  latitude: props.marker ? props.marker.getLatLng().lat : null,
  longitude: props.marker ? props.marker.getLatLng().lng : null,
})

const formSolution = ref({
  description: '',
})

const titleError = ref('')
const descriptionError = ref('')

const latitude = ref(props.marker ? props.marker.getLatLng().lat : '')
const longitude = ref(props.marker ? props.marker.getLatLng().lng : '')

const availableCategories = ref([
  'Schlagloch',
  'Ampel defekt',
  'Baustelle',
  'Fahrradweg blockiert',
  'Unklare Verkehrsführung',
  'Fehlendes Straßenschild',
])
const newCategory = ref('')

watch(
  () => props.marker,
  (newMarker) => {
    if (newMarker) {
      latitude.value = newMarker.getLatLng().lat
      longitude.value = newMarker.getLatLng().lng
      form.value.latitude = newMarker.getLatLng().lat
      form.value.longitude = newMarker.getLatLng().lng
    } else {
      latitude.value = ''
      longitude.value = ''
      form.value.latitude = null
      form.value.longitude = null
    }
  },
)

watch(success, (isSuccess) => {
  if (isSuccess) {
    // Setze Formularfelder zurück
    form.value.title = ''
    form.value.description = ''
    form.value.category = ''
    titleError.value = ''
    descriptionError.value = ''
    newCategory.value = ''
    // Schließe das Modal
    emit('problem-added')
    closeModal()
  }
})

const closeModal = () => {
  emit('close')
  titleError.value = ''
  descriptionError.value = ''
}

const addCategory = () => {
  if (
    newCategory.value &&
    !availableCategories.value.includes(newCategory.value) &&
    newCategory.value.length < 64
  ) {
    availableCategories.value.push(newCategory.value)
  }
  form.value.category = newCategory.value
  newCategory.value = ''
}

const validateForm = () => {
  titleError.value = form.value.title ? '' : 'Titel ist erforderlich.'
  descriptionError.value = form.value.description ? '' : 'Beschreibung ist erforderlich.'
  titleError.value = form.value.title.length < 64 ? '' : 'Titel zu lang.'
  descriptionError.value = form.value.description.length < 65536 ? '' : 'Beschreibung zu lang.'
  return !titleError.value && !descriptionError.value
}

const submitForm = async () => {
  const responseData = ref([])
  if (!props.marker) {
    error.value = 'Es wurde kein Standort auf der Karte ausgewählt.'
    return
  }

  console.log('form value category: ', form.value.category)

  if (form.value.category === 'new') {
    addCategory()
  }

  if (validateForm()) {
    form.value.latitude = props.marker.getLatLng().lat
    form.value.longitude = props.marker.getLatLng().lng
    responseData.value = await addProblem(form.value)
    // console.log(responseData)
  }

  if (formSolution.value.description && formSolution.value.description.length < 65536) {
    const solutionData = {
      problem: responseData.value.id,
      description: formSolution.value.description,
    }
    const result = await addSolution(solutionData)
    if (result && success.value) {
      formSolution.value.description = '' // Formular zurücksetzen
    }
  } else if (form.value.solution.length >= 65536) {
    errorSolution.value = 'Lösung zu lang. Maximal 65536 Zeichen.'
  }
}
</script>
