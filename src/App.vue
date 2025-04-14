<template>
  <div class="h-screen w-screen overflow-hidden flex flex-col">
    <Navbar />
    <main class="flex-grow relative">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import Navbar from './components/AppNavbar.vue'
</script>
