<template>
  <div class="absolute inset-0 bg-black/30 z-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md mx-4">
      <button @click="$emit('close')" class="absolute top-3 right-3 text-gray-500 hover:text-black">
        <font-awesome-icon icon="times" />
      </button>
      <div>
        <h2 class="text-lg font-bold mb-2">{{ problem.title }}</h2>
        <p>{{ problem.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['problem'])
defineEmits(['close'])
</script>
