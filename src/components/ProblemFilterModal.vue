<template>
  <div class="absolute inset-0 bg-black/30 z-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md mx-4">
      <button @click="closeModal" class="absolute top-3 right-3 text-gray-500 hover:text-black">
        <font-awesome-icon icon="times" />
      </button>

      <h2 class="text-xl font-bold mb-4 text-regal-blue-900">Filter</h2>

      <div class="mb-4">
        <label for="filter-title" class="block text-gray-700 text-sm font-bold mb-2">Titel:</label>
        <input
          type="text"
          id="filter-title"
          v-model="filters.title"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div class="mb-4">
        <label for="filter-category" class="block text-gray-700 text-sm font-bold mb-2"
          >Kategorie:</label
        >
        <select
          id="filter-category"
          v-model="filters.category"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Alle Kategorien</option>
          <option v-for="category in uniqueCategories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>

      <div class="mb-4">
        <label for="filter-status" class="block text-gray-700 text-sm font-bold mb-2"
          >Status:</label
        >
        <select
          id="filter-status"
          v-model="filters.status"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Alle Stati</option>
          <option value="offen">offen</option>
          <option value="in Bearbeitung">in Bearbeitung</option>
          <option value="erledigt">erledigt</option>
        </select>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Erstellt am:</label>
        <div class="flex gap-2">
          <div>
            <label for="filter-created-at-from" class="block text-gray-700 text-xs font-bold mb-1"
              >Von:</label
            >
            <input
              type="date"
              id="filter-created-at-from"
              v-model="filters.createdAtFrom"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
            />
          </div>
          <div>
            <label for="filter-created-at-to" class="block text-gray-700 text-xs font-bold mb-1"
              >Bis:</label
            >
            <input
              type="date"
              id="filter-created-at-to"
              v-model="filters.createdAtTo"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
            />
          </div>
        </div>
      </div>

      <div class="flex justify-end gap-4 mt-6">
        <button
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          @click="closeModal"
        >
          Zurück
        </button>
        <button
          class="bg-regal-blue-500 hover:bg-regal-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          @click="applyFilters"
        >
          Anwenden
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  problems: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['close', 'apply-filters'])

const filters = ref({
  title: '',
  category: '',
  status: '',
  createdAtFrom: '',
  createdAtTo: '',
})

const uniqueCategories = computed(() => {
  const categories = new Set(props.problems.map((problem) => problem.category).filter(Boolean))
  return [...categories]
})

const closeModal = () => {
  emit('close')
}

const applyFilters = () => {
  emit('apply-filters', filters.value)
  closeModal()
}
</script>

<style scoped>
/* Optional styles */
</style>
