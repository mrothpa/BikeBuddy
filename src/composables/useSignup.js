// src/composables/useSignup.js
import { ref, reactive } from 'vue'
import { useAppConfigStore } from '@/stores/appConfig'

export default function useSignup() {
  const appConfigStore = useAppConfigStore()

  const signupData = reactive({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const error = ref(null)
  const loading = ref(false)
  const signupSuccess = ref(false)

  const signup = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(appConfigStore.getBackendUrl + 'signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `Registrierungsfehler: ${response.status}`)
      }

      signupSuccess.value = true
      // Hier erfolgt KEINE Speicherung eines Tokens oder Weiterleitung.
      // Das übernimmt der anschließende Login-Prozess.
    } catch (e) {
      error.value = e.message || 'Ein unbekannter Fehler ist aufgetreten.'
      console.error('Fehler bei der Registrierung:', e)
    } finally {
      loading.value = false
    }
  }

  return { signupData, error, loading, signup, signupSuccess }
}
