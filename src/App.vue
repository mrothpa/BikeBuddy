<template>
  <div class="h-screen w-screen flex flex-col">
    <Navbar />
    <main class="flex-grow relative">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Navbar from './components/AppNavbar.vue'
</script>
