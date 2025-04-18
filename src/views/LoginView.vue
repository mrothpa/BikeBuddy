<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-regal-blue-900">Anmelden</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email"> E-Mail </label>
          <input
            v-model="loginData.email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Deine E-Mail"
            required
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Passwort
          </label>
          <input
            v-model="loginData.password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Dein Passwort"
            required
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            :disabled="loading"
            @click="login"
            class="bg-regal-blue-900 hover:bg-regal-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
            type="submit"
          >
            Anmelden
          </button>
          <router-link
            to="/signup"
            class="text-sm text-regal-blue-700 hover:text-regal-blue-900 focus:outline-none focus:shadow-outline"
          >
            Noch kein Konto? Registrieren
          </router-link>
        </div>
      </form>
      <div v-if="error" class="text-red-500 text-sm mt-4">{{ error }}</div>
      <div v-if="loading" class="text-gray-500 text-sm mt-4">Anmeldung läuft...</div>
    </div>
  </div>
</template>

<script setup>
import useLogin from '@/composables/useLogin'

const { loginData, error, loading, login } = useLogin()
</script>
