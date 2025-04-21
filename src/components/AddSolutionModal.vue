<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md mx-4">
      <button @click="closeModal" class="absolute top-3 right-3 text-gray-500 hover:text-black">
        <font-awesome-icon icon="times" />
      </button>
      <h2 class="text-xl font-bold mb-4 text-regal-blue-900">Lösung eingeben</h2>
      <div class="mb-4">
        <label for="description" class="block text-gray-700 text-sm font-bold mb-2"
          >Lösungsidee</label
        >
        <textarea
          id="description"
          v-model="form.description"
          placeholder="Detailliertere Lösungsidee des Problems"
          rows="4"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
        <p v-if="error" class="text-red-500 text-xs italic">{{ error }}</p>
      </div>

      <div class="flex justify-center">
        <button
          @click="submitForm"
          class="bg-regal-blue-500 hover:bg-regal-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          :disabled="loading || !form.description"
        >
          <font-awesome-icon v-if="loading" icon="spinner" spin />
          <span v-else>Lösung einreichen</span>
        </button>
      </div>
      <div v-if="success" class="text-green-500 mt-4">Lösung erfolgreich eingereicht!</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import useAddSolution from '@/composables/useAddSolution' // Pfad zum Composable anpassen!

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  problemId: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['close', 'solution-added'])

const { loading, error, success, addSolution } = useAddSolution()

const closeModal = () => {
  emit('close')
}

const form = ref({
  description: '',
})

const submitForm = async () => {
  if (form.value.description) {
    const solutionData = {
      problem: props.problemId,
      description: form.value.description,
    }
    const result = await addSolution(solutionData)
    if (result && success.value) {
      form.value.description = '' // Formular zurücksetzen
      emit('solution-added') // Optional: Event auslösen, um die UI zu aktualisieren
      emit('close')
    }
  } else {
    error.value = 'Bitte gib eine Lösungsidee ein.'
  }
}
</script>
