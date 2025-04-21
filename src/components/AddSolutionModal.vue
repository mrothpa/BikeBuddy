<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md mx-4">
      <button @click="closeModal" class="absolute top-3 right-3 text-gray-500 hover:text-black">
        <font-awesome-icon icon="times" />
      </button>
      <h2 class="text-xl font-bold mb-4 text-regal-blue-900">Modal Titel</h2>
      <div class="mb-4">
        <p>Dies ist der Inhalt des Modals.</p>
      </div>
      <div class="flex justify-end">
        <button
          @click="closeModal"
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
        >
          Schließen
        </button>
        <button
          class="bg-regal-blue-500 hover:bg-regal-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Aktion
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
</script>
