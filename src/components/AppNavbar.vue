<template>
  <nav class="bg-white sticky top-0 z-50 shadow-md w-full">
    <div class="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
      <h1 class="text-regal-blue-900 text-xl md:text-2xl font-bold">Fahrradkarte</h1>

      <!-- Menü-Button immer sichtbar -->
      <button @click="toggleMenu" class="text-regal-blue-900 text-3xl focus:outline-none">
        <span v-if="!isOpen">&#9776;</span>
        <!-- ☰ -->
        <span v-else>&#10005;</span>
        <!-- ✕ -->
      </button>
    </div>

    <!-- Burger-Menü für alle Viewports -->
    <!-- Burger-Menü für alle Viewports -->
    <div v-show="isOpen" class="bg-white shadow-md border-t border-regal-blue-100">
      <div
        class="max-w-screen-xl mx-auto px-4 py-2 flex flex-col space-y-2 text-lg text-regal-blue-900"
      >
        <router-link to="/" class="hover:underline" @click="closeMenu">Karte</router-link>
        <router-link to="/about" class="hover:underline" @click="closeMenu"
          >Über die Karte</router-link
        >
        <router-link to="/datenschutz" class="hover:underline" @click="closeMenu"
          >Datenschutzerklärung</router-link
        >
        <a
          href="https://www.big-lindenhof.de"
          target="_blank"
          class="hover:underline"
          @click="closeMenu"
          >BIG Lindenhof</a
        >
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}
</script>
