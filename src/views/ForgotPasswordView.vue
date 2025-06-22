<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-regal-blue-900">Passwort Vergessen?</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <p v-for="(el, i) in infoText" :key="i" class="text-gray-700 text-sm mb-4">{{ el }}</p>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email"> E-Mail </label>
          <input
            v-model="email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Deine E-Mail"
            required
          />
        </div>
        <div class="flex items-center justify-between">
          <a
            :href="`mailto:info@big-lindenhof.de?subject=Passwort vergessen ${email}&body=Hallo,%0D%0Aich habe mein Passwort vergessen und benötige Hilfe bei der Erstellung meines neuen Kontos.%0D%0ABitte löscht mein altes Konto, damit ich ein neues anlegen kann.%0D%0AMeine E-Mail-Adresse lautet: ${email}%0D%0AVielen Dank!`"
            :class="[
              'bg-regal-blue-900 hover:bg-regal-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
              email === '' ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer',
            ]"
            :tabindex="email === '' ? -1 : 0"
            aria-disabled="email === ''"
          >
            E-Mail-Program öffnen
          </a>
          <router-link
            to="/login"
            class="text-sm text-regal-blue-700 hover:text-regal-blue-900 focus:outline-none focus:shadow-outline"
          >
            Zurück
          </router-link>
        </div>
      </form>
      <div v-if="error" class="text-red-500 text-sm mt-4">{{ error }}</div>
      <div v-if="errorMessage !== ''" class="text-red-500 text-sm mt-4">{{ errorMessage }}</div>
      <div v-if="loading" class="text-gray-500 text-sm mt-4">Anmeldung läuft...</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const infoText = ref([
  'Zum Schutz deiner Daten verzichten wir bewusst auf vorgefertigte amerikanische Authentifizierungsdienste.',
  'Da unsere Ressourcen begrenzt sind, bieten wir keine automatische Passwort-Wiederherstellung an.',
  'Du kannst dich mit einer anderen E-Mail-Adresse registrieren oder uns kontaktieren, damit wir dein altes Konto löschen und du ein neues anlegen kannst.',
  'Gib dazu deine E-Mail ein, klicke auf den blauen Button und sende die E-Mail ab.',
])
</script>
