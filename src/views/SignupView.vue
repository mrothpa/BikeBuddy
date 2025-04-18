<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-regal-blue-900">Registrieren</h2>
      <form @submit.prevent="handleSignup">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email"> E-Mail </label>
          <input
            v-model.trim="signupData.email"
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
            v-model.trim="signupData.password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Dein Passwort"
            required
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="confirmPassword">
            Passwort wiederholen
          </label>
          <input
            v-model.trim="signupData.confirmPassword"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            type="password"
            placeholder="Dein Passwort"
            required
          />
        </div>

        <div class="flex items-center justify-between">
          <button
            class="bg-regal-blue-900 hover:bg-regal-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
            type="submit"
          >
            Registrieren
          </button>
          <router-link
            :to="{ name: 'login' }"
            class="text-sm text-regal-blue-700 hover:text-regal-blue-900 focus:outline-none focus:shadow-outline"
          >
            Anmelden
          </router-link>
        </div>
      </form>
      <div v-if="error" class="text-red-500 mt-4">{{ error }}</div>
      <div v-if="loading" class="text-gray-500 mt-4">Registrierung läuft...</div>
      <div v-if="signupSuccess" class="text-green-500 mt-4">
        Registrierung erfolgreich. Anmelden läuft...
      </div>
      <div v-if="loginError" class="text-red-500 mt-4">
        Anmelde-Fehler (bitte manuell anmelden): {{ loginError }}
      </div>
      <div v-if="loginLoading" class="text-gray-500 mt-4">Anmelden nach Registrierung...</div>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import useSignup from '@/composables/useSignup'
import useLogin from '@/composables/useLogin'

const { signupData, error, loading, signup, signupSuccess } = useSignup()
const { login, error: loginError, loading: loginLoading, loginData } = useLogin()

const handleSignup = async () => {
  if (signupData.password !== signupData.confirmPassword) {
    error.value = 'Passwörter stimmen nicht überein!'
  } else {
    await signup()
  }
}

watch(signupSuccess, async (newSignupSuccess) => {
  if (newSignupSuccess) {
    // useLogin().loginData.email = signupData.email
    // useLogin().loginData.password = signupData.password
    loginData.email = signupData.email
    loginData.password = signupData.password
    await login()
  }
})
</script>
