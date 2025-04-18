<template>
  <nav class="bg-white sticky top-0 z-50 shadow-md w-full">
    <div class="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
      <h1 class="text-regal-blue-900 text-xl md:text-2xl font-bold">Fahrradkarte</h1>

      <!-- buttons -->
      <div class="flex items-center">
        <button
          v-if="!isAuthenticated"
          @click="handleAuthentication"
          class="text-regal-blue-900 text-3xl focus:outline-none mr-4"
        >
          <font-awesome-icon icon="user" />
        </button>

        <button @click="toggleMenu" class="text-regal-blue-900 text-3xl focus:outline-none">
          <font-awesome-icon v-if="!isOpen" icon="bars" />
          <font-awesome-icon v-else icon="times" />
        </button>
      </div>
    </div>

    <!-- burger-menu for all Viewports -->
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
        <button v-if="isAuthenticated" class="text-left hover:underline" @click="handleLogout">
          Abmelden
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAppConfigStore } from '@/stores/appConfig'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isOpen = ref(false)
const router = useRouter()
const appConfigStore = useAppConfigStore()
const { isAuthenticated } = storeToRefs(appConfigStore)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}

const handleAuthentication = () => {
  router.push({ name: 'login' })
}

const handleLogout = () => {
  appConfigStore.clearPasetoToken()
  closeMenu()
  router.push('/')
}
</script>
