<template>
  <nav class="sticky top-0 z-50 w-full text-white shadow-md bg-blue-600">
    <div class="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
      <!-- Logo oder Titel -->
      <div class="text-xl font-semibold h1">Fahrradspiel</div>

      <!-- Navigation (kann später erweitert werden) -->
      <div class="space-x-4 hidden md:flex">
        <button class="hover:underline">Home</button>
        <button class="hover:underline">Karte</button>
        <button class="hover:underline">Profil</button>
      </div>

      <!-- Mobile Burger-Menu (optional) -->
      <div class="md:hidden">
        <button @click="toggleMenu" class="focus:outline-none">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Dropdown -->
    <div v-if="menuOpen" class="md:hidden bg-blue-700 px-4 pb-4">
      <button class="block w-full text-left py-2 hover:underline">Home</button>
      <button class="block w-full text-left py-2 hover:underline">Karte</button>
      <button class="block w-full text-left py-2 hover:underline">Profil</button>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}
</script>
