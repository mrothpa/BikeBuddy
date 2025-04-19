<template>
  <div v-if="isOpen" class="absolute inset-0 bg-black/30 z-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md mx-4">
      <button @click="closeModal" class="absolute top-3 right-3 text-gray-500 hover:text-black">
        <font-awesome-icon icon="times" />
      </button>
      <h2 class="text-xl font-bold mb-4 text-regal-blue-900">Neues Problem hinzufügen</h2>
      <div v-if="marker">
        <p class="mb-2">Latitude: {{ marker.getLatLng().lat }}</p>
        <p>Longitude: {{ marker.getLatLng().lng }}</p>
      </div>
      <div v-else class="text-gray-500">Kein Marker ausgewählt.</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
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

const closeModal = () => {
  emit('close')
}
</script>
