<template>
  <nav class="bg-white sticky top-0 z-50 shadow-md w-full">
    <div class="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
      <button @click="handleTitleClick" class="cursor-pointer flex items-center space-x-2">
        <span class="text-regal-blue-900 text-xl md:text-2xl font-bold">BikeBuddy</span>
        <img
          src="/src/assets/images/BIG_Logo_blau.svg"
          alt="BIG Lindenhof Logo"
          class="h-8 md:h-10"
        />
      </button>

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
        <router-link to="/" class="hover:underline" @click="handleShowMap" v-if="showMap"
          >Listenansicht</router-link
        >
        <router-link to="/" class="hover:underline" @click="handleShowMap" v-else
          >Kartenansicht</router-link
        >

        <router-link
          to="/users"
          class="hover:underline"
          v-if="isAuthenticated && user_role === 'admin'"
          >Benutzerverwaltung</router-link
        >
        <button class="hover:underline text-left" @click="handleOverCardClick">
          Über den BikeBuddy
        </button>
        <button
          v-if="isAuthenticated"
          class="hover:underline text-left"
          @click="handleShowIntroductionClick"
        >
          Anleitung Problem-Melden (beim nächsten Melden)
        </button>
        <a
          href="https://mannheim.xn--mngelmelder-l8a.de/#pageid=1"
          target="_blank"
          class="hover:underline"
          @click="closeMenu"
          >Mängel-Melder der Stadt Mannheim</a
        >
        <a
          href="https://www.big-lindenhof.de/datenschutz"
          target="_blank"
          class="hover:underline"
          @click="closeMenu"
          >Datenschutz</a
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
import { useRoute, useRouter } from 'vue-router'

const isOpen = ref(false)
const router = useRouter()
const route = useRoute()
const appConfigStore = useAppConfigStore()
const { isAuthenticated, showMap, user_role } = storeToRefs(appConfigStore)

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
  appConfigStore.setUserRole(null)
  closeMenu()
  router.push('/')
}

const handleShowMap = () => {
  appConfigStore.setShowMap()
  showMap.value = appConfigStore.getShowMap
  closeMenu()
}

const handleTitleClick = () => {
  appConfigStore.setShowMapDefault()
  closeMenu()
  router.push('/')
}

const handleOverCardClick = () => {
  appConfigStore.setShowInfoTextAtStart()
  closeMenu()
  if (route.name === 'home') {
    appConfigStore.setShowMapDefault()
    window.location.reload()
  } else {
    router.push('/')
  }
}

const handleShowIntroductionClick = () => {
  appConfigStore.setShowInfoTextAddProblem()
  closeMenu()
  if (route.name === 'home') {
    appConfigStore.setShowMapDefault()
    window.location.reload()
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
