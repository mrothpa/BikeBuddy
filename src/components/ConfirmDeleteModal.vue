<template>
  <div class="absolute inset-0 bg-black/30 z-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-sm mx-4">
      <button @click="closeModal" class="absolute top-3 right-3 text-gray-500 hover:text-black">
        <font-awesome-icon icon="times" />
      </button>

      <h2 class="text-xl font-bold mb-4 text-regal-blue-900">Wirklich löschen?</h2>
      <p class="text-gray-700 mb-4">Möchtest du diese Aktion wirklich ausführen?</p>

      <div class="flex justify-end gap-4">
        <button
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          @click="closeModal"
        >
          Nein
        </button>
        <button
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          @click="confirmDelete"
        >
          Ja, löschen
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { defineEmits } from 'vue'

const emit = defineEmits(['close', 'confirm-delete'])

const closeModal = () => {
  emit('close')
}

const confirmDelete = () => {
  // console.log('Löschen wurde bestätigt!')
  emit('confirm-delete')
  closeModal() // Optional: Schließe das Modal nach der Bestätigung
}
</script>

<style scoped>
/* Hier könnten spezifische Stile für dieses Modal stehen, falls nötig */
</style>
