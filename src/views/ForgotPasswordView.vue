<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-regal-blue-900">Passwort Vergessen?</h2>
      <form @submit.prevent="login">
        <div class="mb-4">Das ist Text</div>
        <div class="flex items-center justify-between">
          <button
            :disabled="loading"
            @click="handleLogin"
            class="bg-regal-blue-900 hover:bg-regal-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
            type="submit"
          >
            E-Mail-Program öffnen
          </button>
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

<script setup></script>
