<template>
  <div class="absolute inset-0 bg-black/30 z-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-sm mx-4">
      <button @click="closeModal" class="absolute top-3 right-3 text-gray-500 hover:text-black">
        <font-awesome-icon icon="times" />
      </button>

      <h2 class="text-xl font-bold mb-4 text-regal-blue-900">Status ändern</h2>
      <p class="text-gray-700 mb-4">Bitte wähle einen neuen Status aus.</p>

      <div class="flex justify-end gap-4">
        <button
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          @click="confirmChange('status-1')"
        >
          Offen
        </button>
        <button
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          @click="confirmChange('status-2')"
        >
          In Bearbeitung
        </button>
        <button
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          @click="confirmChange('status-3')"
        >
          Erledigt
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { defineEmits } from 'vue'

const emit = defineEmits(['close', 'status-1', 'status-2', 'status-3'])

const closeModal = () => {
  emit('close')
}

const confirmChange = (newStatus) => {
  emit(newStatus)
  closeModal()
}
</script>

<style scoped>
/* Hier könnten spezifische Stile für dieses Modal stehen, falls nötig */
</style>
